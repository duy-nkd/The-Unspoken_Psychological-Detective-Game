import { describe, expect, it } from 'vitest'
import { footAt } from '../../systems/depthScale'
import { buildGrid, findPath } from '../../systems/pathfinding'
import { isFootClear } from '../../systems/walkArea'
import { ROOMS, entrancePoint, roomBackground } from '.'
import { ROOM_204, ROOM_204_HOTSPOTS } from './room204'

it('các vùng bấm phòng 204 nằm trong ảnh và có lối đi giữa mọi điểm đứng', () => {
  const foot = ([, y]) => footAt(ROOM_204.depth, y)
  const grid = buildGrid(ROOM_204, foot)
  expect(isFootClear(ROOM_204, [830, 544], foot([830, 544]))).toBe(false)
  const hotspots = Object.entries(ROOM_204_HOTSPOTS)
  const starts = [
    ROOM_204.spawn,
    ...hotspots.map(
      ([
        ,
        {
          stand: [x, y],
        },
      ]) => ({ x, y }),
    ),
  ]
  for (const [
    index,
    [
      id,
      {
        stand: [x, y],
        rect: [left, top, width, height],
      },
    ],
  ] of hotspots.entries()) {
    expect(left >= 0 && top >= 0 && width > 0 && height > 0, id).toBe(true)
    expect(left + width <= 1280 && top + height <= 720, id).toBe(true)
    expect(isFootClear(ROOM_204, [x, y], foot([x, y])), id).toBe(true)
    for (const start of starts) expect(findPath(grid, start, { x, y }), id).not.toBeNull()
    for (const [
      otherId,
      {
        rect: [otherLeft, otherTop, otherWidth, otherHeight],
      },
    ] of hotspots.slice(index + 1)) {
      const overlap =
        left < otherLeft + otherWidth &&
        otherLeft < left + width &&
        top < otherTop + otherHeight &&
        otherTop < top + height
      expect(overlap, `${id} / ${otherId}`).toBe(false)
    }
  }
})

it('phòng 204 hiện ảnh Tùng trong lúc được khám hiện trường', () => {
  expect(roomBackground(ROOM_204)).toBe(ROOM_204.background)
  const flags = { inspect_permission: true, samples_submitted: false }
  expect(roomBackground(ROOM_204, { flags })).toBe(ROOM_204.backgroundWithTung)
  expect(roomBackground(ROOM_204, { flags: { ...flags, samples_submitted: true } })).toBe(
    ROOM_204.background,
  )
})

/** Kiểm tra chung cho MỌI phòng 2.5D (T-024): không kẹt nhân vật, cửa nối hai chiều. */
for (const room of Object.values(ROOMS)) {
  const foot = ([, y]) => footAt(room.depth, y)
  const clear = (x, y) => isFootClear(room, [x, y], foot([x, y]))

  describe(`phòng ${room.id}`, () => {
    it('điểm xuất hiện và mọi lối vào đứng được', () => {
      expect(clear(room.spawn.x, room.spawn.y)).toBe(true)
      for (const [from, point] of Object.entries(room.entrances ?? {})) {
        expect([from, clear(point.x, point.y)]).toEqual([from, true])
      }
    })

    it('mọi điểm đứng của hotspot đứng được và đi tới được từ mọi lối vào', () => {
      const grid = buildGrid(room, foot)
      const starts = [room.spawn, ...Object.values(room.entrances ?? {})]
      for (const hotspot of room.hotspots) {
        const [x, y] = hotspot.stand
        expect([hotspot.id, clear(x, y)]).toEqual([hotspot.id, true])
        for (const start of starts) {
          const path = findPath(grid, start, { x, y })
          expect([hotspot.id, Array.isArray(path)]).toEqual([hotspot.id, true])
        }
      }
    })

    it('cửa ra dẫn tới phòng có thật, và phòng đó có lối vào ngược lại', () => {
      for (const hotspot of room.hotspots.filter((h) => h.action === 'exit')) {
        const target = ROOMS[hotspot.target?.roomId]
        expect([hotspot.id, Boolean(target)]).toEqual([hotspot.id, true])
        expect([hotspot.id, Boolean(target.entrances?.[room.id])]).toEqual([hotspot.id, true])
      }
    })

    it('mã hotspot không trùng; lớp che có đủ ảnh + khung', () => {
      const ids = room.hotspots.map((h) => h.id)
      expect(new Set(ids).size).toBe(ids.length)
      for (const occluder of room.occluders) {
        expect(occluder.url).toMatch(/^assets\/images\/backgrounds\/.+\.webp$/)
        expect(occluder.width > 0 && occluder.height > 0).toBe(true)
      }
    })
  })
}

describe('entrancePoint', () => {
  const room = {
    spawn: { x: 1, y: 2, face: 'down' },
    entrances: { a: { x: 3, y: 4, face: 'left' } },
  }

  it('có lối vào từ phòng vừa rời -> dùng lối vào đó', () => {
    expect(entrancePoint(room, 'a')).toEqual({ x: 3, y: 4, face: 'left' })
  })

  it('New Game / phòng lạ / phòng không khai báo lối vào -> điểm xuất hiện mặc định', () => {
    expect(entrancePoint(room, null)).toBe(room.spawn)
    expect(entrancePoint(room, 'zzz')).toBe(room.spawn)
    expect(entrancePoint({ spawn: room.spawn }, 'a')).toBe(room.spawn)
  })
})
