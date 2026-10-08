import { GAME_EVENTS } from '../constants/gameEvents'
import { AUTOSAVE } from '../constants/gameplay'
import { createAutosaveScheduler } from '../systems/autosave'
import { EventBus } from './EventBus'
import { GameSession } from './GameSession'

const REGISTRY_KEY = 'runtime'

/**
 * Runtime = các dịch vụ dùng chung cho mọi scene (session + autosave).
 * Lưu trong game.registry; scene lấy qua getRuntime(this) — không dùng biến global.
 */
export function createRuntime() {
  let session = new GameSession()
  let started = false

  const requestSave = (reason) => {
    if (!started) return // chưa vào ván chơi (đang ở MainMenu) -> không lưu
    EventBus.emit(GAME_EVENTS.SAVE_REQUESTED, { reason, snapshot: session.toSaveSnapshot() })
  }

  const autosave = createAutosaveScheduler({ onSave: requestSave })

  return {
    get session() {
      return session
    },
    startNewGame() {
      session = new GameSession()
      started = true
      autosave.start()
    },
    /** §5.2: lưu thủ công bất kỳ lúc nào. */
    saveNow() {
      requestSave(AUTOSAVE.REASONS.MANUAL)
    },
    /** §5.2: sự kiện quan trọng (tìm được bằng chứng) -> lưu ngay. */
    collectEvidence(entry) {
      const added = session.addNotebookEntry('evidence', entry)
      if (added) {
        EventBus.emit(GAME_EVENTS.NOTEBOOK_ENTRY_ADDED, { tab: 'evidence', entry })
        autosave.trigger(AUTOSAVE.REASONS.EVIDENCE_COLLECTED)
      }
      return added
    },
    /** §3.3: trừ uy tín, phát sự kiện để HUD cập nhật. */
    penalize(penalty) {
      const result = session.penalize(penalty)
      EventBus.emit(GAME_EVENTS.CREDIBILITY_CHANGED, result)
      return result
    },
    destroy() {
      autosave.stop()
      started = false
    },
  }
}

export function registerRuntime(game, runtime) {
  game.registry.set(REGISTRY_KEY, runtime)
}

/** @param {Phaser.Scene} scene */
export function getRuntime(scene) {
  const runtime = scene.registry.get(REGISTRY_KEY)
  if (!runtime) throw new Error('Runtime chưa được đăng ký — kiểm tra game/index.js')
  return runtime
}
