import Phaser from 'phaser'
import { createLogger } from '@/shared/logger/logger'
import { FIRST_CHAPTER } from '../constants/gameplay'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { dialogueCacheKey, dialogueUrl } from '../data/dialogueData'
import { TEXT_STYLES } from '../ui/theme'

const log = createLogger('PreloadScene')

/**
 * Nạp asset bất đồng bộ (Project.docx §3.2: JSON hội thoại trong public/assets/dialogues/).
 * Thêm asset mới: khai báo trong preload() — scene khác chỉ dùng key đã nạp.
 */
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.PRELOAD)
  }

  preload() {
    const { width, height } = this.scale
    const progress = this.add.text(width / 2, height / 2, 'Đang tải… 0%', TEXT_STYLES.body)
    progress.setOrigin(0.5)

    this.load.on('progress', (value) => progress.setText(`Đang tải… ${Math.round(value * 100)}%`))
    this.load.on('loaderror', (file) =>
      log.error(`Không tải được asset: ${file.key} (${file.url})`),
    )

    this.load.json(dialogueCacheKey(FIRST_CHAPTER), dialogueUrl(FIRST_CHAPTER))
  }

  create() {
    this.scene.start(SCENE_KEYS.MAIN_MENU)
  }
}
