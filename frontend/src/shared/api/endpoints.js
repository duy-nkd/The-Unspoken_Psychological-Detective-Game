/**
 * NGUỒN DUY NHẤT cho đường dẫn REST API — khớp Project.docx §4.3.
 * Thêm endpoint mới: chỉ sau khi API Contract được duyệt (xem PROJECT_MEMORY.md mục E).
 * Đường dẫn tương đối với env.apiBaseUrl (mặc định http://localhost:8080/api).
 */
export const ENDPOINTS = Object.freeze({
  auth: {
    register: '/auth/register', // POST  -> 201 Created
    login: '/auth/login', // POST  -> 200 { token, type, username, role }
  },
  game: {
    save: '/game/save', // POST  -> 200 { message, updatedAt }
    load: (userId) => `/game/load/${encodeURIComponent(userId)}`, // GET -> 200
  },
  reports: {
    bug: '/reports/bug', // POST  -> 201 Created
  },
  // PENDING(ISS-10): API admin (danh sách bug, PENDING->RESOLVED, thống kê) chưa được đặc tả
})
