import Phaser from 'phaser'
import { createLogger } from '@/shared/logger/logger'
import { FIRST_CHAPTER } from '../constants/gameplay'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { loadUiFonts } from '../core/fonts'
import { getRuntime } from '../core/runtime'
import { ROOMS } from '../data/rooms'
import { ROOM_204_NECK_PHOTO } from '../data/rooms/room204'
import { SUSPECT_PORTRAITS, suspectPortraitKey } from '../data/suspectPortraits'
import { DETECTIVE_ATLAS } from '../entities/Player'
import { loadCharacterAssets, registerCharacterAnimations } from '../data/characters'
import { CHAPTER_DATA, chapterFileUrl } from '../data/chapters'
import { dialogueCacheKey, dialogueUrl } from '../data/dialogueData'
import { TEXT_STYLES } from '../ui/theme'

const log = createLogger('PreloadScene')

/**
 * Nạp asset bất đồng bộ (Project.docx §3.2: JSON hội thoại trong public/assets/dialogues/).
 * Thêm asset mới: khai báo trong preload() — scene khác chỉ dùng key đã nạp.
 * Ảnh nhân vật + hoạt ảnh nhép miệng: khai báo trong data/characters.js (tự nạp tại đây).
 * Font menu (DEC-012): chờ tải xong (tối đa 3 s) rồi mới vào MainMenu — xem core/fonts.js.
 */
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.PRELOAD)
  }

  preload() {
    const { width, height } = this.scale
    const runtime = getRuntime(this)
    const label = (value) => runtime.t('preload.loading', { percent: Math.round(value * 100) })
    const progress = this.add.text(width / 2, height / 2, label(0), TEXT_STYLES.body)
    progress.setOrigin(0.5)

    this.load.on('progress', (value) => progress.setText(label(value)))
    this.load.on('loaderror', (file) =>
      log.error(`Không tải được asset: ${file.key} (${file.url})`),
    )

    this.load.json(dialogueCacheKey(FIRST_CHAPTER), dialogueUrl(FIRST_CHAPTER))
    for (const [name, file] of Object.entries(CHAPTER_DATA[FIRST_CHAPTER].files)) {
      this.load.json(file.key, chapterFileUrl(FIRST_CHAPTER, name))
    }
    loadCharacterAssets(this.load)

    // Phòng 2.5D + nhân vật thám tử đi lại (DEC-013)
    for (const room of Object.values(ROOMS)) {
      this.load.image(room.background.key, room.background.url)
      if (room.backgroundWithTung) {
        this.load.image(room.backgroundWithTung.key, room.backgroundWithTung.url)
      }
      if (room.inspectContent) this.load.json(room.inspectContent.key, room.inspectContent.url)
      for (const occluder of room.occluders) this.load.image(occluder.key, occluder.url)
    }
    this.load.image(ROOM_204_NECK_PHOTO.key, ROOM_204_NECK_PHOTO.url)
    for (const id of Object.keys(SUSPECT_PORTRAITS)) {
      this.load.image(suspectPortraitKey(id), `assets/images/portraits/chapter1/${id}-sheet.png`)
    }
    this.load.atlas(DETECTIVE_ATLAS.key, DETECTIVE_ATLAS.textureUrl, DETECTIVE_ATLAS.atlasUrl)
  }

  create() {
    const { key, frame, crop } = ROOM_204_NECK_PHOTO
    if (this.textures.exists(key)) this.textures.get(key).add(frame, 0, ...crop)
    for (const [id, { frames }] of Object.entries(SUSPECT_PORTRAITS)) {
      const textureKey = suspectPortraitKey(id)
      if (!this.textures.exists(textureKey)) continue
      const texture = this.textures.get(textureKey)
      for (const [name, bounds] of Object.entries(frames)) texture.add(name, 0, ...bounds)
    }
    // Hoạt ảnh thuộc AnimationManager toàn game -> tạo một lần, mọi scene dùng chung
    registerCharacterAnimations(this.anims)
    loadUiFonts().then(() => {
      // Scene có thể đã bị tắt trong lúc chờ (game bị hủy khi rời trang) -> không start nữa
      if (this.sys?.isActive()) this.scene.start(SCENE_KEYS.MAIN_MENU)
    })
  }
}
