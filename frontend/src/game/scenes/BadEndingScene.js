import Phaser from 'phaser'
import { GAME_EVENTS } from '../constants/gameEvents'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { EventBus } from '../core/EventBus'
import { TextButton } from '../ui/TextButton'
import { COLORS, TEXT_STYLES } from '../ui/theme'

/**
 * Project.docx §3.3: credibility = 0 -> màn Bad Ending ngắn + tùy chọn tải lại checkpoint gần nhất.
 * PENDING(ISS-05, ISS-15, ISS-29): định nghĩa checkpoint và nội dung Bad Ending.
 */
export class BadEndingScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.BAD_ENDING)
  }

  create() {
    const { width, height } = this.scale
    this.cameras.main.setBackgroundColor(COLORS.background)
    this.add
      .text(width / 2, height * 0.35, 'Bad Ending', { ...TEXT_STYLES.title, color: '#d9534f' })
      .setOrigin(0.5)

    new TextButton(this, width / 2, height * 0.6, 'Tải lại checkpoint gần nhất', () => {
      EventBus.emit(GAME_EVENTS.CHECKPOINT_RELOAD_REQUESTED)
      this.scene.start(SCENE_KEYS.MAIN_MENU)
    })
  }
}
