import { describe, expect, it } from 'vitest'
import { shouldPauseMouth } from './lipSync'

describe('lipSync — nhép miệng theo chữ', () => {
  it('dừng miệng ở dấu câu', () => {
    for (const char of ['.', ',', '!', '?', '…']) expect(shouldPauseMouth(char)).toBe(true)
  })

  it('nhép tiếp ở chữ cái và khoảng trắng', () => {
    for (const char of ['a', 'Ô', 'ữ', ' ']) expect(shouldPauseMouth(char)).toBe(false)
  })
})
