import { NPC_SPRITES, npcTextureKey } from '../data/npcSprites'
import { cutoutNpcPixels } from '../systems/npcCutout'
import { heightAt } from '../systems/depthScale'
import { COLORS, DEPTH, TEXT_STYLES } from '../ui/theme'

/** Texture map độc lập: không đổi frame chân dung/nhép miệng đang dùng trong hội thoại. */
export function registerNpcTextures(textures) {
  for (const [id, { sourceKey, crop }] of Object.entries(NPC_SPRITES)) {
    const key = npcTextureKey(id)
    if (textures.exists(key) || !textures.exists(sourceKey)) continue
    const source = textures.get(sourceKey).getSourceImage()
    const [x, y, width, height] = crop ?? [0, 0, source.width, source.height]
    const texture = textures.createCanvas(key, width, height)
    texture.context.drawImage(source, x, y, width, height, 0, 0, width, height)
    const image = texture.context.getImageData(0, 0, width, height)
    const cutout = cutoutNpcPixels(image)
    if (!cutout.bounds) {
      textures.remove(key)
      continue
    }
    image.data.set(cutout.data)
    const [left, top, bodyWidth, bodyHeight] = cutout.bounds
    texture.setSize(bodyWidth, bodyHeight)
    texture.context.putImageData(image, -left, -top)
    texture.refresh()
  }
}

/** Actor đứng yên: cùng gốc chân, phối cảnh và thang depth với Player. */
export class Npc {
  constructor(scene, { room, spot, depthBase = 20 }) {
    this.id = spot.suspect ?? spot.characterId
    const [x, y] = spot.stand
    const key = npcTextureKey(this.id)
    this.sprite = null
    let labelY = y - 55
    if (this.id && scene.textures.exists(key)) {
      const frame = scene.textures.getFrame(key)
      const height = heightAt(room.depth, y)
      this.sprite = scene.add
        .image(x, y, key)
        .setOrigin(0.5, 1)
        .setScale(height / frame.height)
        .setDepth(depthBase + y / 1000)
      labelY = y - height - 8
    }
    this.label = scene.add
      .text(x, labelY, spot.name, {
        ...TEXT_STYLES.body,
        color: COLORS.textHex,
        backgroundColor: '#241f2b',
        padding: { x: 6, y: 2 },
      })
      .setOrigin(0.5, this.sprite ? 1 : 0.5)
      .setDepth(DEPTH.HUD)
  }

  /** Vùng bấm bao cả model và nhãn; stand/choiceIndex vẫn là dữ liệu tương tác cũ. */
  get rect() {
    if (!this.sprite) return null
    const body = this.sprite.getBounds()
    const label = this.label.getBounds()
    const left = Math.min(body.left, label.left)
    const top = Math.min(body.top, label.top)
    return [
      left,
      top,
      Math.max(body.right, label.right) - left,
      Math.max(body.bottom, label.bottom) - top,
    ]
  }

  destroy() {
    if (this.sprite?.scene) this.sprite.destroy()
    if (this.label?.scene) this.label.destroy()
  }
}
