import { describe, expect, it } from 'vitest'
import {
  advanceWalkCycle,
  groundDirection,
  strideProgressMs,
  velocityFromInput,
  velocityToward,
} from './locomotion'

const speeds = { horizontal: 220, vertical: 88 }
const close = (a, b) => Math.abs(a - b) < 1e-9
/** Một nhịp: hướng, quãng bước (ms ở tốc độ chuẩn), nhịp khung của hướng đó. */
const tick = (facing, progressMs) => ({
  facing,
  progressMs,
  frameRate: facing === 'up' || facing === 'down' ? 12 : 24,
  frameCount: facing === 'up' || facing === 'down' ? 12 : 24,
})

describe('locomotion — tốc độ trên sàn nén 220/88 (DEC-020)', () => {
  it('đi ngang 220, đi dọc 88 px/giây', () => {
    const across = velocityToward(500, 0, speeds)
    const upward = velocityToward(0, -10, speeds)
    expect([close(across.x, 220), across.y]).toEqual([true, 0])
    expect([upward.x, close(upward.y, -88)]).toEqual([0, true])
    expect(velocityFromInput(-1, 0, speeds)).toEqual({ x: -220, y: 0 })
    expect(velocityFromInput(0, 1, speeds)).toEqual({ x: 0, y: 88 })
  })

  it('đi tới điểm: giữ đúng hướng màn hình, tốc độ nằm giữa 88 và 220', () => {
    const v = velocityToward(100, 100, speeds)
    expect(close(v.x, v.y)).toBe(true)
    const speed = Math.hypot(v.x, v.y)
    expect(speed).toBeGreaterThan(88)
    expect(speed).toBeLessThanOrEqual(220)
    // cùng nhịp bước: độ dài trên mặt sàn luôn = 1 bước/giây chuẩn
    const g = groundDirection(v.x, v.y, speeds)
    expect(close(Math.hypot(g.x, g.y), 1)).toBe(true)
  })

  it('phím chéo đi theo đường chéo của sàn (ngang 220·0,707, dọc 88·0,707)', () => {
    const v = velocityFromInput(1, -1, speeds)
    expect(close(v.x, 220 / Math.SQRT2)).toBe(true)
    expect(close(v.y, -88 / Math.SQRT2)).toBe(true)
  })

  it('quãng bước: đi đủ tốc độ trong dt ms → đúng dt ms, ở mọi hướng và mọi độ sâu', () => {
    const dt = 1000 / 60
    const step = (vx, vy, factor) =>
      strideProgressMs((vx * factor * dt) / 1000, (vy * factor * dt) / 1000, speeds, factor)
    expect(close(step(220, 0, 1), dt)).toBe(true)
    expect(close(step(0, -88, 1), dt)).toBe(true)
    expect(close(step(-220, 0, 0.67), dt)).toBe(true)
    const diag = velocityFromInput(1, 1, speeds)
    expect(close(step(diag.x, diag.y, 0.8), dt)).toBe(true)
  })

  it('quãng bước: bị chặn (không đi được) → 0, khung đứng yên; hệ số phối cảnh hỏng → 0', () => {
    expect(strideProgressMs(0, 0, speeds, 1)).toBe(0)
    expect(strideProgressMs(5, 0, speeds, 0)).toBe(0)
    const cycle = advanceWalkCycle(null, tick('right', 30))
    expect(advanceWalkCycle(cycle, tick('right', 0)).index).toBe(cycle.index)
  })

  it('chu kỳ đi: bắt đầu ở khung 0, đủ 24 khung/giây ngang và 12 khung/giây dọc rồi quay vòng', () => {
    const dt = 1000 / 60
    for (const [facing, perSecond] of [
      ['right', 24],
      ['up', 12],
    ]) {
      let cycle = advanceWalkCycle(null, tick(facing, 0))
      expect(cycle.index).toBe(0)
      const seen = [0]
      for (let n = 0; n < 66; n++) {
        cycle = advanceWalkCycle(cycle, tick(facing, dt))
        if (seen[seen.length - 1] !== cycle.index) seen.push(cycle.index)
      }
      // ~1,1 giây: đi qua đủ các khung theo đúng thứ tự trong 1 giây rồi về 0
      const expected = [...Array.from({ length: perSecond }, (_, i) => i), 0]
      expect(seen.slice(0, perSecond + 1)).toEqual(expected)
    }
  })

  it('chu kỳ đi: đi chậm (ví dụ trượt dọc vật cản) → khung đổi chậm tương ứng', () => {
    let full = advanceWalkCycle(null, tick('left', 0))
    let half = advanceWalkCycle(null, tick('left', 0))
    for (let n = 0; n < 20; n++) {
      full = advanceWalkCycle(full, tick('left', 1000 / 60))
      half = advanceWalkCycle(half, tick('left', 500 / 60))
    }
    expect(full.index).toBe(Math.floor((20 * 1000) / 60 / (1000 / 24)))
    expect(half.index).toBe(Math.floor((20 * 500) / 60 / (1000 / 24)))
  })

  it('chu kỳ đi: đổi hướng → bắt đầu lại từ khung 0 của hướng mới', () => {
    let cycle = advanceWalkCycle(null, tick('left', 0))
    for (let n = 0; n < 5; n++) cycle = advanceWalkCycle(cycle, tick('left', 1000 / 60))
    expect(cycle.index).toBeGreaterThan(0)
    const turned = advanceWalkCycle(cycle, tick('up', 0))
    expect([turned.facing, turned.index]).toEqual(['up', 0])
  })

  it('không có hướng → đứng yên', () => {
    expect(velocityToward(0, 0, speeds)).toEqual({ x: 0, y: 0 })
    expect(velocityFromInput(0, 0, speeds)).toEqual({ x: 0, y: 0 })
  })
})
