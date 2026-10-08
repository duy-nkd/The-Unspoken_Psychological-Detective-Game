import { httpClient } from '@/shared/api/httpClient'
import { ENDPOINTS } from '@/shared/api/endpoints'

/**
 * POST /api/reports/bug — Project.docx §4.3
 * payload: { userId, reportContent } -> 201 Created
 * PENDING(ISS-09): quyền truy cập (bắt buộc đăng nhập hay ẩn danh) chưa được đặc tả.
 */
export const submitBugReport = ({ userId = null, reportContent }) =>
  httpClient.post(ENDPOINTS.reports.bug, { userId, reportContent })
