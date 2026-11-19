import { describe, expect, it } from 'vitest'
import graph from '../../../public/assets/chapters/chapter1/chapter1.json'
import evidence from '../../../public/assets/chapters/chapter1/evidence.json'
import { tungObservationText } from './tungObservation'

describe('mô tả lần đầu quan sát Tùng', () => {
  it('lấy tư thế/vết thương đã có, không đưa suy luận hoặc vị trí bậu cửa vào preview', () => {
    const text = tungObservationText(graph, evidence)
    expect(text).toBe(
      'Tùng nằm trên sàn, sát mép giường. Một cánh tay gập gần người.\n\nBa vết cào đỏ rướm máu trên cổ, cổ áo xộc xệch.',
    )
    expect(text).not.toMatch(/nguyên nhân|tự cào|bậu cửa|ngoại lực/)
  })

  it('đọc chữ của graph phiên hiện tại thay vì hardcode mô tả trong giao diện', () => {
    const current = {
      nodes: [{ id: 'P1_002__005', text: 'A0.\n\nA1. A2. A3.' }],
    }
    const records = { records: [{ id: 'EV_NeckScratches', text: 'B1. B2.' }] }
    expect(tungObservationText(current, records)).toBe('A1. A2.\n\nB1.')
  })

  it('không tự điền nội dung khi nguồn thiếu', () => {
    expect(tungObservationText(null, null)).toBe('')
    expect(tungObservationText({ nodes: [] }, evidence)).toBe(
      'Ba vết cào đỏ rướm máu trên cổ, cổ áo xộc xệch.',
    )
  })
})
