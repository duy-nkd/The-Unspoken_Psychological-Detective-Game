import Phaser from 'phaser'
import { TYPEWRITER } from '../constants/gameplay'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { getRuntime } from '../core/runtime'
import { CHAPTER_DATA } from '../data/chapters'
import { ROOMS, roomBackground } from '../data/rooms'
import { ROOM_204_NECK_PHOTO } from '../data/rooms/room204'
import { storyLine } from '../data/speakers'
import { isStoryMapNode, storyMapHotspots } from '../data/storyMap'
import { dialogueFontSizePx, textCharDelayMs } from '../systems/settings'
import { CharacterStage } from '../ui/CharacterStage'
import { ChoiceMenu } from '../ui/ChoiceMenu'
import { CredibilityBar } from '../ui/CredibilityBar'
import { DialogueBox } from '../ui/DialogueBox'
import { PanelButton } from '../ui/PanelButton'
import { COLORS, DEPTH, menuTextStyle } from '../ui/theme'

function closingChecklist(state, t) {
  const { flags, evidence_collected: evidence } = state
  const pending = [
    [!flags.minh_debt_detail_recorded || !flags.minh_hostage_detail_recorded, 'minh'],
    [
      !evidence.includes('EV_BoundaryCoin') ||
        !flags.coin_memory_recognized ||
        !flags.coin_function_statement_recorded,
      'coin',
    ],
    [
      !flags.survey_seen || !flags.tung_survey_account_recorded || !flags.tung_warning_recorded,
      'survey',
    ],
    [!evidence.includes('EV_KhangCertificate'), 'certificate'],
  ]
  return {
    speaker: t('story.closingChecklist'),
    text: pending
      .filter(([missing]) => missing)
      .map(([, key]) => `• ${t(`story.closingChecklist.${key}`)}`)
      .join('\n'),
  }
}

export class StoryScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.STORY)
  }

  init({ mapMenu = false, entrance = null } = {}) {
    this.mapMenu = mapMenu
    this.entrance = entrance
    this.statement = null
    this.pickingEvidence = false
    this.activeSlot = null
    this.view = []
    this.menu = null
    this.advanceLine = null
    this.autoTimer = null
  }

  create() {
    this.runtime = getRuntime(this)
    const { files } = CHAPTER_DATA[1]
    this.runner = this.runtime.startStory(this.cache.json.get(files.graph.key))
    this.characterStage = new CharacterStage(this, { closeMouthAtPunctuation: true })
    this.evidenceNames = new Map(
      this.cache.json
        .get(files.evidence.key)
        .records.map((record) => [record.id, record.name ?? record.title]),
    )
    const keyboard = this.input.keyboard
    keyboard?.on('keydown-UP', (event) => {
      if (!event.repeat) this.menu?.move(-1)
    })
    keyboard?.on('keydown-DOWN', (event) => {
      if (!event.repeat) this.menu?.move(1)
    })
    const select = (event) => {
      if (event.repeat) return
      if (this.menu) this.menu.select()
      else this.advanceLine?.()
    }
    keyboard?.on('keydown-ENTER', select)
    keyboard?.on('keydown-SPACE', select)
    keyboard?.on('keydown-N', (event) => {
      if (!event.repeat) this.openNotebook()
    })
    keyboard?.on('keydown-ESC', () => this.back())
    this.input.on('pointerup', (_pointer, over) => {
      if (!over.length) this.advanceLine?.()
    })
    this.events.on(Phaser.Scenes.Events.RESUME, this.render, this)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.events.off(Phaser.Scenes.Events.RESUME, this.render, this)
      this.clearView()
    })
    this.render()
  }

  clearView() {
    this.autoTimer?.remove(false)
    this.autoTimer = null
    this.advanceLine = null
    this.menu?.destroy()
    this.menu = null
    this.view.forEach((object) => object.destroy())
    this.view = []
  }

  render() {
    this.clearView()
    const { node, state, version } = this.runner
    if (node?.type !== 'dialogue') this.characterStage.hide()
    if (isStoryMapNode(node) && !this.mapMenu) {
      this.scene.start(SCENE_KEYS.ROOM_INVESTIGATION, {
        chapter: state.chapter,
        roomId: state.scene_location,
        entrance: this.entrance,
      })
      return
    }
    this.drawBackdrop(state.scene_location)
    if (this.runner.complete) {
      this.button(80, 640, 'story.mainMenu', () => this.scene.start(SCENE_KEYS.MAIN_MENU))
      return
    }
    if (node.type === 'notebook_view') {
      this.openNotebook(true)
      return
    }
    if (node.type === 'cross_examination') {
      this.showCrossExam(node, version)
      return
    }
    if (node.type === 'deduction') {
      this.showDeduction(version)
      return
    }
    if (node.next) {
      if (node.type === 'dialogue') this.showLine(node, version)
      else this.showNotice(node, version)
      return
    }
    const mapIndices = this.mapMenu
      ? new Set(storyMapHotspots(this.runner).map((spot) => spot.choiceIndex))
      : new Set()
    const choices = this.runner.choices().filter((choice) => !mapIndices.has(choice.index))
    this.menu = new ChoiceMenu(this, this.choiceRows(choices, version))
    if (this.mapMenu) this.button(80, 640, 'story.back', () => this.back())
  }

  drawBackdrop(roomId) {
    const { width, height } = this.scale
    const room = ROOMS[roomId]
    if (room) {
      const { key } = roomBackground(room, this.runner.state)
      this.view.push(this.add.image(0, 0, key).setOrigin(0).setDisplaySize(width, height))
    }
    this.view.push(this.add.rectangle(0, 0, width, height, COLORS.background, 0.36).setOrigin(0))
    this.view.push(
      new CredibilityBar(this, 24, 16, this.runner.state.credibility, (value) =>
        this.runtime.t('hud.credibility', { value }),
      ),
    )
  }

  choiceRows(choices, version, sourceId) {
    return choices.map(({ text, index }) => ({
      text,
      onSelect: () => {
        this.mapMenu = false
        if (this.runner.choose(index, { version, sourceId })) this.render()
      },
    }))
  }

  showLine(node, version) {
    const settings = this.runtime.settings.get()
    const box = new DialogueBox(this, {
      stage: this.characterStage,
      charDelayMs: textCharDelayMs(settings),
      fontSize: dialogueFontSizePx(settings),
      fitText: true,
      onLineComplete: () => {
        if (settings.autoAdvance) {
          this.autoTimer = this.time.delayedCall(TYPEWRITER.AUTO_ADVANCE_DELAY_MS, () =>
            this.advanceLine?.(),
          )
        }
      },
    })
    this.view.push(box)
    this.advanceLine = () => {
      if (box.isTyping) {
        box.completeTyping()
        return
      }
      if (this.runner.advance(version)) this.render()
    }
    box.showLine(storyLine(node))
    this.showNeckPhoto(node, box.y)
  }

  showNotice(node, version) {
    const record = this.runner.record
    let line = record
      ? {
          speaker: record.name ?? record.title ?? record.speaker,
          text: record.text ?? record.description,
        }
      : { text: node.text }
    if (node.predicateId === 'P4_CLOSE_READY' && node.showMissingSourcesOnly) {
      line = closingChecklist(this.runner.state, (key) => this.runtime.t(key))
    }
    const { width, height } = this.scale
    const x = 80
    const text = line.text ?? ''
    const body = this.add
      .text(
        x + 22,
        0,
        text.replaceAll('**', ''),
        menuTextStyle({
          size: 21,
          wrapWidth: width - 2 * x - 44,
        }),
      )
      .setDepth(DEPTH.OVERLAY + 1)
    const header = line.speaker
      ? this.add
          .text(x + 22, 0, line.speaker, menuTextStyle({ size: 17, color: COLORS.accentHex }))
          .setDepth(DEPTH.OVERLAY + 1)
      : null
    const headingHeight = header ? header.height + 8 : 0
    const panelHeight = headingHeight + body.height + 62
    const panelY = height - panelHeight - 32
    const panel = this.add
      .rectangle(x, panelY, width - 2 * x, panelHeight, COLORS.panel, 0.95)
      .setOrigin(0)
      .setStrokeStyle(1, COLORS.panelBorder)
      .setDepth(DEPTH.OVERLAY)
    const prompt = this.add
      .text(
        x + 22,
        panelY + panelHeight - 32,
        `${this.runtime.t('story.continue')} [Enter]`,
        menuTextStyle({ size: 14, color: COLORS.mutedHex }),
      )
      .setDepth(DEPTH.OVERLAY + 1)
    body.setY(panelY + 16 + headingHeight)
    if (header) {
      header.setY(panelY + 13)
      this.view.push(header)
    }
    this.view.push(panel, body, prompt)
    this.advanceLine = () => {
      if (this.runner.advance(version)) this.render()
    }
    this.showNeckPhoto(node, panelY)
  }

  showNeckPhoto(node, panelY) {
    if (node.id.startsWith('P2_NECK') || node.evidenceId === 'EV_NeckScratches') {
      const { key, frame, crop } = ROOM_204_NECK_PHOTO
      if (!this.textures.exists(key)) return
      const top = 66
      const height = Math.min(400, panelY - top - 16)
      this.view.push(
        this.add
          .image(this.scale.width / 2, top, key, frame)
          .setOrigin(0.5, 0)
          .setDisplaySize(height * (crop[2] / crop[3]), height)
          .setDepth(DEPTH.OVERLAY - 1),
      )
    }
  }

  showCrossExam(node, version) {
    const statement = this.statement
    const t = (key) => this.runtime.t(key)
    this.heading(statement?.text ?? node.speaker)
    if (this.pickingEvidence) {
      const { evidence_collected: ids, evidence_records: records } = this.runner.state
      this.menu = new ChoiceMenu(
        this,
        ids
          .filter((id) => records[id])
          .map((id) => ({
            text: this.evidenceNames.get(id) ?? records[id].title ?? id,
            onSelect: () => {
              if (this.runner.present(statement.id, id, version) !== null) {
                this.resetSelection()
                this.render()
              }
            },
          })),
      )
      if (!this.menu.rows.length) this.heading(t('notebook.empty'), 210)
    } else if (statement) {
      const actions = []
      if (this.runner.canPress(statement.id))
        actions.push({
          text: t('story.press'),
          onSelect: () => {
            if (this.runner.press(statement.id, version)) {
              this.resetSelection()
              this.render()
            }
          },
        })
      if (this.runner.canPresent(statement.id))
        actions.push({
          text: t('story.present'),
          onSelect: () => {
            this.pickingEvidence = true
            this.render()
          },
        })
      if (!actions.length) this.heading(t('story.noActions'), 210)
      this.menu = new ChoiceMenu(this, actions)
    } else {
      const statements = this.runner.statements().map((record) => ({
        text:
          record.status === 'superseded'
            ? `${record.text} · ${t('notebook.superseded')}`
            : record.text,
        onSelect: () => {
          this.statement = record
          this.render()
        },
      }))
      this.menu = new ChoiceMenu(this, [
        ...this.choiceRows(this.runner.choices(), version),
        ...statements,
      ])
    }
    if (statement) this.button(80, 640, 'story.back', () => this.back())
  }

  showDeduction(version) {
    const slots = this.runner.deductionSlots()
    const slot = slots.find(({ id }) => id === this.activeSlot)
    this.heading(slot?.text ?? this.runtime.t('story.deduction'))
    if (slot) {
      const select = (cardId) => {
        if (!this.runner.editDeduction(slot.id, cardId, version)) return
        this.activeSlot = null
        this.render()
      }
      const source = slot.id.startsWith('evidence/') ? slot.value : null
      const sourceChoice = this.runner
        .choices({ sourceId: source })
        .filter(({ targetNode }) => targetNode === 'FD_SOURCE')
      this.menu = new ChoiceMenu(this, [
        ...this.choiceRows(sourceChoice, version, source),
        { text: this.runtime.t('story.clearSlot'), onSelect: () => select(null) },
        ...slot.cards.map((card) => ({ text: card.text, onSelect: () => select(card.id) })),
      ])
      this.button(80, 640, 'story.back', () => this.back())
      return
    }
    this.menu = new ChoiceMenu(
      this,
      [
        ...slots.map((entry) => ({
          text: `${entry.text} · ${entry.cards.find(({ id }) => id === entry.value)?.text ?? '—'}`,
          onSelect: () => {
            this.activeSlot = entry.id
            this.render()
          },
        })),
        ...this.choiceRows(this.runner.choices(), version),
      ],
      { y: 230 },
    )
  }

  heading(text, y = 105) {
    this.view.push(
      this.add
        .text(80, y, text, menuTextStyle({ size: 24, wrapWidth: 1120 }))
        .setDepth(DEPTH.OVERLAY),
    )
  }

  button(x, y, key, onClick) {
    this.view.push(
      new PanelButton(this, { x, y, label: this.runtime.t(key), onClick }).setDepth(DEPTH.OVERLAY),
    )
  }

  openNotebook(fromNode = false) {
    const { version } = this.runner
    this.autoTimer?.remove(false)
    this.scene.launch(SCENE_KEYS.NOTEBOOK, {
      returnTo: this.scene.key,
      ...(fromNode
        ? {
            onClose: () => this.runner.advance(version),
            canPress: (id) => this.runner.canPress(id),
            onPress: (id) => this.runner.press(id, version),
          }
        : {}),
    })
    this.scene.pause()
  }

  resetSelection() {
    this.statement = null
    this.pickingEvidence = false
  }

  back() {
    if (this.pickingEvidence) this.pickingEvidence = false
    else if (this.statement) this.resetSelection()
    else if (this.activeSlot) this.activeSlot = null
    else if (this.mapMenu) this.mapMenu = false
    else return
    this.render()
  }
}
