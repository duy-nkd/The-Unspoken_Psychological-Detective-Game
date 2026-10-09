/**
 * Dữ liệu hội thoại — Project.docx §3.2: JSON kịch bản nằm trong public/assets/dialogues/,
 * nạp bất đồng bộ (Phaser Loader trong PreloadScene).
 *
 * File này là NƠI DUY NHẤT biết cấu trúc file JSON. Khi schema được chốt (ISS-07),
 * chỉ cần sửa parseDialogueFile — các scene không phải đổi.
 */

export const dialogueCacheKey = (chapter) => `dialogue-chapter-${chapter}`
export const dialogueUrl = (chapter) => `assets/dialogues/chapter-${chapter}.json`

/**
 * Chuẩn hóa file JSON -> { chapter, title, lines: [{ speaker, text, portrait }] }.
 * Cấu trúc file hiện có trong repo: { chapter, title, dialogues: [] }.
 * PENDING(ISS-07): tên trường của từng câu thoại chưa được đặc tả; tạm đọc speaker/text/portrait.
 */
export function parseDialogueFile(raw) {
  if (!raw || typeof raw !== 'object') {
    throw new TypeError('File hội thoại không hợp lệ (không phải object JSON)')
  }
  const rawLines = Array.isArray(raw.dialogues) ? raw.dialogues : []
  return {
    chapter: raw.chapter ?? null,
    title: raw.title ?? '',
    lines: rawLines.map((line, index) => ({
      speaker: line?.speaker ?? '',
      text: String(line?.text ?? ''),
      portrait: line?.portrait ?? null,
      index,
    })),
  }
}
