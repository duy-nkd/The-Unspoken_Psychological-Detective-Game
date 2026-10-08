import { AUTOSAVE } from '../constants/gameplay'

/**
 * Lịch auto save — Project.docx §5.2: mỗi 5 phút HOẶC khi có sự kiện quan trọng.
 * Không phụ thuộc Phaser; `timers` được tiêm vào để unit test không phải chờ 5 phút.
 *
 *   const autosave = createAutosaveScheduler({ onSave: (reason) => ... })
 *   autosave.start()                       // bắt đầu đếm 5 phút
 *   autosave.trigger('evidence-collected') // lưu ngay vì sự kiện quan trọng
 *   autosave.stop()
 */
export function createAutosaveScheduler({
  onSave,
  intervalMs = AUTOSAVE.INTERVAL_MS,
  timers = globalThis,
}) {
  if (typeof onSave !== 'function') throw new TypeError('createAutosaveScheduler cần onSave')
  let handle = null

  return {
    start() {
      if (handle !== null) return // gọi start 2 lần không tạo 2 interval
      handle = timers.setInterval(() => onSave(AUTOSAVE.REASONS.INTERVAL), intervalMs)
    },
    stop() {
      if (handle === null) return
      timers.clearInterval(handle)
      handle = null
    },
    trigger(reason) {
      onSave(reason)
    },
    get isRunning() {
      return handle !== null
    },
  }
}
