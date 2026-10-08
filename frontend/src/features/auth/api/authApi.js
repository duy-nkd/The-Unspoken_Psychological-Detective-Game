import { httpClient } from '@/shared/api/httpClient'
import { ENDPOINTS } from '@/shared/api/endpoints'

/** POST /api/auth/register — payload { username, email, password } (Project.docx §4.3) */
export const registerAccount = ({ username, email, password }) =>
  httpClient.post(ENDPOINTS.auth.register, { username, email, password })

/**
 * POST /api/auth/login — payload { username, password } (Project.docx §4.3)
 * @returns {Promise<{ token: string, type: string, username: string, role: string }>}
 */
export const loginAccount = async ({ username, password }) => {
  const { data } = await httpClient.post(ENDPOINTS.auth.login, { username, password })
  return data
}
