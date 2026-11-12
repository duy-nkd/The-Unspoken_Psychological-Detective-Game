import { httpClient } from '@/shared/api/httpClient'
import { ENDPOINTS } from '@/shared/api/endpoints'

/**
 * REST API cho Website Admin (/api/admin/** — DEC-024, Project.docx §5.1).
 * Yêu cầu JWT token của tài khoản có role = ROLE_ADMIN.
 */
export async function fetchAdminOverview() {
  const { data } = await httpClient.get(ENDPOINTS.admin.overview)
  return data
}

export async function fetchAdminUsers() {
  const { data } = await httpClient.get(ENDPOINTS.admin.users)
  return data
}

export async function fetchAdminUserSave(userId) {
  const { data } = await httpClient.get(ENDPOINTS.admin.userSave(userId))
  return data
}

export async function fetchAdminBugReports(status = 'ALL') {
  const params = status && status !== 'ALL' ? { status } : {}
  const { data } = await httpClient.get(ENDPOINTS.admin.bugs, { params })
  return data
}

export async function updateAdminBugStatus(reportId, status) {
  const { data } = await httpClient.patch(ENDPOINTS.admin.bugStatus(reportId), { status })
  return data
}

export async function fetchAdminEvidence() {
  const { data } = await httpClient.get(ENDPOINTS.admin.evidence)
  return data
}

export async function createAdminEvidence(payload) {
  const { data } = await httpClient.post(ENDPOINTS.admin.evidence, payload)
  return data
}

export async function updateAdminEvidence(id, payload) {
  const { data } = await httpClient.put(ENDPOINTS.admin.evidenceItem(id), payload)
  return data
}

export async function deleteAdminEvidence(id) {
  const { data } = await httpClient.delete(ENDPOINTS.admin.evidenceItem(id))
  return data
}

export async function seedAdminChapter1Evidence() {
  const { data } = await httpClient.post(ENDPOINTS.admin.seedChapter1Evidence)
  return data
}
