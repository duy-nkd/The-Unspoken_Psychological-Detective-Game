import { shouldPauseMouth } from '../systems/lipSync'
import { DEPTH } from './theme'

/** TẠM — bố cục kỹ thuật, tài liệu chưa quy định art direction. */
const LAYOUT = Object.freeze({
  HEIGHT: 660, // chiều cao hiển thị ảnh nửa thân (đáy chạm mép dưới, phía sau khung thoại)
  MARGIN_X: 24, // khoảng cách tới mép trái/phải màn hình
  ENTER_OFFSET_X: 60, // trượt vào từ ngoài vào khi nhân vật xuất hiện
  ENTER_MS: 220,
  DIM_TINT: 0x8a8a8a, // nhân vật đang nghe (người khác nói) -> tối đi
})

/**
 * Sân khấu nhân vật kiểu Visual Novel: ảnh nửa thân trên đứng bên trái/phải màn hình,
 * nằm SAU khung thoại (DEPTH.CHARACTER < DEPTH.OVERLAY) và nhép miệng khi chữ đang chạy.
 * Không chứa logic câu thoại — DialogueBox gọi show/startTalking/syncMouth/stopTalking.
 */
export class CharacterStage {
  constructor(scene) {
    this.scene = scene
    this.sprite = scene.add
      .sprite(0, scene.scale.height, '__DEFAULT')
      .setOrigin(0.5, 1)
      .setDepth(DEPTH.CHARACTER)
      .setVisible(false)
    this.current = null // { characterId, side }
    this.idleTexture = null
  }

  get visible() {
    return this.sprite.visible
  }

  /**
   * Đưa nhân vật lên sân khấu với biểu cảm đứng yên.
   * @param {{ characterId: string, side: 'left'|'right', textureKey: string }} stage
   * @returns {boolean} false nếu ảnh chưa được nạp
   */
  show({ characterId, side, textureKey }) {
    if (!this.scene.textures.exists(textureKey)) return false
    this.stopTalking()
    this.idleTexture = textureKey
    this.sprite.setTexture(textureKey).clearTint()
    this.sprite.setScale(LAYOUT.HEIGHT / this.sprite.height)

    const x = this.sideX(side)
    const isNewEntrance =
      !this.sprite.visible ||
      this.current?.characterId !== characterId ||
      this.current?.side !== side
    this.current = { characterId, side }

    this.scene.tweens.killTweensOf(this.sprite)
    if (isNewEntrance) {
      const from = side === 'left' ? x - LAYOUT.ENTER_OFFSET_X : x + LAYOUT.ENTER_OFFSET_X
      this.sprite.setPosition(from, this.scene.scale.height).setAlpha(0).setVisible(true)
      this.scene.tweens.add({
        targets: this.sprite,
        x,
        alpha: 1,
        duration: LAYOUT.ENTER_MS,
        ease: 'Cubic.easeOut',
      })
    } else {
      this.sprite.setPosition(x, this.scene.scale.height).setAlpha(1)
    }
    return true
  }

  /** Người khác đang nói: nhân vật vẫn đứng đó nhưng tối đi. */
  dim() {
    if (!this.sprite.visible) return
    this.stopTalking()
    this.sprite.setTint(LAYOUT.DIM_TINT)
  }

  hide() {
    this.stopTalking()
    this.scene.tweens.killTweensOf(this.sprite)
    this.sprite.setVisible(false)
    this.current = null
  }

  startTalking(animKey) {
    if (!animKey || !this.sprite.visible || !this.scene.anims.exists(animKey)) return
    this.sprite.play(animKey)
  }

  /** Dấu câu -> tạm dừng miệng; chữ thường -> nhép tiếp. */
  syncMouth(char) {
    const anims = this.sprite.anims
    if (!anims?.currentAnim) return
    if (shouldPauseMouth(char)) {
      if (anims.isPlaying) anims.pause()
    } else if (anims.isPaused) {
      anims.resume()
    }
  }

  /** Dừng nhép miệng, trả về biểu cảm đứng yên. */
  stopTalking() {
    if (this.sprite.anims?.currentAnim) this.sprite.stop()
    if (this.idleTexture && this.sprite.visible) this.sprite.setTexture(this.idleTexture)
  }

  sideX(side) {
    const halfWidth = (this.sprite.width * this.sprite.scaleX) / 2
    return side === 'left'
      ? LAYOUT.MARGIN_X + halfWidth
      : this.scene.scale.width - LAYOUT.MARGIN_X - halfWidth
  }
}
