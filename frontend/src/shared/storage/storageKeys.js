/**
 * Tất cả key localStorage của ứng dụng — khai báo một chỗ để tránh trùng/gõ sai.
 * Đổi tên key = mất dữ liệu cũ của người chơi -> tăng hậu tố version (v1 -> v2).
 */
export const STORAGE_KEYS = Object.freeze({
  AUTH_SESSION: 'theUnspoken.auth.v1',
  // Hybrid Storage (Project.docx §6.3): bản sao lưu trạng thái mới nhất
  LOCAL_SAVE_BACKUP: 'theUnspoken.save.backup.v1',
})
