import { describe, expect, it } from 'vitest'
import { cutoutNpcPixels } from './npcCutout'

function image(rows, colors = {}) {
  const palette = {
    '.': [248, 239, 224, 255],
    '#': [40, 35, 30, 255],
    w: [255, 255, 255, 255],
    s: [215, 165, 125, 255],
    ...colors,
  }
  return {
    width: rows[0].length,
    height: rows.length,
    data: new Uint8ClampedArray(rows.flatMap((row) => [...row].flatMap((char) => palette[char]))),
  }
}

describe('tách model từ bảng thiết kế NPC', () => {
  it('xóa giấy và tiêu đề rời, giữ cơ thể và vùng màu sáng kín bên trong', () => {
    const input = image(['#......', '...###.', '...#w#.', '...#s#.', '...###.', '.......'])
    const original = input.data.slice()
    const result = cutoutNpcPixels(input)
    expect(result.bounds).toEqual([3, 1, 3, 4])
    expect(result.data[3]).toBe(0)
    expect(result.data[(2 * input.width + 4) * 4 + 3]).toBe(255)
    expect(result.data[(3 * input.width + 4) * 4 + 3]).toBe(255)
    expect(input.data).toEqual(original)
  })

  it('giữ alpha bán trong suốt ở viền model PNG, không biến nền alpha0 thành giấy', () => {
    const input = image(['...', '.#s', '...'], { '.': [0, 0, 0, 0], s: [90, 70, 40, 96] })
    const result = cutoutNpcPixels(input)
    expect(result.bounds).toEqual([1, 1, 2, 1])
    expect(result.data[(input.width + 2) * 4 + 3]).toBe(96)
    expect(result.data[3]).toBe(0)
  })

  it('không tạo model giả khi khung chỉ có nền', () => {
    expect(cutoutNpcPixels(image(['...', '...', '...'])).bounds).toBeNull()
  })
})
