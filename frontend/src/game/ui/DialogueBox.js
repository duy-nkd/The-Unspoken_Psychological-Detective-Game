import Phaser from 'phaser'
import { createLogger } from '@/shared/logger/logger'
import { TYPEWRITER } from '../constants/gameplay'
import { resolveStageLine } from '../data/characters'
import { COLORS, DEPTH, TEXT_STYLES } from './theme'

const log = createLogger('DialogueBox')

const PADDING = 24
const PORTRAIT_SIZE = 160
const BOX_HEIGHT = 220

/**
 * Khung hội thoại Visual Novel — Project.docx §3.2: tên nhân vật + chân dung biểu cảm +
 * Typewriter bằng scene.time.addEvent.
 *
 * Hai cách hiển thị người nói:
 *   - line.character (xem data/characters.js): nhân vật nửa thân trên đứng bên trái/phải
 *     màn hình (CharacterStage), nhép miệng khi chữ chạy. Không có ô chân dung.
 *   - line.portrait (texture key): ô chân dung nhỏ trong khung thoại (nhân vật chưa có ảnh nửa thân).
 * Câu thoại không có character -> nhân vật đang đứng trên sân khấu tối đi (đang nghe).
 *
 * Thiết lập người chơi (DEC-012) truyền qua options: charDelayMs (tốc độ chữ, 0 = hiện ngay),
 * fontSize (cỡ chữ thân), onLineComplete (gọi khi câu đã hiện hết — dùng cho tự động chuyển thoại).
 */
export class DialogueBox extends Phaser.GameObjects.Container {
  /**
   * @param {Phaser.Scene} scene
   * @param {{ stage?: import('./CharacterStage').CharacterStage, charDelayMs?: number,
   *           fontSize?: number, onLineComplete?: () => void }} [options]
   */
  constructor(
    scene,
    {
      stage = null,
      charDelayMs = TYPEWRITER.CHAR_DELAY_MS,
      fontSize = null,
      onLineComplete = null,
      fitText = false,
    } = {},
  ) {
    const { width, height } = scene.scale
    super(scene, 0, height - BOX_HEIGHT)
    this.setDepth(DEPTH.OVERLAY)
    this.stage = stage
    this.charDelayMs = charDelayMs
    this.onLineComplete = onLineComplete
    this.fitText = fitText

    const panel = scene.add
      .rectangle(0, 0, width, BOX_HEIGHT, COLORS.panel, 0.92)
      .setOrigin(0)
      .setStrokeStyle(2, COLORS.panelBorder)
    this.panel = panel

    // Ô chân dung — chỉ hiện khi câu thoại dùng line.portrait. Ảnh nguồn phải VUÔNG.
    this.portraitFrame = scene.add
      .rectangle(PADDING, PADDING, PORTRAIT_SIZE, PORTRAIT_SIZE, COLORS.background)
      .setOrigin(0)
      .setStrokeStyle(2, COLORS.panelBorder)
    this.portrait = scene.add.image(
      PADDING + PORTRAIT_SIZE / 2,
      PADDING + PORTRAIT_SIZE / 2,
      '__DEFAULT',
    )

    this.nameText = scene.add.text(0, PADDING, '', {
      ...TEXT_STYLES.heading,
      color: COLORS.accentHex,
    })
    this.bodyText = scene.add.text(0, PADDING + 44, '', TEXT_STYLES.body)
    if (fontSize) this.bodyText.setFontSize(fontSize)

    this.add([panel, this.portraitFrame, this.portrait, this.nameText, this.bodyText])
    scene.add.existing(this)

    this.typingEvent = null
    this.fullText = ''
    this.setPortrait(null)
  }

  get isTyping() {
    return this.typingEvent !== null
  }

  /**
   * @param {{ speaker?: string, text: string, kind?: string, portrait?: string|null, portraitFrame?: string, character?: string|null,
   *           expression?: string|null, talk?: string|null, position?: string|null }} line
   */
  showLine(line) {
    const { text = '', portrait = null, portraitFrame, kind } = line
    this.stopTyping()

    const onStage = this.placeCharacter(line)
    this.nameText.setText(line.speaker || onStage?.name || '')
    this.setPortrait(onStage ? null : portrait, portraitFrame)
    this.bodyText.setFontStyle(kind === 'narration' ? 'italic' : 'normal')
    this.bodyText.setColor(
      kind === 'ui' ? COLORS.accentHex : kind === 'action' ? COLORS.mutedHex : COLORS.textHex,
    )
    this.fullText = text
    if (this.fitText) {
      this.bodyText.setText(text)
      const height = Math.max(BOX_HEIGHT, this.bodyText.y + this.bodyText.height + PADDING)
      this.panel.setSize(this.scene.scale.width, height)
      this.setY(this.scene.scale.height - height)
    }
    this.bodyText.setText('')

    // repeat = -1 sẽ lặp vô hạn -> chặn chuỗi rỗng; tốc độ "Hiện ngay" (0 ms) -> không chạy chữ
    if (text.length === 0 || this.charDelayMs <= 0) {
      this.bodyText.setText(text)
      this.onLineComplete?.()
      return
    }

    const talkAnim = onStage?.talkAnim
    if (talkAnim) this.stage.startTalking(talkAnim)
    let shown = 0
    this.typingEvent = this.scene.time.addEvent({
      delay: this.charDelayMs,
      repeat: text.length - 1,
      callback: () => {
        shown += 1
        this.bodyText.setText(text.slice(0, shown))
        if (talkAnim) this.stage.syncMouth(text[shown - 1])
        if (shown >= text.length) {
          this.stopTyping()
          this.onLineComplete?.()
        }
      },
    })
  }

  /** Người chơi bấm khi chữ đang chạy -> hiện hết câu ngay. */
  completeTyping() {
    this.stopTyping()
    this.bodyText.setText(this.fullText)
    this.onLineComplete?.()
  }

  stopTyping() {
    this.typingEvent?.remove(false)
    this.typingEvent = null
    this.stage?.stopTalking()
  }

  /** @returns {object|null} thông tin sân khấu nếu nhân vật được đưa lên, ngược lại null */
  placeCharacter(line) {
    if (!this.stage) return null
    const onStage = resolveStageLine(line)
    if (line.character && !onStage) log.warn(`Nhân vật không tồn tại: "${line.character}"`)
    if (onStage && this.stage.show(onStage)) return onStage
    if (onStage) log.warn(`Chưa nạp ảnh nhân vật: ${onStage.textureKey}`)
    this.stage.dim()
    return null
  }

  /** Có ô chân dung -> chữ lùi sang phải; không có -> chữ dùng hết bề ngang khung. */
  setPortrait(textureKey, frame) {
    const exists = Boolean(textureKey) && this.scene.textures.exists(textureKey)
    this.portraitFrame.setVisible(exists)
    this.portrait.setVisible(exists)
    if (exists)
      this.portrait.setTexture(textureKey, frame).setDisplaySize(PORTRAIT_SIZE, PORTRAIT_SIZE)

    const textX = exists ? PADDING * 2 + PORTRAIT_SIZE : PADDING * 2
    this.nameText.setX(textX)
    this.bodyText.setX(textX).setWordWrapWidth(this.scene.scale.width - textX - PADDING * 2)
  }

  preDestroy() {
    // Chỉ hủy timer — không đổi texture khi scene đang tắt
    this.typingEvent?.remove(false)
    this.typingEvent = null
    super.preDestroy?.()
  }
}
