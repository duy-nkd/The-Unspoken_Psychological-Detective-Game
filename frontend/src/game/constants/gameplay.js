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
    STORY_PROGRESS: 'story-progress',
  }),
})

/** TẠM — tài liệu chưa quy định tốc độ chữ chạy (§3.2 chỉ nêu dùng time.addEvent). */
export const TYPEWRITER = Object.freeze({
  CHAR_DELAY_MS: 30,
  /** Thiết lập "Tốc độ chữ" (DEC-012). 0 = hiện ngay cả câu. "normal" = CHAR_DELAY_MS. */
  SPEED_DELAYS_MS: Object.freeze({ slow: 50, normal: 30, fast: 15, instant: 0 }),
  /** Thiết lập "Tự động chuyển thoại": chờ bao lâu sau khi chữ hiện hết. TẠM. */
  AUTO_ADVANCE_DELAY_MS: 1500,
})

/** TẠM — cỡ chữ thân khung hội thoại theo thiết lập "Cỡ chữ hội thoại" (DEC-012), đơn vị px. */
export const DIALOGUE_FONT_SIZES = Object.freeze({ medium: 22, large: 26 })

/** Chương mở đầu khi New Game (Capstone 1 = Chương 1, §6.1). */
export const FIRST_CHAPTER = 1

/**
 * TẠM — di chuyển trong phòng 2.5D (DEC-013). Tài liệu chưa quy định; chỉnh khi chơi thử.
 * WALK_SPEED: px/giây ở mốc gần camera; ở xa nhân dần theo phối cảnh (systems/depthScale.js).
 */
export const ROOM_MOVEMENT = Object.freeze({
  WALK_SPEED: 220, // DEC-014: nhân vật nhỏ hơn -> giảm theo để bước chân không "trượt"
  // T-026: chu kỳ đi 6 khung mới, bước chân ≈ 0,27 chiều cao người -> lật ~7,4 hình/giây thì chân khớp
  // sàn ở WALK_SPEED 220 (6 × 220 / (2 × 0,27 × 330)); làm tròn 8. Đổi WALK_SPEED thì tính lại.
  WALK_ANIM_FPS: 8,
  /** Biên độ nhún (px, ở mốc gần) khi đi dọc — tạm thay chu kỳ đi lên/xuống còn thiếu (Q-R5). */
  BOB_HEIGHT: 6,
  BOB_PERIOD_MS: 320,
  /** Khoảng cách (px) từ chân tới điểm đứng của đồ vật để hiện nút E. */
  INTERACT_RADIUS: 70,
  /** Tới gần điểm đích của đường đi bao nhiêu thì coi là đã tới. */
  ARRIVE_EPSILON: 3,
  /** Bước 1 tutorial: chạm vòng sáng trong bán kính này. */
  MARKER_RADIUS: 40,
})
