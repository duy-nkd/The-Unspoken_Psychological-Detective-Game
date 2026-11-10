import { describe, expect, it } from 'vitest'
import { facingFromVector, idleFrameName, normalizeFacing, walkFrameName } from './facing'

describe('facing', () => {
  it('hướng theo trục trội trên mặt sàn; bằng nhau (phím chéo) → ngang', () => {
    expect(facingFromVector(-1, 0)).toBe('left')
    expect(facingFromVector(1, 1)).toBe('right')
    expect(facingFromVector(0, -1)).toBe('up')
    expect(facingFromVector(0.2, 1)).toBe('down')
    expect(facingFromVector(-0.5, 0.9)).toBe('down')
  })

  it('đứng yên giữ hướng cũ', () => {
    expect(facingFromVector(0, 0, 'up')).toBe('up')
  })

  it('tên khung theo atlas V6c — mỗi hướng ảnh riêng, không lật gương', () => {
    expect(walkFrameName('right', 3)).toBe('walk-right-03')
    expect(walkFrameName('up', 11)).toBe('walk-up-11')
    expect(idleFrameName('left')).toBe('idle-left')
  })

  it('hướng lạ (dữ liệu cũ) → nhìn xuống', () => {
    expect(normalizeFacing('front')).toBe('down')
    expect(idleFrameName(undefined)).toBe('idle-down')
  })
})
