import Phaser from 'phaser'
import { GAME_EVENTS } from '../constants/gameEvents'
import { FIRST_CHAPTER } from '../constants/gameplay'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { EventBus } from '../core/EventBus'
import { GameSession } from '../core/GameSession'
import { getRuntime } from '../core/runtime'
import { CHAPTER_DATA } from '../data/chapters'
import { FIRST_ROOM_ID } from '../data/rooms'
import { ensureValidSelection, stepSelection } from '../systems/menuNavigation'
import { ConfirmDialog } from '../ui/ConfirmDialog'
import { IconButton } from '../ui/IconButton'
import { MenuBackdrop } from '../ui/MenuBackdrop'
import { MENU_ITEM, MenuItem } from '../ui/MenuItem'
import { COLORS, DEPTH, menuTextStyle } from '../ui/theme'

/** Bố cục theo bản thiết kế đã chốt (DEC-012), khung logic 1280×720. */
const LAYOUT = Object.freeze({
  COLUMN_X: 96,
  KICKER_Y: 142,
  TITLE_Y: 172,
  TITLE_LINE: 73,
  SUBTITLE_Y: 346,
  RULE_Y: 394,
  ITEMS_Y: 420,
  ITEM_GAP: 2,
  FOOTER_BOTTOM: 36,
  MUTE_INSET: 54, // tâm nút loa cách mép trên/phải
})

/**
 * Sảnh chờ — Project.docx §3.2: New Game, Load Game (từ CSDL), bảng điều khiển âm thanh.
 * Thiết kế: DEC-012 — "Ván mới / Tiếp tục điều tra / Cài đặt" + nút loa; chuột hoặc ↑ ↓ Enter.
 * - Ván mới: nếu trình duyệt đã có bản lưu -> hộp xác nhận trước khi bắt đầu.
 * - Tiếp tục điều tra = Load Game: mờ khi chưa có bản lưu (React báo qua SAVE_AVAILABILITY).
 *   PENDING(ISS-05, ISS-29): chỉ phát LOAD_REQUESTED; React xử lý khi API load khả dụng.
 * - Cài đặt: mở SettingsScene chồng lên (menu tạm dừng tới khi đóng).
 * - Âm lượng/tắt tiếng chi tiết nằm trong Cài đặt; nút loa = tắt/bật nhanh (lưu vào thiết lập).
 */
export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.MAIN_MENU)
  }

  create() {
    const { width, height } = this.scale
    this.runtime = getRuntime(this)
    const t = (key, params) => this.runtime.t(key, params)
    this.dialog = null

    this.backdrop = new MenuBackdrop(this, { note: t('menu.backdropNote') })
    this.drawTitleBlock(t)

    const items = [
      { key: 'menu.newGame', onSelect: () => this.onNewGame() },
      { key: 'menu.continue', onSelect: () => EventBus.emit(GAME_EVENTS.LOAD_REQUESTED) },
      { key: 'menu.settings', onSelect: () => this.openSettings() },
    ]
    this.items = items.map(
      (item, index) =>
        new MenuItem(this, {
          x: LAYOUT.COLUMN_X,
          y: LAYOUT.ITEMS_Y + index * (MENU_ITEM.HEIGHT + LAYOUT.ITEM_GAP),
          number: String(index + 1).padStart(2, '0'),
          label: t(item.key),
          note: item.key === 'menu.continue' ? t('menu.noSave') : '',
          onHover: () => this.select(index),
          onSelect: item.onSelect,
        }),
    )
    this.selectedIndex = 0
    this.refreshAvailability()

    this.muteButton = new IconButton(this, {
      x: width - LAYOUT.MUTE_INSET,
      y: LAYOUT.MUTE_INSET,
      icon: 'speaker',
      onClick: () => this.toggleMute(),
    }).setDepth(DEPTH.HUD)
    this.refreshMuteIcon()

    const footerY = height - LAYOUT.FOOTER_BOTTOM
    this.add
      .text(LAYOUT.COLUMN_X, footerY, t('menu.chapter'), menuTextStyle({ size: 14 }))
      .setColor(COLORS.mutedHex)
      .setOrigin(0, 1)
      .setDepth(DEPTH.HUD)
    this.add
      .text(width - 40, footerY, t('menu.keys'), menuTextStyle({ font: 'mono', size: 12 }))
      .setColor(COLORS.mutedHex)
      .setOrigin(1, 1)
      .setDepth(DEPTH.HUD)

    this.bindKeys()

    // React báo có/không bản lưu (vd vừa lưu xong) trong lúc menu đang mở
    const onAvailability = () => this.refreshAvailability()
    EventBus.on(GAME_EVENTS.SAVE_AVAILABILITY, onAvailability)
    const onLoad = (snapshot) => this.startSavedGame(snapshot)
    EventBus.on(GAME_EVENTS.LOAD_RESULT, onLoad)
    // Cài đặt đóng bằng nút Lưu -> vẽ lại menu theo ngôn ngữ / trạng thái tiếng mới
    const onSettingsChanged = () => this.scene.restart()
    EventBus.on(GAME_EVENTS.SETTINGS_CHANGED, onSettingsChanged)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      EventBus.off(GAME_EVENTS.SAVE_AVAILABILITY, onAvailability)
      EventBus.off(GAME_EVENTS.LOAD_RESULT, onLoad)
      EventBus.off(GAME_EVENTS.SETTINGS_CHANGED, onSettingsChanged)
    })
  }

  update(time, delta) {
    this.backdrop.update(time, delta)
  }

  drawTitleBlock(t) {
    const x = LAYOUT.COLUMN_X
    this.add
      .text(x, LAYOUT.KICKER_Y, t('menu.kicker'), menuTextStyle({ font: 'mono', size: 13 }))
      .setColor(COLORS.mutedHex)
      .setLetterSpacing(2.6)
      .setDepth(DEPTH.HUD)
    const titleStyle = menuTextStyle({ font: 'display', size: 74, weight: 700, letterSpacing: 1.5 })
    // Tên game giữ nguyên ở mọi ngôn ngữ
    this.add.text(x - 3, LAYOUT.TITLE_Y, 'THE', titleStyle).setDepth(DEPTH.HUD)
    this.add
      .text(x - 3, LAYOUT.TITLE_Y + LAYOUT.TITLE_LINE, 'UNSPOKEN', titleStyle)
      .setDepth(DEPTH.HUD)
    this.add
      .text(x, LAYOUT.SUBTITLE_Y, t('menu.subtitle'), menuTextStyle({ size: 13, letterSpacing: 4 }))
      .setColor(COLORS.mutedHex)
      .setDepth(DEPTH.HUD)
    this.add.rectangle(x, LAYOUT.RULE_Y, 56, 2, COLORS.accent).setOrigin(0).setDepth(DEPTH.HUD)
  }

  bindKeys() {
    const keyboard = this.input.keyboard
    if (!keyboard) return
    const ifIdle = (handler) => () => {
      if (!this.dialog) handler()
    }
    keyboard.on(
      'keydown-UP',
      ifIdle(() => this.move(-1)),
    )
    keyboard.on(
      'keydown-DOWN',
      ifIdle(() => this.move(1)),
    )
    keyboard.on(
      'keydown-ENTER',
      ifIdle(() => this.items[this.selectedIndex]?.activate()),
    )
    keyboard.on(
      'keydown-SPACE',
      ifIdle(() => this.items[this.selectedIndex]?.activate()),
    )
  }

  enabledStates() {
    return this.items.map((item) => item.enabled)
  }

  move(direction) {
    const next = stepSelection(this.enabledStates(), this.selectedIndex, direction)
    if (next >= 0) this.select(next)
  }

  select(index) {
    this.selectedIndex = index
    this.items.forEach((item, i) => item.setSelected(i === index))
  }

  refreshAvailability() {
    const continueItem = this.items[1]
    continueItem.setEnabled(this.runtime.saveAvailable)
    this.select(ensureValidSelection(this.enabledStates(), this.selectedIndex))
  }

  onNewGame() {
    if (!this.runtime.saveAvailable) {
      this.startNewGame()
      return
    }
    const t = (key) => this.runtime.t(key)
    this.dialog = new ConfirmDialog(this, {
      title: t('confirm.newGame.title'),
      body: t('confirm.newGame.body'),
      confirmLabel: t('confirm.newGame.ok'),
      cancelLabel: t('confirm.cancel'),
      onConfirm: () => {
        this.dialog = null
        this.startNewGame()
      },
      onCancel: () => {
        this.dialog = null
      },
    })
  }

  openSettings() {
    this.scene.launch(SCENE_KEYS.SETTINGS, { returnTo: this.scene.key })
    this.scene.pause()
  }

  toggleMute() {
    const { settings } = this.runtime
    const current = settings.get()
    // set() phát SETTINGS_CHANGED -> menu tự vẽ lại; game/index.js áp dụng vào SoundManager
    settings.set({ ...current, muteAll: !current.muteAll })
  }

  refreshMuteIcon() {
    this.muteButton.setIcon(this.runtime.settings.get().muteAll ? 'speakerMuted' : 'speaker')
  }

  /**
   * Ván mới -> [Intro: người dùng bổ sung sau] -> phòng 201 có tutorial (DEC-013).
   * PENDING: chèn cảnh intro trước phòng 201 khi có nội dung.
   */
  startNewGame() {
    this.runtime.startNewGame(this.initialStoryState())
    this.scene.start(SCENE_KEYS.ROOM_INVESTIGATION, {
      chapter: FIRST_CHAPTER,
      roomId: FIRST_ROOM_ID,
    })
  }

  initialStoryState() {
    const key = CHAPTER_DATA[FIRST_CHAPTER].files.state.key
    return this.cache.json.get(key).initialState
  }

  startSavedGame(snapshot) {
    let session
    try {
      session = GameSession.fromSaveSnapshot(snapshot)
    } catch {
      this.dialog = new ConfirmDialog(this, {
        title: this.runtime.t('story.loadError'),
        body: this.runtime.t('story.loadErrorBody'),
        confirmLabel: this.runtime.t('story.back'),
        cancelLabel: this.runtime.t('confirm.cancel'),
        onConfirm: () => {
          this.dialog = null
        },
        onCancel: () => {
          this.dialog = null
        },
      })
      return
    }
    this.runtime.startSession(session, this.initialStoryState())
    if (session.tutorial.status === 'active') {
      this.scene.start(SCENE_KEYS.ROOM_INVESTIGATION, {
        chapter: FIRST_CHAPTER,
        roomId: FIRST_ROOM_ID,
      })
    } else {
      this.scene.start(SCENE_KEYS.STORY, {})
    }
  }
}
