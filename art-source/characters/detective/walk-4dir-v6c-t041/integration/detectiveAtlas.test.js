import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { ROOM_MOVEMENT } from '../constants/gameplay'
import { FACINGS } from '../systems/facing'
import { DETECTIVE_ATLAS } from './Player'

/** detective.json do scripts/art/build_detective_atlas.py tạo — hằng số trong code phải khớp meta (DEC-020). */
const atlas = JSON.parse(
  readFileSync(new URL(`../../../public/${DETECTIVE_ATLAS.atlasUrl}`, import.meta.url), 'utf8'),
)
const pad = (n) => String(n).padStart(2, '0')

describe('atlas thám tử V6c', () => {
  it('đủ khung đi 4 hướng + 4 tư thế đứng', () => {
    const missing = []
    for (const facing of FACINGS) {
      for (let i = 0; i < DETECTIVE_ATLAS.walk[facing].frames; i++) {
        if (!atlas.frames[`walk-${facing}-${pad(i)}`]) missing.push(`walk-${facing}-${pad(i)}`)
      }
      if (!atlas.frames[`idle-${facing}`]) missing.push(`idle-${facing}`)
    }
    expect(missing).toEqual([])
    expect(Object.keys(atlas.frames).length).toBe(76)
  })

  it('gốc (điểm chân) và chiều cao người khớp số trong code', () => {
    expect(atlas.meta.origin).toEqual(DETECTIVE_ATLAS.origin)
    expect(atlas.meta.sourceHeight).toBe(DETECTIVE_ATLAS.sourceHeight)
  })

  it('số khung, nhịp và tốc độ khớp gói V6c + DEC-020 (ngang 220, dọc 88)', () => {
    for (const facing of FACINGS) {
      const meta = atlas.meta.animations[facing]
      expect([meta.frames, meta.frameRate]).toEqual([
        DETECTIVE_ATLAS.walk[facing].frames,
        DETECTIVE_ATLAS.walk[facing].frameRate,
      ])
      const speed =
        facing === 'left' || facing === 'right'
          ? ROOM_MOVEMENT.WALK_SPEED
          : ROOM_MOVEMENT.WALK_SPEED_VERTICAL
      expect(meta.speed).toBe(speed)
    }
  })

  it('ảnh atlas không vượt 4096 px (giới hạn WebGL máy yếu)', () => {
    expect(atlas.meta.size.w).toBeLessThanOrEqual(4096)
    expect(atlas.meta.size.h).toBeLessThanOrEqual(4096)
  })
})
