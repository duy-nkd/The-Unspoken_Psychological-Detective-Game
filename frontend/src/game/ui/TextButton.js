import Phaser from 'phaser'
import { COLORS, TEXT_STYLES } from './theme'

/** Nút chữ có hover + con trỏ bàn tay. Dùng: new TextButton(scene, x, y, 'New Game', onClick) */
export class TextButton extends Phaser.GameObjects.Text {
  constructor(scene, x, y, label, onClick, style = TEXT_STYLES.button) {
    super(scene, x, y, label, style)
    this.setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.setColor(COLORS.accentHex))
      .on('pointerout', () => this.setColor(style.color ?? COLORS.textHex))
      .on('pointerup', () => onClick?.())
    scene.add.existing(this)
  }
}
