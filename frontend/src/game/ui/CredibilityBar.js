import Phaser from 'phaser'
import { CREDIBILITY } from '../constants/gameplay'
import { COLORS, DEPTH, TEXT_STYLES } from './theme'

const WIDTH = 240
const HEIGHT = 14

/** HUD Thanh Uy Tín (Project.docx §3.3). Gọi setValue() khi credibility đổi. */
export class CredibilityBar extends Phaser.GameObjects.Container {
  constructor(scene, x, y, value) {
    super(scene, x, y)
    this.setDepth(DEPTH.HUD)
    this.label = scene.add.text(0, 0, '', TEXT_STYLES.small)
    this.track = scene.add.rectangle(0, 24, WIDTH, HEIGHT, COLORS.panel).setOrigin(0)
    this.fill = scene.add.rectangle(0, 24, WIDTH, HEIGHT, COLORS.accent).setOrigin(0)
    this.add([this.label, this.track, this.fill])
    scene.add.existing(this)
    this.setValue(value)
  }

  setValue(value) {
    const ratio = Phaser.Math.Clamp(value / CREDIBILITY.START, 0, 1)
    this.fill.width = WIDTH * ratio
    this.fill.setFillStyle(ratio <= 0.3 ? COLORS.danger : COLORS.accent)
    this.label.setText(`Uy tín: ${value}`)
  }
}
