/**
 * Nhép miệng theo chữ đang chạy: gặp dấu câu thì tạm dừng miệng (ngắt nghỉ tự nhiên),
 * gặp chữ thường thì nhép tiếp. Logic thuần — không phụ thuộc Phaser, test được.
 */
const PAUSE_CHARS = new Set(['.', ',', '!', '?', ';', ':', '…', '\n'])

/** @param {string} char ký tự vừa hiện @returns {boolean} true = miệng nên dừng */
export function shouldPauseMouth(char) {
  return PAUSE_CHARS.has(char)
}
