import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { CHAPTER_DATA, chapterFileUrl } from './chapters'

/**
 * Kiểm tra cấu trúc dữ liệu Chương 1 (Data Contract 2.0 — DEC-016, N0).
 * Bộ kiểm tra đầy đủ (mô phỏng 2 lượt chơi trọn chương) là `python scripts/chapter1/validate.py`;
 * test này chạy trong `npm run check` để bắt sớm lỗi khi nhóm sửa file dữ liệu.
 */
const readPublic = (url) =>
  JSON.parse(readFileSync(new URL(`../../../public/${url}`, import.meta.url), 'utf8'))
const load = (name) => readPublic(chapterFileUrl(1, name))

const graph = load('graph')
const ids = new Set(graph.nodes.map((node) => node.id))
const external = new Set(graph.externalNodes.map((node) => node.id))

const NODE_KEYS = ['targetNode', 'sourceNode', 'boardNode', 'entryNode', 'completionNode']

/** Gom mọi giá trị của các khóa trỏ tới nút, quét toàn bộ cây JSON. */
function collectTargets(value, out = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectTargets(item, out)
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (NODE_KEYS.includes(key)) out.push(child)
      else if (key === 'next' && typeof child === 'string') out.push(child)
      else if (key === 'possibleTargets') out.push(...child)
      else if (key === 'phaseEntries') out.push(...Object.values(child))
      collectTargets(child, out)
    }
  }
  return out
}

/** Gom mọi giá trị của một khóa (vd evidenceId) trong toàn bộ cây JSON. */
function collectKey(value, wanted, out = new Set()) {
  if (Array.isArray(value)) {
    for (const item of value) collectKey(item, wanted, out)
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (key === wanted && typeof child === 'string') out.add(child)
      collectKey(child, wanted, out)
    }
  }
  return out
}

describe('dữ liệu Chương 1 — Data Contract 2.0', () => {
  it('đúng phiên bản hợp đồng và chương', () => {
    expect(graph.contractVersion).toBe(CHAPTER_DATA[1].contractVersion)
    expect(graph.chapter).toBe(1)
  })

  it('id nút duy nhất', () => {
    expect(ids.size).toBe(graph.nodes.length)
  })

  it('mọi đường đi trỏ tới nút có thật hoặc biên ngoài đã khai báo (CH2_ENTRY)', () => {
    const broken = collectTargets(graph).filter((id) => !ids.has(id) && !external.has(id))
    expect([...new Set(broken)]).toEqual([])
  })

  it('biên ngoài chưa được triển khai và không trùng nút bên trong', () => {
    for (const node of graph.externalNodes) {
      expect([node.id, node.implemented]).toEqual([node.id, false])
      expect([node.id, ids.has(node.id)]).toEqual([node.id, false])
    }
  })

  it('mọi vật chứng và lời khai được nhắc tới đều có trong danh mục', () => {
    const evidenceIds = new Set(load('evidence').records.map((record) => record.id))
    const statementIds = new Set(load('statements').records.map((record) => record.id))
    const missingEvidence = [...collectKey(graph, 'evidenceId')].filter(
      (id) => !evidenceIds.has(id),
    )
    const usedStatements = [
      ...Object.keys(graph.statementRules),
      ...collectKey(graph, 'statementId'),
    ]
    const missingStatements = usedStatements.filter((id) => !statementIds.has(id))
    expect(missingEvidence).toEqual([])
    expect(missingStatements).toEqual([])
  })

  it('state ban đầu (v2) bắt đầu ở phòng 201, đúng nút mở màn', () => {
    const { initialState } = load('state')
    expect(initialState.schema_version).toBe(2)
    expect(initialState.chapter).toBe(1)
    expect(initialState.current_node).toBe(graph.entryNode)
    expect(initialState.scene_location).toBe('room201')
    expect(initialState.evidence_collected).toEqual([])
  })

  it('đường dẫn file: đúng thư mục chương; tên lạ báo lỗi', () => {
    expect(chapterFileUrl(1, 'graph')).toBe('assets/chapters/chapter1/chapter1.json')
    expect(() => chapterFileUrl(1, 'source-map')).toThrow(RangeError)
    expect(() => chapterFileUrl(9, 'graph')).toThrow(RangeError)
  })
})
