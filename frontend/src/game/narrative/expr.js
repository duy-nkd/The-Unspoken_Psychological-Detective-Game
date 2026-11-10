import { cloneJson, getPath, isPlainObject } from './statePath'

/**
 * Bộ đánh giá điều kiện (Condition AST) — Data Contract 2.0 mục "Condition AST" (DEC-016, kế hoạch N1).
 *
 * Dạng biểu thức: `{literal: v}` · `{ref: '/state/...'}` · `{predicate: 'TÊN'}` · `{op, args: [...]}` với op thuộc
 * OPERATORS. Ngữ nghĩa giữ ĐÚNG như `Runner.ev` trong `validate_data.py` của gói (bộ kiểm tra chuẩn — test vàng N5 so lại):
 *   - mọi `args` được đánh giá hết rồi mới áp toán tử (không "đoản mạch") → lỗi dữ liệu ở nhánh nào cũng lộ ra;
 *   - đúng/sai theo kiểu Python: null, false, 0, '', [] và {} là SAI (khác JS: [] và {} là đúng);
 *   - ref thiếu → null; `exists` = khác null; cờ chưa có → null → so `eq true` ra sai (= "cờ chưa có xem là false");
 *   - `contains` trên null → false; trên mảng → có phần tử bằng; trên object → có khóa; trên chuỗi → chứa chuỗi con.
 * Khác Python (chặt hơn, để bắt lỗi dữ liệu sớm): sai số đối số, so sánh/cộng khác kiểu, biểu thức có khóa lạ → ném lỗi.
 * KHÔNG tự dựng Evidence/Statement còn thiếu để điều kiện đúng — chỉ đọc state thật.
 */
export const OPERATORS = Object.freeze([
  'all',
  'any',
  'not',
  'exists',
  'contains',
  'eq',
  'ne',
  'gt',
  'gte',
  'lt',
  'lte',
  'add',
  'subtract',
  'max',
  'min',
])

/** Số đối số: [ít nhất, nhiều nhất]. */
const ARITY = {
  all: [0, Infinity],
  any: [0, Infinity],
  add: [0, Infinity],
  max: [1, Infinity],
  min: [1, Infinity],
  not: [1, 1],
  exists: [1, 1],
  contains: [2, 2],
  eq: [2, 2],
  ne: [2, 2],
  gt: [2, 2],
  gte: [2, 2],
  lt: [2, 2],
  lte: [2, 2],
  subtract: [2, 2],
}

/** Đúng/sai theo kiểu Python (giống validator): rỗng là sai. */
export function isTruthy(value) {
  if (value === null || value === undefined || value === false || value === 0 || value === '') {
    return false
  }
  if (Array.isArray(value)) return value.length > 0
  if (isPlainObject(value)) return Object.keys(value).length > 0
  return true
}

/** So sánh bằng sâu cho giá trị JSON (như `==` của Python trên dữ liệu JSON; true ≠ 1). */
export function valuesEqual(a, b) {
  if (a === b) return true
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false
    return a.every((item, i) => valuesEqual(item, b[i]))
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const keys = Object.keys(a)
    if (keys.length !== Object.keys(b).length) return false
    return keys.every((key) => Object.hasOwn(b, key) && valuesEqual(a[key], b[key]))
  }
  return false
}

/**
 * Dựng `/bindings` từ khối `bindings` gốc của chương (DATA_CONTRACT: "adapter động").
 *   - mục có `handlerId` chỉ tồn tại khi engine ĐÃ triển khai handler đó (vd `commit_ch1_final_notebook`);
 *   - mục có `statePath` chỉ tồn tại khi state có giá trị khác null ở đó: giá trị = `storageKey` nếu khai báo
 *     (checkpoint), ngược lại = chính bản ghi (people).
 */
export function buildBindings(spec, state, implementedHandlers = new Set()) {
  const bindings = {}
  for (const [group, entries] of Object.entries(spec ?? {})) {
    bindings[group] = {}
    for (const [key, entry] of Object.entries(entries)) {
      if (entry.handlerId !== undefined) {
        if (implementedHandlers.has(entry.handlerId)) bindings[group][key] = entry.handlerId
        continue
      }
      const value = getPath(state, entry.statePath)
      if (value !== null) bindings[group][key] = entry.storageKey ?? value
    }
  }
  return bindings
}

/**
 * Ngữ cảnh để `ref` đọc: `/state` (state đang chơi), `/bindings`, `/input` (vd `/input/sourceId` = thẻ người chơi chọn).
 * Dựng lại SAU MỖI thay đổi state (validator dựng lại ở mỗi lần đọc ref) — hiệu ứng nhiều bước phải gọi lại (N2).
 */
export function createContext({ graph, state, input = {}, handlers = [] }) {
  return {
    state,
    bindings: buildBindings(graph?.bindings, state, new Set(handlers)),
    input: input ?? {},
  }
}

/**
 * Đánh giá biểu thức, trả về giá trị (có thể không phải boolean, vd `add`).
 * @param {object} expr biểu thức AST
 * @param {{state: object, bindings: object, input: object}} context xem createContext
 * @param {Record<string, object>} predicates khối `predicates` gốc của chương
 */
export function evaluate(expr, context, predicates = {}) {
  return evalNode(expr, context, predicates, [])
}

/**
 * Điều kiện đúng/sai. Không có điều kiện (`undefined`) → đúng ("Nếu không có condition riêng thì true").
 * `null` hoặc biểu thức hỏng → ném lỗi (lỗi dữ liệu, không âm thầm coi là đúng).
 */
export function testCondition(expr, context, predicates = {}) {
  if (expr === undefined) return true
  return isTruthy(evaluate(expr, context, predicates))
}

function evalNode(expr, context, predicates, stack) {
  if (!isPlainObject(expr)) throw new TypeError(`Biểu thức không hợp lệ: ${describe(expr)}`)
  if (Object.hasOwn(expr, 'literal')) {
    expectKeys(expr, ['literal'])
    return cloneJson(expr.literal)
  }
  if (Object.hasOwn(expr, 'ref')) {
    expectKeys(expr, ['ref'])
    return getPath(context, expr.ref)
  }
  if (Object.hasOwn(expr, 'predicate')) {
    expectKeys(expr, ['predicate'])
    return evalPredicate(expr.predicate, context, predicates, stack)
  }
  if (Object.hasOwn(expr, 'op')) {
    expectKeys(expr, ['op', 'args'])
    return evalOperator(expr, context, predicates, stack)
  }
  throw new TypeError(`Biểu thức không hợp lệ: ${describe(expr)}`)
}

function evalPredicate(name, context, predicates, stack) {
  if (typeof name !== 'string' || !Object.hasOwn(predicates, name)) {
    throw new Error(`Predicate không tồn tại: ${describe(name)}`)
  }
  if (stack.includes(name)) {
    throw new Error(`Predicate gọi vòng: ${[...stack, name].join(' → ')}`)
  }
  return evalNode(predicates[name], context, predicates, [...stack, name])
}

function evalOperator(expr, context, predicates, stack) {
  const { op, args } = expr
  if (!Object.hasOwn(ARITY, op)) throw new Error(`Toán tử không hỗ trợ: ${describe(op)}`)
  if (!Array.isArray(args)) throw new TypeError(`"${op}": args phải là mảng`)
  const [min, max] = ARITY[op]
  if (args.length < min || args.length > max) {
    throw new TypeError(`"${op}": sai số đối số (${args.length})`)
  }
  const a = args.map((arg) => evalNode(arg, context, predicates, stack))
  switch (op) {
    case 'all':
      return a.every(isTruthy)
    case 'any':
      return a.some(isTruthy)
    case 'not':
      return !isTruthy(a[0])
    case 'exists':
      return a[0] !== null && a[0] !== undefined
    case 'contains':
      return contains(a[0], a[1])
    case 'eq':
      return valuesEqual(a[0], a[1])
    case 'ne':
      return !valuesEqual(a[0], a[1])
    case 'gt':
      return compare(op, a[0], a[1]) > 0
    case 'gte':
      return compare(op, a[0], a[1]) >= 0
    case 'lt':
      return compare(op, a[0], a[1]) < 0
    case 'lte':
      return compare(op, a[0], a[1]) <= 0
    case 'add':
      return numbers(op, a).reduce((sum, n) => sum + n, 0)
    case 'subtract': {
      const [x, y] = numbers(op, a)
      return x - y
    }
    case 'max':
      return Math.max(...numbers(op, a))
    case 'min':
      return Math.min(...numbers(op, a))
    default:
      throw new Error(`Toán tử không hỗ trợ: ${describe(op)}`)
  }
}

function contains(container, item) {
  if (container === null || container === undefined) return false
  if (Array.isArray(container)) return container.some((x) => valuesEqual(x, item))
  if (isPlainObject(container)) return typeof item === 'string' && Object.hasOwn(container, item)
  if (typeof container === 'string' && typeof item === 'string') return container.includes(item)
  throw new TypeError(`"contains": không áp dụng cho ${describe(container)} / ${describe(item)}`)
}

function compare(op, x, y) {
  const sameKind =
    (typeof x === 'number' && typeof y === 'number') ||
    (typeof x === 'string' && typeof y === 'string')
  if (!sameKind) {
    throw new TypeError(`"${op}": không so sánh được ${describe(x)} với ${describe(y)}`)
  }
  if (x === y) return 0
  return x > y ? 1 : -1
}

function numbers(op, values) {
  for (const v of values) {
    if (typeof v !== 'number' || !Number.isFinite(v)) {
      throw new TypeError(`"${op}": cần số, nhận ${describe(v)}`)
    }
  }
  return values
}

function expectKeys(expr, allowed) {
  const extra = Object.keys(expr).filter((key) => !allowed.includes(key))
  if (extra.length) {
    throw new TypeError(`Biểu thức có khóa lạ (${extra.join(', ')}): ${describe(expr)}`)
  }
}

function describe(value) {
  const text = JSON.stringify(value)
  return text === undefined ? String(value) : text.slice(0, 120)
}
