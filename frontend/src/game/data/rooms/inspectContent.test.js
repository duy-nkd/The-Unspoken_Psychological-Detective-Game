import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { ROOMS } from '.'
import { getInspectLines } from './inspectContent'

const publicFile = (url) => new URL(`../../../../public/${url}`, import.meta.url)

describe('inspectContent — lời khi xem đồ vật', () => {
  it('lấy đúng các câu, bỏ câu rỗng / sai kiểu', () => {
    const content = { A: ['Một.', '', '  ', 2, 'Hai.'] }
    expect(getInspectLines(content, 'A')).toEqual(['Một.', 'Hai.'])
  })

  it('thiếu khóa / file hỏng -> []', () => {
    expect(getInspectLines(null, 'A')).toEqual([])
    expect(getInspectLines({ A: 'không phải mảng' }, 'A')).toEqual([])
    expect(getInspectLines({}, 'B')).toEqual([])
  })

  it('file nội dung của mỗi phòng là JSON hợp lệ, đủ khóa cho mọi đồ vật xem được, không thừa khóa', () => {
    for (const room of Object.values(ROOMS)) {
      const ids = room.hotspots.filter((h) => h.action === 'inspect').map((h) => h.id)
      if (!ids.length && !room.inspectContent) continue // phòng 204 đọc lời xem đồ từ graph
      expect([room.id, Boolean(room.inspectContent)]).toEqual([room.id, true])
      const content = JSON.parse(readFileSync(publicFile(room.inspectContent.url), 'utf8'))
      for (const id of ids) expect([id, Array.isArray(content[id])]).toEqual([id, true])
      const unknown = Object.keys(content).filter((k) => !k.startsWith('_') && !ids.includes(k))
      expect([room.id, unknown]).toEqual([room.id, []])
    }
  })
})
