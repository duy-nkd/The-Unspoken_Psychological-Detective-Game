import { useEffect, useState } from 'react'
import { GAME_EVENTS } from '@/game/constants/gameEvents'
import { EventBus } from '@/game/core/EventBus'
import { createLogger } from '@/shared/logger/logger'
import { persistProgress } from '../services/saveService'

const log = createLogger('GameBridge')

/**
 * Lắng nghe sự kiện từ Phaser và xử lý phía React (gọi API, localStorage).
 * Trả về thông báo trạng thái gần nhất để hiển thị trên trang.
 * @param {{ userId?: number|null }} options
 */
export function useGameBridge({ userId = null } = {}) {
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    const onSaveRequested = async ({ reason, snapshot }) => {
      try {
        const result = await persistProgress(snapshot, { userId, reason })
        setStatusMessage(
          result.remote
            ? 'Đã lưu tiến trình lên máy chủ.'
            : 'Đã lưu tạm trên trình duyệt (offline).',
        )
      } catch (error) {
        log.error('Lưu thất bại', error)
        setStatusMessage(`Lưu thất bại: ${error.message}`)
      }
    }
    // PENDING(ISS-05, ISS-29): luồng Load Game / tải checkpoint chưa đủ đặc tả
    const onLoadRequested = () => setStatusMessage('Load Game: chờ đặc tả API (ISS-05, ISS-29).')
    const onCheckpointReload = () =>
      setStatusMessage('Tải checkpoint: chờ định nghĩa checkpoint (ISS-05).')

    EventBus.on(GAME_EVENTS.SAVE_REQUESTED, onSaveRequested)
    EventBus.on(GAME_EVENTS.LOAD_REQUESTED, onLoadRequested)
    EventBus.on(GAME_EVENTS.CHECKPOINT_RELOAD_REQUESTED, onCheckpointReload)
    return () => {
      EventBus.off(GAME_EVENTS.SAVE_REQUESTED, onSaveRequested)
      EventBus.off(GAME_EVENTS.LOAD_REQUESTED, onLoadRequested)
      EventBus.off(GAME_EVENTS.CHECKPOINT_RELOAD_REQUESTED, onCheckpointReload)
    }
  }, [userId])

  return { statusMessage }
}
