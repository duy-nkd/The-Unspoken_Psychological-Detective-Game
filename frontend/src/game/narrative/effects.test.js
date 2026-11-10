import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { chapterFileUrl } from '../data/chapters'
import { EFFECT_OPS, applyEffects, commitEvent, sourceKindFor } from './effects'

const lit = (literal) => ({ literal })
const ref = (path) => ({ ref: path })

const graph = { predicates: {}, bindings: {} }
const env = (node = 'P1_TEST__COMMIT') => ({ graph, node })

function baseState() {
  return {
    current_phase: 2,
    current_node: 'P2_X',
    credibility: 100,
    evidence_collected: [],
    evidence_records: {},
    statements: {},
    observations: {},
    timeline: {},
    people: {},
    flags: { opening_seen: false },
    checkpoints: {},
    deduction: { attempt_count: 0 },
    committed_events: [],
  }
}

describe('effects — set / increment', () => {
  it('set ghi giá trị after', () => {
    const effects = [{ op: 'set', path: '/flags/opening_seen', after: lit(true) }]
    expect(applyEffects(baseState(), effects, env()).flags.opening_seen).toBe(true)
  })

  it('increment ghi đúng giá trị after (after đã tự cộng, không cộng thêm lần nữa)', () => {
    const after = { op: 'add', args: [ref('/state/deduction/attempt_count'), lit(1)] }
    const effects = [{ op: 'increment', path: '/deduction/attempt_count', after }]
    expect(applyEffects(baseState(), effects, env()).deduction.attempt_count).toBe(1)
  })

  it('hiệu ứng sau đọc được kết quả của hiệu ứng trước (ngữ cảnh dựng lại từng bước)', () => {
    const effects = [
      { op: 'set', path: '/flags/a', after: lit(true) },
      { op: 'set', path: '/flags/b', after: ref('/state/flags/a') },
    ]
    expect(applyEffects(baseState(), effects, env()).flags.b).toBe(true)
  })
})

describe('effects — upsert_record / collect_evidence (tạo một lần, giữ nguồn đầu)', () => {
  const upsert = {
    op: 'upsert_record',
    path: '/statements/ST_A',
    after: lit({ id: 'ST_A', text: 'lời khai' }),
    sourceNode: 'P2_SOURCE',
  }

  it('bản ghi kiến thức mới được gắn source_node, source_step, collected_phase, source_kind', () => {
    const next = applyEffects(baseState(), [upsert], env('P2_SOURCE__COMMIT'))
    expect(next.statements.ST_A).toEqual({
      id: 'ST_A',
      text: 'lời khai',
      source_node: 'P2_SOURCE',
      source_step: 'P2_SOURCE__COMMIT',
      collected_phase: 2,
      source_kind: 'source_node',
    })
  })

  it('không có sourceNode → source_node = nút đang commit', () => {
    const { sourceNode: _drop, ...noSource } = upsert
    const next = applyEffects(baseState(), [noSource], env('P2_OTHER__COMMIT'))
    expect(next.statements.ST_A.source_node).toBe('P2_OTHER__COMMIT')
  })

  it('đã có bản ghi → KHÔNG đổi (không đổi nguồn lần đầu, không hồi tố phase)', () => {
    const first = applyEffects(baseState(), [upsert], env('P2_SOURCE__COMMIT'))
    first.current_phase = 3
    const changed = { ...upsert, after: lit({ id: 'ST_A', text: 'khác' }), sourceNode: 'P3_LATER' }
    const second = applyEffects(first, [changed], env('P3_LATER__COMMIT'))
    expect(second.statements.ST_A).toEqual(first.statements.ST_A)
  })

  it('people / case_conclusions không gắn nguồn (như validator)', () => {
    const effects = [
      { op: 'upsert_record', path: '/people/PEO_A', after: lit({ id: 'PEO_A' }), sourceNode: 'X' },
    ]
    expect(applyEffects(baseState(), effects, env()).people.PEO_A).toEqual({ id: 'PEO_A' })
  })

  it('collect_evidence: tạo bản ghi + thêm ID một lần duy nhất', () => {
    const collect = {
      op: 'collect_evidence',
      path: '/evidence_records/EV_A',
      after: lit({ id: 'EV_A', status: 'observed' }),
      evidenceId: 'EV_A',
      sourceNode: 'P2_A',
    }
    const once = applyEffects(baseState(), [collect], env('P2_A__COMMIT'))
    const twice = applyEffects(once, [collect], env('P2_A__COMMIT'))
    expect(twice.evidence_collected).toEqual(['EV_A'])
    expect(twice.evidence_records.EV_A.source_node).toBe('P2_A')
    expect(() => applyEffects(baseState(), [{ ...collect, evidenceId: '' }], env())).toThrow(Error)
  })

  it('bản ghi kiến thức không phải object → lỗi', () => {
    const bad = { op: 'upsert_record', path: '/timeline/TL_A', after: lit('chuỗi') }
    expect(() => applyEffects(baseState(), [bad], env())).toThrow(Error)
  })
})

describe('effects — merge_record', () => {
  it('chỉ sửa các trường chỉ định trên bản ghi đã có', () => {
    const s = baseState()
    s.people.PEO_A = { id: 'PEO_A', name: 'A', role: 'cũ' }
    const effects = [{ op: 'merge_record', path: '/people/PEO_A', after: lit({ role: 'mới' }) }]
    expect(applyEffects(s, effects, env()).people.PEO_A).toEqual({
      id: 'PEO_A',
      name: 'A',
      role: 'mới',
    })
  })

  it('bản ghi chưa có → không tạo (không hợp thức hóa nguồn còn thiếu)', () => {
    const effects = [{ op: 'merge_record', path: '/statements/ST_X', after: lit({ status: 'x' }) }]
    expect(applyEffects(baseState(), effects, env()).statements).toEqual({})
  })
})

describe('effects — save_checkpoint', () => {
  const save = (overwrite) => ({ op: 'save_checkpoint', checkpointId: 'ch1_test', overwrite })

  it('lưu toàn bộ state trừ khối checkpoints (không lồng snapshot)', () => {
    const next = applyEffects(baseState(), [save(false)], env())
    const snapshot = next.checkpoints.ch1_test
    expect(snapshot.credibility).toBe(100)
    expect(snapshot.checkpoints).toBeUndefined()
  })

  it('overwrite=false giữ bản đầu; overwrite=true thay bản mới; snapshot không đổi theo state sau', () => {
    const first = applyEffects(baseState(), [save(false)], env())
    first.credibility = 70
    expect(applyEffects(first, [save(false)], env()).checkpoints.ch1_test.credibility).toBe(100)
    expect(applyEffects(first, [save(true)], env()).checkpoints.ch1_test.credibility).toBe(70)
  })
})

describe('effects — giao dịch tất-cả-hoặc-không', () => {
  it('lỗi ở giữa → ném lỗi, state truyền vào không đổi chút nào', () => {
    const s = baseState()
    const before = JSON.stringify(s)
    const effects = [
      { op: 'set', path: '/flags/opening_seen', after: lit(true) },
      { op: 'set', path: '/credibility/oops', after: lit(1) },
    ]
    expect(() => applyEffects(s, effects, env())).toThrow(Error)
    expect(JSON.stringify(s)).toBe(before)
  })

  it('thành công cũng không sửa state truyền vào (trả về state mới)', () => {
    const s = baseState()
    const next = applyEffects(s, [{ op: 'set', path: '/flags/x', after: lit(true) }], env())
    expect(s.flags.x).toBeUndefined()
    expect(next.flags.x).toBe(true)
  })

  it('loại hiệu ứng lạ → lỗi; đủ 6 loại của Data Contract', () => {
    expect(() => applyEffects(baseState(), [{ op: 'delete', path: '/flags' }], env())).toThrow(
      Error,
    )
    expect(EFFECT_OPS.length).toBe(6)
  })
})

describe('effects — commitEvent (token chống trừ điểm hai lần)', () => {
  const event = { token: 'evt-1', penalty: 15, effects: [] }

  it('trừ uy tín đúng một lần; token trùng → trả lại đúng state cũ', () => {
    const first = commitEvent(baseState(), event, env())
    expect(first.applied).toBe(true)
    expect(first.state.credibility).toBe(85)
    expect(first.state.committed_events).toEqual(['evt-1'])
    const again = commitEvent(first.state, event, env())
    expect(again.applied).toBe(false)
    expect(again.state).toBe(first.state)
    expect(again.state.credibility).toBe(85)
  })

  it('uy tín không âm (max 0)', () => {
    const s = { ...baseState(), credibility: 10 }
    expect(commitEvent(s, event, env()).state.credibility).toBe(0)
  })

  it('token rỗng, penalty âm hoặc state thiếu committed_events → lỗi, state không đổi', () => {
    const s = baseState()
    expect(() => commitEvent(s, { ...event, token: '' }, env())).toThrow(TypeError)
    expect(() => commitEvent(s, { ...event, penalty: -5 }, env())).toThrow(RangeError)
    const { committed_events: _x, ...old } = s
    expect(() => commitEvent(old, event, env())).toThrow(TypeError)
    expect(s.credibility).toBe(100)
    expect(s.committed_events).toEqual([])
  })

  it('hiệu ứng lỗi → không trừ điểm, không ghi token', () => {
    const s = baseState()
    const bad = { ...event, effects: [{ op: 'set', path: '/credibility/x', after: lit(1) }] }
    expect(() => commitEvent(s, bad, env())).toThrow(Error)
    expect(s.credibility).toBe(100)
    expect(s.committed_events).toEqual([])
  })
})

describe('effects — loại nguồn (quy tắc validator Chương 1)', () => {
  it('nguồn cảnh sát Phase 3, hồ sơ xu/khảo sát Phase 4 → professional_record', () => {
    expect(sourceKindFor('P3_POLICE_CHECK__COMMIT', '/evidence_records/EV_A')).toBe(
      'professional_record',
    )
    expect(sourceKindFor('P3_REPORT_02', '/statements/ST_A')).toBe('professional_record')
    expect(sourceKindFor('P4_COIN_RECORD__COMMIT', '/evidence_records/EV_A')).toBe(
      'professional_record',
    )
  })

  it('quan sát → observed; còn lại → source_node', () => {
    expect(sourceKindFor('P2_ROOM__COMMIT', '/observations/OBS_A')).toBe('observed')
    expect(sourceKindFor('P2_LOCK__COMMIT', '/evidence_records/EV_A')).toBe('source_node')
    expect(sourceKindFor('P1_POLICE__COMMIT', '/statements/ST_A')).toBe('source_node')
  })
})

describe('effects — chạy trên dữ liệu thật chapter1.json', () => {
  const read = (name) =>
    JSON.parse(
      readFileSync(new URL(`../../../public/${chapterFileUrl(1, name)}`, import.meta.url), 'utf8'),
    )
  const chapter = read('graph')
  const { initialState } = read('state')
  const realEnv = (node) => ({ graph: chapter, node: node.id })
  const withEffects = chapter.nodes.filter((node) => node.effects?.length)

  it('mọi nút có hiệu ứng áp được lên state ban đầu, không lỗi, không sửa state gốc', () => {
    const before = JSON.stringify(initialState)
    const failures = []
    for (const node of withEffects) {
      try {
        applyEffects(initialState, node.effects, realEnv(node))
      } catch (error) {
        failures.push(error.message)
      }
    }
    expect(withEffects.length).toBe(104)
    expect(failures).toEqual([])
    expect(JSON.stringify(initialState)).toBe(before)
  })

  it('thu ổ khóa (P2_LOCK__COMMIT): bản ghi có nguồn P2_LOCK + ID vào evidence_collected', () => {
    const node = chapter.nodes.find((n) => n.id === 'P2_LOCK__COMMIT')
    const next = applyEffects(initialState, node.effects, realEnv(node))
    expect(next.evidence_collected).toEqual(['EV_LooseLock'])
    expect(next.evidence_records.EV_LooseLock.source_node).toBe('P2_LOCK')
    expect(next.evidence_records.EV_LooseLock.source_step).toBe('P2_LOCK__COMMIT')
  })
})
