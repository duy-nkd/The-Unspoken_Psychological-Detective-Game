import { applyPenalty } from '../systems/credibility'
import { createContext, evaluate, valuesEqual } from './expr'
import { cloneJson, getPath, isPlainObject, setPath } from './statePath'

/**
 * Hiệu ứng & giao dịch — Data Contract 2.0 mục "Effects và nguồn dữ kiện" (DEC-016, kế hoạch N2).
 *
 * Ngữ nghĩa giữ ĐÚNG như `Runner.effects` trong `validate_data.py` của gói (test vàng N5 so lại):
 *   - set / increment: ghi giá trị `after` (increment đã tự cộng trong `after`, KHÔNG cộng thêm);
 *   - upsert_record / collect_evidence: chỉ tạo khi bản ghi CHƯA có (không bao giờ đổi nguồn lần đầu); bản ghi kiến thức
 *     (statements/observations/evidence_records/timeline) được gắn source_node, source_step, collected_phase, source_kind;
 *     collect_evidence thêm Evidence ID (duy nhất) vào `evidence_collected` trong cùng giao dịch;
 *   - merge_record: chỉ sửa bản ghi ĐÃ có (không tạo bản ghi thiếu để hợp thức hóa nguồn);
 *   - save_checkpoint: lưu bản sao TOÀN BỘ state trừ khối `checkpoints` (không lồng snapshot); overwrite=false thì giữ bản cũ.
 * `after` được đánh giá lại với ngữ cảnh MỚI sau từng hiệu ứng (validator dựng lại ngữ cảnh mỗi lần đọc ref).
 * `before` chỉ để mô tả giá trị trước (DATA_CONTRACT) — validator không dùng, engine cũng không.
 *
 * Giao dịch: mọi hiệu ứng chạy trên BẢN SAO state; lỗi ở bất kỳ bước nào → state cũ giữ nguyên (tất cả-hoặc-không).
 * Token sự kiện: commitEvent bỏ qua token đã có trong `committed_events` → bấm đúp / React vẽ lại không trừ điểm 2 lần.
 */
export const EFFECT_OPS = Object.freeze([
  'set',
  'increment',
  'upsert_record',
  'merge_record',
  'collect_evidence',
  'save_checkpoint',
])

/** Bản ghi "kiến thức" được gắn nguồn khi tạo (như validator). people / case_conclusions không gắn. */
const SOURCED_PREFIXES = ['/statements/', '/observations/', '/evidence_records/', '/timeline/']

/**
 * Loại nguồn của bản ghi mới — quy tắc của `validate_data.py` (Chương 1), dựa vào tên nút commit.
 * N2-Q2: nhãn cụ thể do Sổ tay suy ra từ metadata của lần thu thập (systems/notebook.js).
 */
export function sourceKindFor(node, path) {
  const policeSource =
    node.startsWith('P3_') &&
    (node.includes('POLICE') || node.includes('REPORT') || node.includes('RECOVER'))
  if (policeSource || node.startsWith('P4_COIN_RECORD') || node.startsWith('P4_SURVEY_FIRST')) {
    return 'professional_record'
  }
  if (path.startsWith('/observations/')) return 'observed'
  return 'source_node'
}

/**
 * Áp danh sách hiệu ứng như MỘT giao dịch, trả về state MỚI (state truyền vào không bị sửa).
 * @param {object} state state v2 hiện tại
 * @param {object[]} effects mảng `effects` của nút
 * @param {{graph: object, node: string, input?: object, handlers?: string[]}} env
 *   graph = chapter1.json (predicates, bindings); node = id nút đang commit (thành `source_step`)
 */
export function applyEffects(state, effects = [], env) {
  if (!Array.isArray(effects)) throw new TypeError(`Nút ${env?.node}: effects phải là mảng`)
  const draft = cloneJson(state)
  effects.forEach((effect, index) => {
    try {
      applyEffect(draft, effect, env)
    } catch (error) {
      throw new Error(
        `Nút ${env?.node}: hiệu ứng #${index} (${effect?.op}) lỗi — ${error.message}`,
        {
          cause: error,
        },
      )
    }
  })
  return draft
}

/**
 * Commit một sự kiện người chơi (bấm tiếp, chọn, Present, Nộp…) theo token duy nhất:
 * token đã commit → trả lại đúng state cũ (`applied: false`), không trừ điểm, không chạy hiệu ứng lần hai.
 * Thứ tự như validator: trừ uy tín (`penalty` = số điểm bị trừ, không âm) → hiệu ứng → ghi token.
 */
export function commitEvent(state, { token, effects = [], penalty = 0 }, env) {
  if (typeof token !== 'string' || token === '') {
    throw new TypeError('commitEvent: token phải là chuỗi khác rỗng')
  }
  if (!Array.isArray(state.committed_events)) {
    throw new TypeError('commitEvent: state thiếu committed_events (state v2)')
  }
  if (state.committed_events.includes(token)) return { state, applied: false }
  const charged = { ...state, credibility: applyPenalty(state.credibility, penalty) }
  const next = applyEffects(charged, effects, env)
  next.committed_events.push(token)
  return { state: next, applied: true }
}

function applyEffect(draft, effect, env) {
  if (!isPlainObject(effect)) throw new TypeError('hiệu ứng không phải object')
  const { op } = effect
  if (op === 'save_checkpoint') return saveCheckpoint(draft, effect)
  if (!EFFECT_OPS.includes(op)) throw new Error(`loại hiệu ứng không hỗ trợ: ${JSON.stringify(op)}`)

  const context = createContext({
    graph: env.graph,
    state: draft,
    input: env.input,
    handlers: env.handlers,
  })
  const value = evaluate(effect.after, context, env.graph?.predicates)
  const { path } = effect
  const existing = getPath(draft, path)

  switch (op) {
    case 'set':
    case 'increment':
      setPath(draft, path, value)
      return
    case 'upsert_record':
    case 'collect_evidence':
      if (existing === null) setPath(draft, path, withSource(value, effect, path, draft, env))
      if (op === 'collect_evidence') addEvidenceId(draft, effect.evidenceId)
      return
    case 'merge_record':
      requireRecord(value, path)
      if (existing !== null) mergeRecord(draft, effect, requireRecord(existing, path), value, env)
      return
  }
}

function mergeRecord(draft, effect, previous, value, env) {
  const { path } = effect
  if (Object.entries(value).every(([key, next]) => valuesEqual(previous[key], next))) return
  const next = { ...previous, ...value }
  if (path.startsWith('/statements/')) {
    const { revisions = [], ...record } = previous
    next.revisions = [
      ...revisions,
      {
        previous: record,
        source_node: effect.sourceNode ?? env.node,
        source_step: env.node,
        collected_phase: draft.current_phase,
      },
    ]
  }
  setPath(draft, path, next)
}

function withSource(value, effect, path, draft, env) {
  if (!SOURCED_PREFIXES.some((prefix) => path.startsWith(prefix))) return value
  const record = requireRecord(value, path)
  return {
    ...record,
    source_node: effect.sourceNode ?? env.node,
    source_step: env.node,
    collected_phase: draft.current_phase,
    source_kind: sourceKindFor(env.node, path),
  }
}

function addEvidenceId(draft, evidenceId) {
  if (typeof evidenceId !== 'string' || evidenceId === '') {
    throw new TypeError('collect_evidence thiếu evidenceId')
  }
  if (!Array.isArray(draft.evidence_collected)) {
    throw new TypeError('state thiếu mảng evidence_collected')
  }
  if (!draft.evidence_collected.includes(evidenceId)) draft.evidence_collected.push(evidenceId)
}

function saveCheckpoint(draft, { checkpointId, overwrite }) {
  if (typeof checkpointId !== 'string' || checkpointId === '') {
    throw new TypeError('save_checkpoint thiếu checkpointId')
  }
  if (!isPlainObject(draft.checkpoints)) throw new TypeError('state thiếu khối checkpoints')
  if (Object.hasOwn(draft.checkpoints, checkpointId) && overwrite !== true) return
  const { checkpoints: _omit, ...snapshot } = draft
  draft.checkpoints[checkpointId] = cloneJson(snapshot)
}

function requireRecord(value, path) {
  if (!isPlainObject(value)) throw new TypeError(`bản ghi tại ${path} phải là object`)
  return value
}
