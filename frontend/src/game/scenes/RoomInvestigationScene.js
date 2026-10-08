import Phaser from 'phaser'
import { GAME_EVENTS } from '../constants/gameEvents'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { EventBus } from '../core/EventBus'
import { getRuntime } from '../core/runtime'
import { CredibilityBar } from '../ui/CredibilityBar'
import { COLORS, DEPTH, TEXT_STYLES } from '../ui/theme'

/**
 * Màn điều tra 2.5D Point-and-Click — Project.docx §3.2.
 * Lớp: Background (phối cảnh) -> Hotspots (ui/Hotspot.js) -> HUD.
 * Phím N: mở Sổ tay. Phím S: lưu thủ công (§5.2).
 * PENDING(ISS-06, ISS-27): background + danh sách hotspot từng phòng chưa có dữ liệu/asset.
 * PENDING (Capstone 3): Flashback Hiện tại/Quá khứ tại Chương 5 sẽ gắn vào scene này.
 */
export class RoomInvestigationScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.ROOM_INVESTIGATION)
  }

  init(data) {
    this.chapter = data.chapter
  }

  create() {
    const { width, height } = this.scale
    const runtime = getRuntime(this)

    // Background placeholder cho tới khi có asset (ISS-27)
    this.add.rectangle(0, 0, width, height, COLORS.panel).setOrigin(0).setDepth(DEPTH.BACKGROUND)
    this.add
      .text(
        width / 2,
        height / 2,
        `Chương ${this.chapter} — chờ dữ liệu hiện trường`,
        TEXT_STYLES.heading,
      )
      .setOrigin(0.5)
      .setDepth(DEPTH.BACKGROUND)

    // HUD
    const credibilityBar = new CredibilityBar(this, 24, 20, runtime.session.credibility)
    this.add
      .text(width - 24, 20, 'N: Sổ tay   S: Lưu', TEXT_STYLES.small)
      .setOrigin(1, 0)
      .setDepth(DEPTH.HUD)

    const onCredibilityChanged = ({ value }) => credibilityBar.setValue(value)
    EventBus.on(GAME_EVENTS.CREDIBILITY_CHANGED, onCredibilityChanged)
    // Gỡ listener khi rời scene -> tránh rò rỉ và gọi vào object đã hủy
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () =>
      EventBus.off(GAME_EVENTS.CREDIBILITY_CHANGED, onCredibilityChanged),
    )

    this.input.keyboard?.on('keydown-N', () => this.openNotebook())
    this.input.keyboard?.on('keydown-S', () => runtime.saveNow())
  }

  openNotebook() {
    this.scene.launch(SCENE_KEYS.NOTEBOOK, { returnTo: this.scene.key })
    this.scene.pause()
  }
}
