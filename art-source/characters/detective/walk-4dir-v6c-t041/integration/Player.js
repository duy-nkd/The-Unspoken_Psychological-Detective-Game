import { ROOM_MOVEMENT } from '../constants/gameplay'
import { footAt, heightAt, speedFactorAt } from '../systems/depthScale'
import { facingFromVector, idleFrameName, walkFrameName } from '../systems/facing'
import {
  advanceWalkCycle,
  groundDirection,
  strideProgressMs,
  velocityFromInput,
  velocityToward,
} from '../systems/locomotion'
import { moveWithSlide } from '../systems/walkArea'

/**
 * Atlas thám tử (PreloadScene nạp) — DEC-013, DEC-020. Dựng bằng scripts/art/build_detective_atlas.py từ gói V6c;
 * các số dưới đây script in ra và ghi trong meta của detective.json (test detectiveAtlas.test.js so khớp).
 */
export const DETECTIVE_ATLAS = Object.freeze({
  key: 'detective',
  textureUrl: 'assets/images/characters/detective.webp',
  atlasUrl: 'assets/images/characters/detective.json',
  /** Chiều cao người trong ô ảnh (px) — quy đổi tỉ lệ phối cảnh: scale = heightAt(y) / sourceHeight. */
  sourceHeight: 350,
  /** Gốc sprite = điểm chân trong ô (không còn là đáy ô: chân trước khi đi dọc thò xuống dưới điểm chân). */
  origin: Object.freeze({ x: 0.5, y: 0.923077 }),
  /** Mỗi hướng một chu kỳ 1 giây, 2 bước (gói V6c, animation_manifest.json). */
  walk: Object.freeze({
    left: Object.freeze({ frames: 24, frameRate: 24 }),
    right: Object.freeze({ frames: 24, frameRate: 24 }),
    up: Object.freeze({ frames: 12, frameRate: 12 }),
    down: Object.freeze({ frames: 12, frameRate: 12 }),
  }),
})

const SPEEDS = Object.freeze({
  horizontal: ROOM_MOVEMENT.WALK_SPEED,
  vertical: ROOM_MOVEMENT.WALK_SPEED_VERTICAL,
})

/**
 * Thám tử đi trong phòng 2.5D (DEC-013).
 * - Vị trí logic = điểm CHÂN (this.x, this.y); gốc sprite = điểm chân trong ô ảnh.
 * - Hình vẽ đi liên tục theo vị trí logic (mượt); khung đổi theo quãng đường thật (systems/locomotion, T-040).
 * - Va chạm: systems/walkArea (đa giác sàn + vật cản), bàn chân co giãn theo phối cảnh.
 * - Điều khiển: update() nhận vector phím; walkTo() đi theo đường do scene tìm (bấm chuột).
 * - Không phải GameObject: giữ logic tách khỏi sprite để dễ đọc/test phần thuần.
 */
export class Player {
  /**
   * @param {Phaser.Scene} scene
   * @param {{ room: object, x: number, y: number, face?: string, depthBase?: number }} options
   */
  constructor(scene, { room, x, y, face = 'down', depthBase = 20 }) {
    this.scene = scene
    this.room = room
    this.x = x
    this.y = y
    this.facing = face
    this.depthBase = depthBase
    this.path = null
    this.onArrive = null
    this.moving = false
    /** Trạng thái chu kỳ đi (khung + chỗ vẽ); null khi đứng yên. */
    this.cycle = null
    this.footAt = ([, fy]) => footAt(room.depth, fy)

    const { origin } = DETECTIVE_ATLAS
    this.sprite = scene.add
      .sprite(x, y, DETECTIVE_ATLAS.key, idleFrameName(face))
      .setOrigin(origin.x, origin.y)
    this.applyAppearance()
  }

  /** Đầu nhân vật (để đặt nhãn "E" phía trên). */
  get headY() {
    return this.y - heightAt(this.room.depth, this.y)
  }

  /** Đi theo danh sách điểm; gọi onArrive khi tới điểm cuối. */
  walkTo(points, onArrive = null) {
    this.path = points && points.length > 0 ? [...points] : null
    this.onArrive = onArrive
    if (!this.path && onArrive) onArrive()
  }

  stop() {
    this.path = null
    this.onArrive = null
  }

  face(direction) {
    this.facing = direction
    this.applyAppearance()
  }

  /**
   * @param {number} delta ms
   * @param {{ x: number, y: number }} input vector phím (đã chuẩn hóa, 0 = không bấm)
   */
  update(delta, input = { x: 0, y: 0 }) {
    // DEC-020: ngang 220, dọc 88 px/giây ở mốc gần (systems/locomotion.js), nhân hệ số phối cảnh
    const depthFactor = speedFactorAt(this.room.depth, this.y)
    const factor = depthFactor * (delta / 1000)
    let velocity = { x: 0, y: 0 }

    if (input.x !== 0 || input.y !== 0) {
      this.stop() // bấm phím thì bỏ đường đi do chuột
      velocity = velocityFromInput(input.x, input.y, SPEEDS)
    } else if (this.path) {
      const target = this.path[0]
      const dx = target.x - this.x
      const dy = target.y - this.y
      const toward = velocityToward(dx, dy, SPEEDS)
      const step = Math.hypot(toward.x, toward.y) * factor
      if (Math.hypot(dx, dy) <= Math.max(ROOM_MOVEMENT.ARRIVE_EPSILON, step)) {
        this.x = target.x
        this.y = target.y
        this.path.shift()
        if (this.path.length === 0) {
          const done = this.onArrive
          this.stop()
          this.moving = false
          this.applyAppearance()
          done?.()
          return
        }
      } else {
        velocity = toward
      }
    }

    const wantsToMove = velocity.x !== 0 || velocity.y !== 0
    let movedX = 0
    let movedY = 0
    if (wantsToMove) {
      const next = moveWithSlide(
        this.room,
        this,
        velocity.x * factor,
        velocity.y * factor,
        this.footAt,
      )
      movedX = next.x - this.x
      movedY = next.y - this.y
      this.x = next.x
      this.y = next.y
      const ground = groundDirection(velocity.x, velocity.y, SPEEDS)
      this.facing = facingFromVector(ground.x, ground.y, this.facing)
      this.moving = Math.hypot(movedX, movedY) > 0.01
      // Đi theo đường mà bị chặn hẳn (dữ liệu đổi giữa chừng) -> dừng, tránh đứng giậm chân mãi
      if (!this.moving && this.path) this.stop()
    } else {
      this.moving = false
    }
    this.applyAppearance(strideProgressMs(movedX, movedY, SPEEDS, depthFactor))
  }

  /**
   * Chọn khung + vẽ tại vị trí logic. Đang đi: khung theo quãng đường vừa đi (`progressMs`, T-040).
   * Đứng yên: tư thế đứng của hướng hiện tại.
   */
  applyAppearance(progressMs = 0) {
    let frame
    if (this.moving) {
      const { frames, frameRate } = DETECTIVE_ATLAS.walk[this.facing]
      this.cycle = advanceWalkCycle(this.cycle, {
        facing: this.facing,
        progressMs,
        frameRate,
        frameCount: frames,
      })
      frame = walkFrameName(this.facing, this.cycle.index)
    } else {
      this.cycle = null
      frame = idleFrameName(this.facing)
    }

    const sprite = this.sprite
    if (sprite.frame.name !== frame) sprite.setFrame(frame)
    sprite.setScale(heightAt(this.room.depth, this.y) / DETECTIVE_ATLAS.sourceHeight)
    sprite.setPosition(this.x, this.y)
    // Vẽ theo độ sâu: chân càng thấp (gần camera) càng nằm trên
    sprite.setDepth(this.depthBase + this.y / 1000)
  }

  destroy() {
    this.sprite.destroy()
  }
}
