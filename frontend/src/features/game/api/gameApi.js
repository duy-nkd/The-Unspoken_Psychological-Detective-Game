import { httpClient } from '@/shared/api/httpClient'
import { ENDPOINTS } from '@/shared/api/endpoints'

/**
 * POST /api/game/save — Project.docx §4.3
 * payload: { userId, currentChapter, credibilityScore, saveDataJson }
 * @returns {Promise<{ message: string, updatedAt: string }>}
 */
export const saveGameProgress = async ({
  userId,
  currentChapter,
  credibilityScore,
  saveDataJson,
}) => {
  const { data } = await httpClient.post(ENDPOINTS.game.save, {
    userId,
    currentChapter,
    credibilityScore,
    saveDataJson,
  })
  return data
}

/**
 * GET /api/game/load/{userId} — Project.docx §4.3
 * PENDING(ISS-14): tên trường response (chapter, credibility, save_data_json) chưa chốt.
 */
export const loadGameProgress = async (userId) => {
  const { data } = await httpClient.get(ENDPOINTS.game.load(userId))
  return data
}
