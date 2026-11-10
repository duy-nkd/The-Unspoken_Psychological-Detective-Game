import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { chapterFileUrl } from '../data/chapters'
import {
  OPERATORS,
  buildBindings,
  createContext,
  evaluate,
  isTruthy,
  testCondition,
  valuesEqual,
} from './expr'

const lit = (literal) => ({ literal })
const ref = (path) => ({ ref: path })
const op = (name, ...args) => ({ op: name, args })

const state = {
  credibility: 85,
  current_phase: 2,
  evidence_collected: ['EV_LooseLock', 'EV_WetTowel'],
  statements: { S_HOA_01: { text: 'x' } },
  flags: { opening_seen: true, police_arrived: false },
  people: { PEO_HOA: { id: 'PEO_HOA' } },
  checkpoints: {},
  deduction: { draft: { who: null }, attempt_count: 1 },
}
const ctx = { state, bindings: {}, input: { sourceId: 'EV_WetTowel' } }
const run = (expr, predicates) => evaluate(expr, ctx, predicates)

describe('expr — các dạng biểu thức', () => {
  it('literal trả về bản sao', () => {
    const data = { a: [1] }
    const value = run(lit(data))
    value.a.push(2)
    expect(data.a).toEqual([1])
    expect(run(lit(null))).toBe(null)
  })

  it('ref đọc /state, /input, /bindings; thiếu → null', () => {
    expect(run(ref('/state/credibility'))).toBe(85)
    expect(run(ref('/input/sourceId'))).toBe('EV_WetTowel')
    expect(run(ref('/state/flags/never_set'))).toBe(null)
    expect(run(ref('/bindings/people/hoa'))).toBe(null)
  })

  it('predicate đánh giá biểu thức gốc theo tên; không có → lỗi; gọi vòng → lỗi', () => {
    const predicates = { SEEN: op('eq', ref('/state/flags/opening_seen'), lit(true)) }
    expect(run({ predicate: 'SEEN' }, predicates)).toBe(true)
    expect(() => run({ predicate: 'NOPE' }, predicates)).toThrow(Error)
    const loop = { A: { predicate: 'B' }, B: { predicate: 'A' } }
    expect(() => run({ predicate: 'A' }, loop)).toThrow(Error)
  })

  it('biểu thức hỏng → lỗi (không âm thầm coi là đúng)', () => {
    expect(() => run(null)).toThrow(TypeError)
    expect(() => run({})).toThrow(TypeError)
    expect(() => run({ op: 'xor', args: [] })).toThrow(Error)
    expect(() => run({ op: 'all' })).toThrow(TypeError)
    expect(() => run({ literal: 1, ref: '/state' })).toThrow(TypeError)
    expect(() => run(op('not'))).toThrow(TypeError)
    expect(() => run(op('eq', lit(1)))).toThrow(TypeError)
  })

  it('hỗ trợ đúng 15 toán tử của Data Contract', () => {
    expect(OPERATORS.length).toBe(15)
  })
})

describe('expr — toán tử logic (đúng/sai kiểu Python như validator)', () => {
  it('all / any / not; danh sách rỗng: all = đúng, any = sai', () => {
    expect(run(op('all', lit(true), lit(1)))).toBe(true)
    expect(run(op('all', lit(true), lit(false)))).toBe(false)
    expect(run(op('all'))).toBe(true)
    expect(run(op('any', lit(false), lit('x')))).toBe(true)
    expect(run(op('any'))).toBe(false)
    expect(run(op('not', lit(false)))).toBe(true)
  })

  it('mảng/object rỗng, 0, chuỗi rỗng, null là SAI', () => {
    expect([[], {}, 0, '', null, false].map(isTruthy)).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
    ])
    expect([[0], { a: 1 }, -1, 'a', true].map(isTruthy)).toEqual([true, true, true, true, true])
    expect(run(op('not', ref('/state/checkpoints')))).toBe(true)
  })

  it('cờ chưa có xem là false', () => {
    expect(run(op('eq', ref('/state/flags/never_set'), lit(true)))).toBe(false)
    expect(run(op('not', ref('/state/flags/never_set')))).toBe(true)
  })
})

describe('expr — exists, contains, eq, ne', () => {
  it('exists: khác null; bản ghi chưa có → false; false/0 vẫn là có', () => {
    expect(run(op('exists', ref('/state/statements/S_HOA_01')))).toBe(true)
    expect(run(op('exists', ref('/state/statements/S_LINH_01')))).toBe(false)
    expect(run(op('exists', ref('/state/deduction/draft/who')))).toBe(false)
    expect(run(op('exists', ref('/state/flags/police_arrived')))).toBe(true)
  })

  it('contains: mảng (phần tử), object (khóa), chuỗi (chuỗi con), null → false', () => {
    const ev = ref('/state/evidence_collected')
    expect(run(op('contains', ev, lit('EV_WetTowel')))).toBe(true)
    expect(run(op('contains', ev, lit('EV_Receipt')))).toBe(false)
    expect(run(op('contains', ref('/state/statements'), lit('S_HOA_01')))).toBe(true)
    expect(run(op('contains', lit('abc'), lit('b')))).toBe(true)
    expect(run(op('contains', ref('/state/missing'), lit('x')))).toBe(false)
    expect(() => run(op('contains', lit(5), lit(5)))).toThrow(TypeError)
  })

  it('eq / ne so sâu; null bằng null; true khác 1', () => {
    expect(run(op('eq', lit({ a: [1, 2] }), lit({ a: [1, 2] })))).toBe(true)
    expect(run(op('eq', lit([1, 2]), lit([2, 1])))).toBe(false)
    expect(run(op('eq', ref('/state/deduction/draft/who'), lit(null)))).toBe(true)
    expect(run(op('ne', ref('/state/deduction/draft/who'), lit(null)))).toBe(false)
    expect(run(op('eq', lit(true), lit(1)))).toBe(false)
    expect(run(op('eq', ref('/state/current_phase'), lit(2)))).toBe(true)
    expect(valuesEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
    expect(valuesEqual({ a: 1 }, { a: 1, b: undefined })).toBe(false)
  })
})

describe('expr — so sánh và số học', () => {
  it('gt / gte / lt / lte với số và chuỗi', () => {
    const c = ref('/state/credibility')
    expect(run(op('gt', c, lit(0)))).toBe(true)
    expect(run(op('gte', c, lit(85)))).toBe(true)
    expect(run(op('lt', c, lit(85)))).toBe(false)
    expect(run(op('lte', c, lit(0)))).toBe(false)
    expect(run(op('lt', lit('a'), lit('b')))).toBe(true)
  })

  it('so sánh khác kiểu hoặc với null → lỗi (Python cũng lỗi)', () => {
    expect(() => run(op('gt', ref('/state/missing'), lit(0)))).toThrow(TypeError)
    expect(() => run(op('lt', lit('1'), lit(2)))).toThrow(TypeError)
  })

  it('add / subtract / max / min chỉ nhận số', () => {
    expect(run(op('add', ref('/state/deduction/attempt_count'), lit(1)))).toBe(2)
    expect(run(op('add'))).toBe(0)
    expect(run(op('subtract', ref('/state/credibility'), lit(15)))).toBe(70)
    expect(run(op('max', lit(0), op('subtract', lit(10), lit(20))))).toBe(0)
    expect(run(op('min', lit(3), lit(-1), lit(2)))).toBe(-1)
    expect(() => run(op('add', ref('/state/missing'), lit(1)))).toThrow(TypeError)
    expect(() => run(op('max'))).toThrow(TypeError)
  })
})

describe('expr — testCondition', () => {
  it('không có điều kiện → đúng; có thì theo đúng/sai kiểu Python', () => {
    expect(testCondition(undefined, ctx)).toBe(true)
    expect(testCondition(lit([]), ctx)).toBe(false)
    expect(
      testCondition(op('contains', ref('/state/evidence_collected'), lit('EV_LooseLock')), ctx),
    ).toBe(true)
    expect(() => testCondition(null, ctx)).toThrow(TypeError)
  })
})

describe('expr — /bindings (adapter động của chương)', () => {
  const spec = {
    people: { hoa: { stateRecordId: 'PEO_HOA', statePath: '/people/PEO_HOA' } },
    checkpoints: {
      preFinal: { storageKey: 'ch1_pre_final', statePath: '/checkpoints/ch1_pre_final' },
    },
    notebook: { finalUpdate: { handlerId: 'commit_ch1_final_notebook' } },
  }

  it('people chỉ có khi bản ghi đã có; checkpoint chỉ có khi snapshot đã lưu', () => {
    expect(buildBindings(spec, { people: {}, checkpoints: {} })).toEqual({
      people: {},
      checkpoints: {},
      notebook: {},
    })
    const later = { people: { PEO_HOA: { id: 'PEO_HOA' } }, checkpoints: { ch1_pre_final: {} } }
    const b = buildBindings(spec, later)
    expect(b.people.hoa).toEqual({ id: 'PEO_HOA' })
    expect(b.checkpoints.preFinal).toBe('ch1_pre_final')
  })

  it('handler chỉ có khi engine đã triển khai (không đánh dấu ready khi chưa có)', () => {
    expect(buildBindings(spec, {}).notebook).toEqual({})
    const ready = buildBindings(spec, {}, new Set(['commit_ch1_final_notebook']))
    expect(ready.notebook.finalUpdate).toBe('commit_ch1_final_notebook')
  })

  it('createContext gắn state, bindings, input', () => {
    const c = createContext({ graph: { bindings: spec }, state: { people: {} } })
    expect(c.input).toEqual({})
    expect(evaluate(op('exists', ref('/bindings/people/hoa')), c)).toBe(false)
  })
})

describe('expr — quét toàn bộ điều kiện của chapter1.json', () => {
  const read = (name) =>
    JSON.parse(
      readFileSync(new URL(`../../../public/${chapterFileUrl(1, name)}`, import.meta.url), 'utf8'),
    )
  const graph = read('graph')
  const { initialState } = read('state')
  const evidenceIds = read('evidence').records.map((record) => record.id)

  /** Mọi biểu thức trong nút, luật lời khai, suy luận: condition(s), before, after. */
  const expressions = []
  const collect = (value) => {
    if (Array.isArray(value)) value.forEach(collect)
    else if (value && typeof value === 'object') {
      for (const [key, child] of Object.entries(value)) {
        const isExpr = ['condition', 'conditions', 'before', 'after'].includes(key)
        if (isExpr && child && typeof child === 'object' && !Array.isArray(child)) {
          expressions.push(child)
        }
        collect(child)
      }
    }
  }
  collect([graph.nodes, graph.statementRules, graph.deduction])

  it('tìm thấy đủ biểu thức để quét', () => {
    expect(expressions.length).toBeGreaterThan(1000)
  })

  it('đánh giá được mọi biểu thức ở state ban đầu, với mọi thẻ nguồn — không ném lỗi', () => {
    const failures = []
    for (const sourceId of [undefined, ...evidenceIds]) {
      const input = sourceId ? { sourceId } : {}
      const context = createContext({ graph, state: initialState, input })
      for (const expr of expressions) {
        try {
          evaluate(expr, context, graph.predicates)
        } catch (error) {
          failures.push(`${JSON.stringify(expr).slice(0, 80)} → ${error.message}`)
        }
      }
    }
    expect(failures.slice(0, 5)).toEqual([])
  })

  it('mọi predicate trả về boolean và đều SAI lúc bắt đầu chương (khớp validator Python)', () => {
    const context = createContext({ graph, state: initialState })
    const values = Object.keys(graph.predicates).map((name) =>
      evaluate({ predicate: name }, context, graph.predicates),
    )
    expect(values.length).toBe(19)
    expect(values.filter((v) => v !== false)).toEqual([])
  })

  it('nút mở đầu (entryNode) không bị điều kiện chặn lúc bắt đầu chương', () => {
    const context = createContext({ graph, state: initialState })
    const entry = graph.nodes.find((node) => node.id === graph.entryNode)
    expect(testCondition(entry.conditions, context, graph.predicates)).toBe(true)
  })
})
