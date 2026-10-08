import { createLogger } from '@/shared/logger/logger'
import { storage } from '@/shared/storage/storage'
import { STORAGE_KEYS } from '@/shared/storage/storageKeys'
import { saveGameProgress } from '../api/gameApi'

const log = createLogger('SaveService')

/**
 * Hybrid Storage — Project.docx §6.3:
 * 1. LUÔN sao lưu bản mới nhất vào localStorage (không phụ thuộc mạng).
 * 2. Đồng bộ lên MySQL qua POST /api/game/save.
 * 3. Mất mạng / server lỗi kết nối -> trả { remote: false, reason: 'offline' }, KHÔNG ném lỗi
 *    (game không được crash, §6.3).
 * PENDING(ISS-18): đồng bộ ngược khi có mạng lại & giải quyết xung đột.
 * PENDING(ISS-29): login không trả userId -> chưa gọi được API save.
 *
 * @param {{ currentChapter: number, credibilityScore: number, saveDataJson: string }} snapshot
 * @param {{ userId?: number|null, reason?: string }} context
 */
export async function persistProgress(snapshot, { userId = null, reason = 'unknown' } = {}) {
  storage.set(STORAGE_KEYS.LOCAL_SAVE_BACKUP, {
    ...snapshot,
    reason,
    savedAt: new Date().toISOString(),
  })

  if (userId === null || userId === undefined) {
    log.warn('Chưa có userId (ISS-29) -> chỉ lưu localStorage')
    return { remote: false, reason: 'missing-user-id' }
  }

  try {
    const data = await saveGameProgress({ userId, ...snapshot })
    log.debug('Đã lưu lên server', reason, data)
    return { remote: true, data }
  } catch (error) {
    if (error.isNetworkError) {
      log.warn('Mất kết nối -> chế độ offline, giữ bản localStorage')
      return { remote: false, reason: 'offline' }
    }
    throw error
  }
}

export function readLocalBackup() {
  return storage.get(STORAGE_KEYS.LOCAL_SAVE_BACKUP)
}
