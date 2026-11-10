import { describe, expect, it } from 'vitest'
import { cloneJson, getPath, parsePath, setPath } from './statePath'

describe('statePath — đọc/ghi state theo đường dẫn (như get/put của validate_data.py)', () => {
  const state = {
    flags: { opening_seen: true, empty: false },
    evidence_collected: ['EV_LooseLock'],
    deduction: { draft: { who: null } },
  }

  it('tách đường dẫn; bỏ "/" thừa ở hai đầu', () => {
    expect(parsePath('/flags/opening_seen')).toEqual(['flags', 'opening_seen'])
    expect(parsePath('/flags/')).toEqual(['flags'])
  })

  it('đường dẫn sai định dạng hoặc dùng khóa nguy hiểm → lỗi', () => {
    expect(() => parsePath('flags/x')).toThrow(TypeError)
    expect(() => parsePath('/flags//x')).toThrow(TypeError)
    expect(() => parsePath(42)).toThrow(TypeError)
    expect(() => parsePath('/__proto__/polluted')).toThrow(TypeError)
    expect(() => parsePath('/flags/constructor')).toThrow(TypeError)
  })

  it('đọc giá trị lồng nhau, kể cả false và null', () => {
    expect(getPath(state, '/flags/opening_seen')).toBe(true)
    expect(getPath(state, '/flags/empty')).toBe(false)
    expect(getPath(state, '/deduction/draft/who')).toBe(null)
    expect(getPath(state, '/evidence_collected')).toEqual(['EV_LooseLock'])
  })

  it('thiếu → null (cờ chưa có, bản ghi chưa có); không đánh chỉ số mảng', () => {
    expect(getPath(state, '/flags/never_set')).toBe(null)
    expect(getPath(state, '/statements/S_X/text')).toBe(null)
    expect(getPath(state, '/evidence_collected/0')).toBe(null)
    expect(getPath(state, '/flags/opening_seen/deeper')).toBe(null)
    expect(getPath(null, '/flags')).toBe(null)
  })

  it('không đọc thuộc tính kế thừa của object', () => {
    expect(getPath({}, '/toString')).toBe(null)
    expect(getPath({ a: {} }, '/a/hasOwnProperty')).toBe(null)
  })

  it('ghi tạo object trung gian còn thiếu', () => {
    const s = { flags: {} }
    setPath(s, '/evidence_records/EV_A/status', 'collected')
    expect(s).toEqual({ flags: {}, evidence_records: { EV_A: { status: 'collected' } } })
  })

  it('ghi BẢN SAO — sửa giá trị gốc sau đó không làm đổi state', () => {
    const s = {}
    const record = { id: 'EV_A', tags: ['x'] }
    setPath(s, '/evidence_records/EV_A', record)
    record.tags.push('y')
    expect(s.evidence_records.EV_A.tags).toEqual(['x'])
  })

  it('ghi xuyên qua giá trị không phải object → lỗi (không ghi đè âm thầm)', () => {
    expect(() => setPath({ flags: true }, '/flags/x', 1)).toThrow(TypeError)
    expect(() => setPath({ a: null }, '/a/b', 1)).toThrow(TypeError)
    expect(() => setPath({ a: [] }, '/a/b', 1)).toThrow(TypeError)
    expect(() => setPath(null, '/a', 1)).toThrow(TypeError)
  })

  it('cloneJson: undefined → null; giá trị đơn giữ nguyên', () => {
    expect(cloneJson(undefined)).toBe(null)
    expect(cloneJson(3)).toBe(3)
    expect(cloneJson('a')).toBe('a')
  })
})
