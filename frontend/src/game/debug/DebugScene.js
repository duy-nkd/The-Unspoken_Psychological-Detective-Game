import Phaser from 'phaser'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { getRuntime } from '../core/runtime'
import { DEPTH, FONT_FAMILY } from '../ui/theme'

/**
 * Debug Overlay — chỉ chạy khi env.debug (dev). Phím ` (backquote) để ẩn/hiện.
 * Hiển thị: FPS, scene đang chạy, chương, uy tín, số mục sổ tay.
 * Cùng với window.__THE_UNSPOKEN__ (game/index.js) giúp debug nhanh không cần breakpoint.
 */
export class DebugScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.DEBUG)
  }

  create() {
    this.label = this.add
      .text(8, this.scale.height - 8, '', {
        fontFamily: FONT_FAMILY,
        fontSize: '13px',
        color: '#7CFC9A',
        backgroundColor: '#000000aa',
        padding: { x: 6, y: 4 },
      })
      .setOrigin(0, 1)
      .setDepth(DEPTH.DEBUG)

    this.input.keyboard?.on('keydown-BACKTICK', () => this.label.setVisible(!this.label.visible))
    this.time.addEvent({ delay: 250, loop: true, callback: () => this.refresh() })
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
