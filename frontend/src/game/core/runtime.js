import { GAME_EVENTS } from '../constants/gameEvents'
import { AUTOSAVE } from '../constants/gameplay'
import { createStoryRunner } from '../narrative/storyRunner'
import { createAutosaveScheduler } from '../systems/autosave'
import { translate } from '../systems/i18n'
import { EventBus } from './EventBus'
import { GameSession } from './GameSession'
import { createSettingsStore } from './settingsStore'

const REGISTRY_KEY = 'runtime'

/**
 * Runtime = các dịch vụ dùng chung cho mọi scene (session + autosave + thiết lập + ngôn ngữ).
 * Lưu trong game.registry; scene lấy qua getRuntime(this) — không dùng biến global.
 */
export function createRuntime() {
  let session = new GameSession()
  let runner = null
  let started = false
  // React báo qua SAVE_AVAILABILITY (useGameBridge); mặc định false tới khi nhận được tin
  let saveAvailable = false

  const settings = createSettingsStore({
    onChange: (next) => EventBus.emit(GAME_EVENTS.SETTINGS_CHANGED, next),
  })
  const onSaveAvailability = ({ hasSave } = {}) => {
    saveAvailable = Boolean(hasSave)
  }
  EventBus.on(GAME_EVENTS.SAVE_AVAILABILITY, onSaveAvailability)

  /** @returns {boolean} true nếu đã gửi yêu cầu lưu (false khi chưa vào ván chơi). */
  const requestSave = (reason) => {
    if (!started) return false // chưa vào ván chơi (đang ở MainMenu) -> không lưu
    EventBus.emit(GAME_EVENTS.SAVE_REQUESTED, { reason, snapshot: session.toSaveSnapshot() })
    return true
  }

  const autosave = createAutosaveScheduler({ onSave: requestSave })

  return {
    get session() {
      return session
    },
    get story() {
      return runner
    },
    /** Kho thiết lập người chơi (core/settingsStore.js): settings.get() / settings.set(next). */
    settings,
    /** Trình duyệt có bản lưu không (để mờ "Tiếp tục điều tra", hỏi trước khi ghi đè). */
    get saveAvailable() {
      return saveAvailable
    },
    /** Chuỗi giao diện theo ngôn ngữ đang chọn: runtime.t('menu.newGame'). */
    t(key, params) {
      return translate(settings.get().language, key, params)
    },
    startNewGame(initialState) {
      this.startSession(new GameSession(), initialState)
    },
    startSession(nextSession, initialState) {
      session = nextSession
      runner = null
      if (!session.story && initialState) session.setStory(initialState)
      started = true
      autosave.start()
    },
    startStory(graph) {
      if (runner) return runner
      runner = createStoryRunner(graph, session.story, {
        onChange(state, previous) {
          session.setStory(state)
          if (state.credibility !== previous.credibility) {
            EventBus.emit(GAME_EVENTS.CREDIBILITY_CHANGED, {
              value: state.credibility,
              depleted: state.credibility <= 0,
            })
          }
          if (state.evidence_collected.length > previous.evidence_collected.length) {
            autosave.trigger(AUTOSAVE.REASONS.EVIDENCE_COLLECTED)
          }
          if (
            state.current_phase !== previous.current_phase ||
            Object.keys(state.checkpoints).length !== Object.keys(previous.checkpoints).length
          ) {
            autosave.trigger(AUTOSAVE.REASONS.STORY_PROGRESS)
          }
        },
      })
      session.setStory(runner.state)
      return runner
    },
    /** §5.2: lưu thủ công bất kỳ lúc nào — nút "Lưu tiến trình" trong Sổ tay (DEC-013 Q-R6). */
    saveNow() {
      return requestSave(AUTOSAVE.REASONS.MANUAL)
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
      EventBus.off(GAME_EVENTS.SAVE_AVAILABILITY, onSaveAvailability)
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
