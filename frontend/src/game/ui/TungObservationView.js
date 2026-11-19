import Phaser from 'phaser'
import { ROOM_204_NECK_PHOTO } from '../data/rooms/room204'
import { dialogueFontSizePx } from '../systems/settings'
import { prefersReducedMotion } from './MenuBackdrop'
import { PanelButton } from './PanelButton'
import { COLORS, DEPTH, menuTextStyle } from './theme'

/** Preview tạm của P1: ảnh cover cắt đúng khung, mô tả nằm hoàn toàn dưới ảnh. */
export class TungObservationView extends Phaser.GameObjects.Container {
  constructor(scene, { runtime, text, playImpact, onContinue }) {
    super(scene, 0, 0)
    const { width, height } = scene.scale
    const photoHeight = Math.round((height * 2) / 3)
    this.viewport = { x: 0, y: 0, width, height: photoHeight }
    this.finished = false
    this.onContinue = onContinue
    this.impactTween = null
    this.setDepth(DEPTH.OVERLAY)

    const background = scene.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0)
    // __BASE bắt buộc: frame mặc định của key này có thể là crop cổ dùng riêng cho P2.
    this.photo = scene.add.image(width / 2, 0, ROOM_204_NECK_PHOTO.key, '__BASE').setOrigin(0.5, 0)
    this.photo.setScale(Math.max(width / this.photo.width, photoHeight / this.photo.height))
    // Crop texture hỗ trợ cả WebGL/Canvas của Phaser4; GeometryMask chỉ hỗ trợ Canvas.
    this.photoCrop = {
      x: 0,
      y: 0,
      width: this.photo.width,
      height: photoHeight / this.photo.scaleY,
    }
    this.photo.setCrop(this.photoCrop)

    this.panel = scene.add
      .rectangle(0, photoHeight, width, height - photoHeight, COLORS.background)
      .setOrigin(0)
    const divider = scene.add.rectangle(0, photoHeight, width, 1, COLORS.panelBorder).setOrigin(0)
    this.heading = scene.add.text(
      32,
      photoHeight + 22,
      runtime.t('story.observeTung'),
      menuTextStyle({ size: 23, weight: 600, color: COLORS.accentHex }),
    )
    this.body = scene.add.text(
      32,
      this.heading.y + this.heading.height + 12,
      text,
      menuTextStyle({ size: dialogueFontSizePx(runtime.settings.get()), wrapWidth: width - 64 }),
    )
    this.body.setLineSpacing(4)
    this.continueButton = new PanelButton(scene, {
      label: `${runtime.t('story.continue')} [Enter]`,
      variant: 'primary',
      onClick: () => this.finish(),
    })
    this.continueButton.setPosition(width - 32 - this.continueButton.width, height - 60)
    // TẠM: giảm chữ vừa vùng mô tả khi cỡ Large hoặc bản text Admin dài hơn.
    let fontSize = dialogueFontSizePx(runtime.settings.get())
    while (this.body.getBounds().bottom > this.continueButton.y - 12 && fontSize > 18) {
      this.body.setFontSize(--fontSize)
    }
    this.add([
      background,
      this.photo,
      this.panel,
      divider,
      this.heading,
      this.body,
      this.continueButton,
    ])
    this.setSize(width, height)
    scene.add.existing(this)

    // TẠM: một nhịp giật ngắn trên ảnh; chữ đứng yên, không rung camera/phát sáng nhấp nháy.
    if (playImpact && !prefersReducedMotion()) {
      this.impactTween = scene.tweens.addCounter({
        from: 0,
        to: 1,
        duration: 350,
        onUpdate: (tween) => {
          const progress = tween.getValue()
          this.photo.x = width / 2 + Math.sin(progress * Math.PI * 14) * 9 * (1 - progress)
        },
        onComplete: () => this.photo.setX(width / 2),
      })
    }
  }

  finish() {
    if (this.finished) return
    this.finished = true
    this.onContinue()
  }

  destroy(fromScene) {
    this.impactTween?.remove()
    this.impactTween = null
    super.destroy(fromScene)
  }
}
