import Phaser from 'phaser'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { getRuntime } from '../core/runtime'
import { NOTEBOOK_TABS } from '../systems/notebook'
import { TextButton } from '../ui/TextButton'
import { COLORS, DEPTH, TEXT_STYLES } from '../ui/theme'

/**
 * Sổ tay điều tra 4 tab — Project.docx §3.2 (Evidence, People, Timeline, Statements).
 * Chạy chồng lên scene điều tra (launch + pause). N hoặc Esc để đóng.
 * data: { returnTo: string } — key scene cần resume khi đóng.
 */
export class NotebookScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.NOTEBOOK)
  }

  init(data) {
    this.returnTo = data.returnTo
    this.activeTab = NOTEBOOK_TABS[0].id
  }

  create() {
    const { width, height } = this.scale
    this.add
      .rectangle(40, 40, width - 80, height - 80, COLORS.background, 0.97)
      .setOrigin(0)
      .setStrokeStyle(2, COLORS.panelBorder)
      .setDepth(DEPTH.OVERLAY)

    this.tabButtons = NOTEBOOK_TABS.map((tab, index) =>
      new TextButton(this, 180 + index * 220, 90, tab.label, () => this.selectTab(tab.id)).setDepth(
        DEPTH.OVERLAY,
      ),
    )
    this.content = this.add
      .text(80, 150, '', { ...TEXT_STYLES.body, wordWrap: { width: width - 160 } })
      .setDepth(DEPTH.OVERLAY)
    this.add
      .text(width - 80, height - 70, 'N / Esc: đóng', TEXT_STYLES.small)
      .setOrigin(1, 0)
      .setDepth(DEPTH.OVERLAY)

    this.input.keyboard?.on('keydown-N', () => this.close())
    this.input.keyboard?.on('keydown-ESC', () => this.close())
    this.selectTab(this.activeTab)
  }

  selectTab(tabId) {
    this.activeTab = tabId
    NOTEBOOK_TABS.forEach((tab, index) =>
      this.tabButtons[index].setAlpha(tab.id === tabId ? 1 : 0.5),
    )
    const entries = getRuntime(this).session.notebook[tabId]
    // PENDING(ISS-06): cách hiển thị chi tiết từng loại entry
    this.content.setText(
      entries.length === 0
        ? '(Chưa có mục nào)'
        : entries.map((entry) => `• ${entry.title ?? entry.id}`).join('\n'),
    )
  }

  close() {
    this.scene.stop()
    if (this.returnTo) this.scene.resume(this.returnTo)
  }
}
