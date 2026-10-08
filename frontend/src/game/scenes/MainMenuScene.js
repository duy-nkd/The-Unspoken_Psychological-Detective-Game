import Phaser from 'phaser'
import { GAME_EVENTS } from '../constants/gameEvents'
import { FIRST_CHAPTER } from '../constants/gameplay'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { EventBus } from '../core/EventBus'
import { getRuntime } from '../core/runtime'
import { TextButton } from '../ui/TextButton'
import { TEXT_STYLES } from '../ui/theme'

/**
 * Sảnh chờ — Project.docx §3.2: New Game, Load Game (từ CSDL), bảng điều khiển âm thanh.
 * PENDING(ISS-05, ISS-29): Load Game chỉ phát sự kiện; React xử lý khi API load khả dụng.
 */
export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.MAIN_MENU)
  }

  create() {
    const { width, height } = this.scale
    const centerX = width / 2

    this.add.text(centerX, height * 0.28, 'The Unspoken', TEXT_STYLES.title).setOrigin(0.5)

    new TextButton(this, centerX, height * 0.5, 'New Game', () => this.startNewGame())
    new TextButton(this, centerX, height * 0.6, 'Load Game', () =>
      EventBus.emit(GAME_EVENTS.LOAD_REQUESTED),
    )
    const soundButton = new TextButton(this, centerX, height * 0.7, '', () => {
      this.sound.mute = !this.sound.mute
      soundButton.setText(this.soundLabel())
    })
    soundButton.setText(this.soundLabel())
  }

  soundLabel() {
    return `Âm thanh: ${this.sound.mute ? 'Tắt' : 'Bật'}`
  }

  startNewGame() {
    getRuntime(this).startNewGame()
    this.scene.start(SCENE_KEYS.DIALOGUE, { chapter: FIRST_CHAPTER })
  }
}
