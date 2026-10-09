import Phaser from 'phaser'
import { createLogger } from '@/shared/logger/logger'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { dialogueCacheKey, parseDialogueFile } from '../data/dialogueData'
import { CharacterStage } from '../ui/CharacterStage'
import { DialogueBox } from '../ui/DialogueBox'

const log = createLogger('DialogueScene')

/**
 * Visual Novel Engine — Project.docx §3.2.
 * Luồng: bấm chuột / Space / Enter -> (đang chạy chữ ? hiện hết : câu tiếp) -> hết thoại -> điều tra.
 * data: { chapter: number, lines?: object[], nextScene?: string }
 *   lines     — (debug) dùng lời thoại truyền vào thay cho file JSON của chương
 *   nextScene — scene chạy khi hết thoại, mặc định RoomInvestigationScene
 */
export class DialogueScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.DIALOGUE)
  }

  init(data) {
    this.chapter = data.chapter
    this.lineIndex = 0
    this.overrideLines = Array.isArray(data.lines) ? data.lines : null
    this.nextScene = data.nextScene ?? SCENE_KEYS.ROOM_INVESTIGATION
  }

  create() {
    if (this.overrideLines) {
      this.lines = this.overrideLines
    } else {
      const raw = this.cache.json.get(dialogueCacheKey(this.chapter))
      this.lines = raw ? parseDialogueFile(raw).lines : []
    }

    if (this.lines.length === 0) {
      log.warn(`Chương ${this.chapter} chưa có lời thoại — PENDING(ISS-07)`)
      this.lines = [
        {
          speaker: 'Hệ thống',
          text: `Chương ${this.chapter}: chưa có lời thoại (chờ dữ liệu kịch bản). Bấm để tiếp tục.`,
        },
      ]
    }

    // Thứ tự lớp: nhân vật nửa thân (CharacterStage) nằm sau khung thoại (DialogueBox)
    this.characterStage = new CharacterStage(this)
    this.box = new DialogueBox(this, { stage: this.characterStage })
    this.box.showLine(this.lines[0])

    this.input.on('pointerup', () => this.advance())
    this.input.keyboard?.on('keydown-SPACE', () => this.advance())
    this.input.keyboard?.on('keydown-ENTER', () => this.advance())
  }

  advance() {
    if (this.box.isTyping) {
      this.box.completeTyping()
      return
    }
    this.lineIndex += 1
    if (this.lineIndex < this.lines.length) {
      this.box.showLine(this.lines[this.lineIndex])
    } else {
      this.scene.start(this.nextScene, { chapter: this.chapter })
    }
  }
}
