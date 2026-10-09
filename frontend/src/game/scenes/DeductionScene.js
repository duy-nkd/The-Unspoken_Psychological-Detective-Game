import Phaser from 'phaser'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { TEXT_STYLES } from '../ui/theme'

/**
 * Màn suy luận & Bàn ráp chứng cứ vật lý — Project.docx §3.2:
 * kéo thả, phóng to, xoay, so khớp nét khuyên tròn chữ ký Chủ tịch Khang với mảnh chữ ký cháy xém.
 * PENDING(ISS-16): phạm vi Deduction ở Chương 1 (mốc Tuần 6) chưa được định nghĩa.
 * data: { returnTo?: string }
 */
export class DeductionScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.DEDUCTION)
  }

  init(data) {
    this.returnTo = data.returnTo ?? SCENE_KEYS.MAIN_MENU
  }

  create() {
    const { width, height } = this.scale
    this.add
      .text(width / 2, height / 2, 'DeductionScene — chờ đặc tả (ISS-16)\nEsc: quay lại', {
        ...TEXT_STYLES.heading,
        align: 'center',
      })
      .setOrigin(0.5)
    this.input.keyboard?.on('keydown-ESC', () => this.scene.start(this.returnTo))
  }
}
