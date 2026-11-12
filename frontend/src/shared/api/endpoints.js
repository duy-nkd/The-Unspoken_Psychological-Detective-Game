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
  admin: {
    overview: '/admin/overview', // GET -> 200 AdminOverviewResponse
    users: '/admin/users', // GET -> 200 List<AdminUserItemDto>
    userSave: (userId) => `/admin/users/${encodeURIComponent(userId)}/save`, // GET -> 200 AdminUserSaveDetailDto
    bugs: '/admin/reports/bugs', // GET ?status=ALL|PENDING|RESOLVED -> 200 List<AdminBugReportDto>
    bugStatus: (id) => `/admin/reports/bugs/${encodeURIComponent(id)}/status`, // PATCH -> 200 AdminBugReportDto
    evidence: '/admin/evidence', // GET -> 200, POST -> 201
    evidenceItem: (id) => `/admin/evidence/${encodeURIComponent(id)}`, // PUT -> 200, DELETE -> 200
    seedChapter1Evidence: '/admin/evidence/seed-chapter1', // POST -> 200 List<AdminEvidenceDto>
  },
})
