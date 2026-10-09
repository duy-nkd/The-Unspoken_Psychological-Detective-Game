import Phaser from 'phaser'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { getRuntime } from '../core/runtime'
import { PORTRAIT_DEMO_LINES } from './demoDialogue'
import { DEPTH, FONT_FAMILY } from '../ui/theme'

/**
 * Debug Overlay — chỉ chạy khi env.debug (dev). Phím ` (backquote) để ẩn/hiện.
 * Phím F9: xem thử hoạt ảnh nhép miệng nhân vật (hội thoại DEMO, xong quay về menu).
 * Hiển thị: FPS, scene đang chạy, chương, uy tín, số mục sổ tay.
 * Cùng với window.__THE_UNSPOKEN__ (game/index.js) giúp debug nhanh không cần breakpoint.
 */
export class DebugScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.DEBUG)
  }

  create() {
    this.label = this.add
      .text(this.scale.width - 8, 8, '', {
        fontFamily: FONT_FAMILY,
        fontSize: '13px',
        color: '#7CFC9A',
        backgroundColor: '#000000aa',
        padding: { x: 6, y: 4 },
      })
      .setOrigin(1, 0) // góc trên phải — không che khung hội thoại/chân dung
      .setDepth(DEPTH.DEBUG)

    this.input.keyboard?.on('keydown-BACKTICK', () => this.label.setVisible(!this.label.visible))
    this.input.keyboard?.on('keydown-F9', () => this.startPortraitDemo())
    this.time.addEvent({ delay: 250, loop: true, callback: () => this.refresh() })
    this.scene.bringToTop()
  }

  /** Tắt các scene đang chạy rồi mở DialogueScene với lời thoại DEMO. */
  startPortraitDemo() {
    for (const scene of this.scene.manager.getScenes(true)) {
      if (scene.scene.key !== SCENE_KEYS.DEBUG) this.scene.stop(scene.scene.key)
    }
    const { session } = getRuntime(this)
    this.scene.launch(SCENE_KEYS.DIALOGUE, {
      chapter: session.chapter,
      lines: PORTRAIT_DEMO_LINES,
      nextScene: SCENE_KEYS.MAIN_MENU,
    })
    this.scene.bringToTop()
  }

  refresh() {
    if (!this.label.visible) return
    const active = this.scene.manager
      .getScenes(true)
      .map((scene) => scene.scene.key)
      .filter((key) => key !== SCENE_KEYS.DEBUG)
    const { session } = getRuntime(this)
    const notebookCount = Object.values(session.notebook).reduce(
      (sum, list) => sum + list.length,
      0,
    )
    this.label.setText(
      [
        `FPS ${Math.round(this.game.loop.actualFps)}`,
        `Scenes: ${active.join(', ') || '-'}`,
        `Chapter ${session.chapter} | Uy tín ${session.credibility} | Sổ tay ${notebookCount} mục`,
      ].join('\n'),
    )
    this.scene.bringToTop()
  }
}
