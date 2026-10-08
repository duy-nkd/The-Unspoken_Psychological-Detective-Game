import Phaser from 'phaser'
import { env } from '@/config/env'
import { COLORS, DEPTH } from './theme'

/**
 * Điểm nóng Point-and-Click (Project.docx §3.2 — RoomInvestigationScene).
 * Vùng vô hình có thể bấm; khi env.debug = true sẽ vẽ viền để căn vị trí.
 *
 *   new Hotspot(scene, { id, x, y, width, height }, () => runtime.collectEvidence(...))
 * PENDING(ISS-06/ISS-27): dữ liệu hotspot từng phòng chưa có.
 */
export class Hotspot extends Phaser.GameObjects.Zone {
  constructor(scene, { id, x, y, width, height }, onActivate) {
    super(scene, x, y, width, height)
    this.hotspotId = id
    this.setOrigin(0).setDepth(DEPTH.HOTSPOT).setInteractive({ useHandCursor: true })
    this.on('pointerup', () => onActivate?.(this))
    scene.add.existing(this)

    if (env.debug) {
      scene.add
        .rectangle(x, y, width, height)
        .setOrigin(0)
        .setStrokeStyle(1, COLORS.accent)
        .setDepth(DEPTH.DEBUG)
    }
  }
}
