import { describe, expect, it } from 'vitest'
import { NOTEBOOK_TABS, addEntry, createEmptyNotebook } from './notebook'

describe('notebook — Project.docx §3.2', () => {
  it('có đúng 4 tab theo thứ tự tài liệu', () => {
    expect(NOTEBOOK_TABS.map((t) => t.label)).toEqual([
      'Evidence',
      'People',
      'Timeline',
      'Statements',
    ])
  })

  it('notebook rỗng có 4 danh sách trống', () => {
    expect(createEmptyNotebook()).toEqual({
      evidence: [],
      people: [],
      timeline: [],
      statements: [],
    })
  })

  it('thêm entry không làm thay đổi object cũ', () => {
    const before = createEmptyNotebook()
    const after = addEntry(before, 'evidence', { id: 'EV-TEST' })
    expect(before.evidence.length).toBe(0)
    expect(after.evidence.length).toBe(1)
  })

  it('bỏ qua entry trùng id', () => {
    const once = addEntry(createEmptyNotebook(), 'evidence', { id: 'EV-TEST' })
    const twice = addEntry(once, 'evidence', { id: 'EV-TEST' })
    expect(twice).toBe(once)
  })

  it('từ chối tab lạ và entry thiếu id', () => {
    expect(() => addEntry(createEmptyNotebook(), 'inventory', { id: 'x' })).toThrow(RangeError)
    expect(() => addEntry(createEmptyNotebook(), 'people', {})).toThrow(TypeError)
  })
})
