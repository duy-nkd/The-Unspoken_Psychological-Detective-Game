import Phaser from 'phaser'
import { ROOM_204_NECK_PHOTO } from '../data/rooms/room204'
import { dialogueFontSizePx } from '../systems/settings'
import { COLORS, DEPTH, MENU_COLORS, menuTextStyle } from './theme'

/** Màn đọc vật chứng trong Sổ tay, nối ảnh đã được nạp và dữ liệu bản ghi. */
export class EvidenceDetailView extends Phaser.GameObjects.Container {
  constructor(scene, { id, title, provenance, text, settings }) {
    super(scene, 80, 150)
    this.setName('evidence-detail').setDepth(DEPTH.OVERLAY)

    const width = scene.scale.width - 160
    const previewWidth = Math.round(width * 0.46)
    const previewHeight = 372
    const preview = scene.add
      .rectangle(0, 0, previewWidth, previewHeight, MENU_COLORS.overlay)
      .setOrigin(0)
      .setStrokeStyle(1, COLORS.panelBorder)

    const centerX = previewWidth / 2
    const centerY = previewHeight / 2
    const { key, frame } = ROOM_204_NECK_PHOTO
    let previewContent
    if (
      id === 'EV_NeckScratches' &&
      scene.textures.exists(key) &&
      scene.textures.get(key).has(frame)
    ) {
      const photo = scene.add.image(centerX, centerY, key, frame)
      photo.setScale(
        Math.min((previewWidth - 24) / photo.width, (previewHeight - 24) / photo.height),
      )
      previewContent = photo
    } else {
      // DEC-017: chỉ dùng tên bản ghi ở vùng ảnh nếu nhóm chưa cung cấp ảnh.
      previewContent = scene.add
        .text(
          centerX,
          centerY,
          title,
          menuTextStyle({
            size: 18,
            color: COLORS.mutedHex,
            align: 'center',
            wrapWidth: previewWidth - 48,
          }),
        )
        .setOrigin(0.5)
    }

    const textX = previewWidth + 32
    const wrapWidth = width - textX
    const heading = scene.add.text(
      textX,
      3,
      title,
      menuTextStyle({ font: 'display', size: 34, weight: 600, wrapWidth }),
    )
    const source = scene.add.text(
      textX,
      heading.getBounds().bottom + 8,
      provenance,
      menuTextStyle({ size: 15, color: COLORS.accentHex, wrapWidth }),
    )
    const body = scene.add.text(
      textX,
      provenance ? source.getBounds().bottom + 18 : heading.getBounds().bottom + 15,
      text,
      menuTextStyle({ size: dialogueFontSizePx(settings), wrapWidth }),
    )
    this.add([preview, previewContent, heading, source, body])
    scene.add.existing(this)
  }
}
