import Phaser from 'phaser'
import { TYPEWRITER } from '../constants/gameplay'
import { COLORS, DEPTH, TEXT_STYLES } from './theme'

const PADDING = 24
const PORTRAIT_SIZE = 160

/**
 * Khung hội thoại Visual Novel — Project.docx §3.2:
 * tên nhân vật + khung chân dung biểu cảm + Typewriter bằng scene.time.addEvent.
 */
export class DialogueBox extends Phaser.GameObjects.Container {
  constructor(scene) {
    const { width, height } = scene.scale
    const boxHeight = 220
    super(scene, 0, height - boxHeight)
    this.setDepth(DEPTH.OVERLAY)

    const panel = scene.add
      .rectangle(0, 0, width, boxHeight, COLORS.panel, 0.95)
      .setOrigin(0)
      .setStrokeStyle(2, COLORS.panelBorder)

    // Khung chân dung: hiện ảnh nếu texture tồn tại, nếu không để khung trống
    this.portraitFrame = scene.add
      .rectangle(PADDING, PADDING, PORTRAIT_SIZE, PORTRAIT_SIZE, COLORS.background)
      .setOrigin(0)
      .setStrokeStyle(2, COLORS.panelBorder)
    this.portrait = scene.add
      .image(PADDING + PORTRAIT_SIZE / 2, PADDING + PORTRAIT_SIZE / 2, '__DEFAULT')
      .setVisible(false)

    const textX = PADDING * 2 + PORTRAIT_SIZE
    this.nameText = scene.add.text(textX, PADDING, '', {
      ...TEXT_STYLES.heading,
      color: COLORS.accentHex,
    })
    this.bodyText = scene.add.text(textX, PADDING + 44, '', {
      ...TEXT_STYLES.body,
      wordWrap: { width: width - textX - PADDING },
    })

    this.add([panel, this.portraitFrame, this.portrait, this.nameText, this.bodyText])
    scene.add.existing(this)

    this.typingEvent = null
    this.fullText = ''
  }

  get isTyping() {
    return this.typingEvent !== null
  }

  /** @param {{ speaker: string, text: string, portrait?: string|null }} line */
  showLine({ speaker, text, portrait = null }) {
    this.stopTyping()
    this.nameText.setText(speaker)
    this.setPortrait(portrait)
    this.fullText = text
    this.bodyText.setText('')

    if (text.length === 0) return // repeat = -1 sẽ lặp vô hạn -> chặn chuỗi rỗng

    let shown = 0
    this.typingEvent = this.scene.time.addEvent({
      delay: TYPEWRITER.CHAR_DELAY_MS,
      repeat: text.length - 1,
      callback: () => {
        shown += 1
        this.bodyText.setText(text.slice(0, shown))
        if (shown >= text.length) this.typingEvent = null
      },
    })
  }

  /** Người chơi bấm khi chữ đang chạy -> hiện hết câu ngay. */
  completeTyping() {
    this.stopTyping()
    this.bodyText.setText(this.fullText)
  }

  stopTyping() {
    this.typingEvent?.remove(false)
    this.typingEvent = null
  }

  setPortrait(textureKey) {
    const exists = Boolean(textureKey) && this.scene.textures.exists(textureKey)
    this.portrait.setVisible(exists)
    if (exists) this.portrait.setTexture(textureKey).setDisplaySize(PORTRAIT_SIZE, PORTRAIT_SIZE)
  }

  preDestroy() {
    this.stopTyping()
    super.preDestroy?.()
  }
}
