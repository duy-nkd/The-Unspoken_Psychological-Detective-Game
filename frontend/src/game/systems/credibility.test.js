import { describe, expect, it } from 'vitest'
import { applyPenalty, isDepleted } from './credibility'

describe('credibility — Project.docx §3.3', () => {
  it('trừ đúng ΔP', () => {
    expect(applyPenalty(100, 15)).toBe(85)
    expect(applyPenalty(85, 30)).toBe(55)
  })

  it('không bao giờ âm: max(0, c − ΔP)', () => {
    expect(applyPenalty(10, 30)).toBe(0)
    expect(applyPenalty(0, 15)).toBe(0)
  })

  it('ΔP = 0 giữ nguyên', () => {
    expect(applyPenalty(70, 0)).toBe(70)
  })

  it('từ chối tham số sai để lộ bug sớm', () => {
    expect(() => applyPenalty(100, -5)).toThrow(RangeError)
    expect(() => applyPenalty('100', 5)).toThrow(TypeError)
    expect(() => applyPenalty(100, Number.NaN)).toThrow(TypeError)
  })

  it('isDepleted khi uy tín về 0', () => {
    expect(isDepleted(0)).toBe(true)
    expect(isDepleted(1)).toBe(false)
  })
})
