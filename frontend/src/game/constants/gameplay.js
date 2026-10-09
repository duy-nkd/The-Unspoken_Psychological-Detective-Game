/**
 * Thông số gameplay. Mỗi giá trị ghi nguồn; giá trị "TẠM" là thông số kỹ thuật
 * tài liệu chưa quy định — đổi tại đây, không rải số cứng trong code.
 */

/** Project.docx §3.3: khởi điểm 100, không âm. */
export const CREDIBILITY = Object.freeze({
  START: 100,
  MIN: 0,
  // §3.3: ΔP "thường từ 15 đến 30" tùy độ khó — CHỈ để tham khảo, không tự gán cho câu hỏi.
  // PENDING(ISS-15): bảng ΔP từng câu.
  TYPICAL_PENALTY_RANGE: Object.freeze([15, 30]),
})

/** Project.docx §5.2: auto save mỗi 5 phút hoặc khi có sự kiện quan trọng. */
export const AUTOSAVE = Object.freeze({
  INTERVAL_MS: 5 * 60 * 1000,
  REASONS: Object.freeze({
    INTERVAL: 'interval',
    MANUAL: 'manual',
    EVIDENCE_COLLECTED: 'evidence-collected',
  }),
})

/** TẠM — tài liệu chưa quy định tốc độ chữ chạy (§3.2 chỉ nêu dùng time.addEvent). */
export const TYPEWRITER = Object.freeze({
  CHAR_DELAY_MS: 30,
})

/** Chương mở đầu khi New Game (Capstone 1 = Chương 1, §6.1). */
export const FIRST_CHAPTER = 1
