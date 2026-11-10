import { stepSelection } from '../systems/menuNavigation'
import { PanelButton } from './PanelButton'
import { COLORS, DEPTH, menuTextStyle } from './theme'

const ROWS_PER_PAGE = 6

/** Danh sách lựa chọn dài dùng chung cho hội thoại, lời khai, vật chứng và nguồn suy luận. */
export class ChoiceMenu {
  constructor(scene, rows, { x = 80, y = 270, width = 1120 } = {}) {
    this.scene = scene
    this.rows = rows
    this.x = x
    this.y = y
    this.width = width
    this.index = 0
    this.objects = []
    this.draw()
  }

  draw() {
    this.destroy()
    const { scene, x, y, width, rows, index } = this
    const first = Math.floor(index / ROWS_PER_PAGE) * ROWS_PER_PAGE
    for (const [offset, row] of rows.slice(first, first + ROWS_PER_PAGE).entries()) {
      const rowIndex = first + offset
      const top = y + offset * 48
      const background = scene.add
        .rectangle(x, top, width, 43, rowIndex === index ? COLORS.panelBorder : COLORS.panel)
        .setOrigin(0)
        .setDepth(DEPTH.OVERLAY)
        .setInteractive({ useHandCursor: true })
      background.on('pointerup', row.onSelect)
      const text = scene.add
        .text(x + 14, top + 5, row.text, menuTextStyle({ size: 17, wrapWidth: width - 28 }))
        .setDepth(DEPTH.OVERLAY + 1)
      this.objects.push(background, text)
    }
    const end = Math.min(first + ROWS_PER_PAGE, rows.length)
    if (rows.length > ROWS_PER_PAGE) {
      const top = y + ROWS_PER_PAGE * 48
      for (const [offset, label, next] of [
        [0, '‹', first - 1],
        [145, '›', end],
      ]) {
        if (next < 0 || next >= rows.length) continue
        this.objects.push(
          new PanelButton(scene, {
            x: x + offset,
            y: top,
            label,
            onClick: () => {
              this.index = next
              this.draw()
            },
          }).setDepth(DEPTH.OVERLAY),
        )
      }
      this.objects.push(
        scene.add
          .text(x + 58, top + 10, `${first + 1}–${end}`, menuTextStyle({ size: 15 }))
          .setDepth(DEPTH.OVERLAY),
      )
    }
  }

  move(direction) {
    if (!this.rows.length) return
    this.index = stepSelection(
      this.rows.map(() => true),
      this.index,
      direction,
    )
    this.draw()
  }

  select() {
    this.rows[this.index]?.onSelect()
  }

  destroy() {
    this.objects.forEach((object) => object.destroy())
    this.objects = []
  }
}
