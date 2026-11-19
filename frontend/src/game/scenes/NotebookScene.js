import Phaser from 'phaser'
import { GAME_EVENTS } from '../constants/gameEvents'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { EventBus } from '../core/EventBus'
import { getRuntime } from '../core/runtime'
import { onSceneEnd } from '../core/sceneLifecycle'
import { NOTEBOOK_TABS, notebookSourceKey } from '../systems/notebook'
import {
  timelineGroups,
  timelineSourceLabel,
  timelineSources,
  timelineSourceSummary,
  timelineStatus,
  timelineTitle,
} from '../systems/timeline'
import { ChoiceMenu } from '../ui/ChoiceMenu'
import { EvidenceDetailView } from '../ui/EvidenceDetailView'
import { PanelButton } from '../ui/PanelButton'
import { TextButton } from '../ui/TextButton'
import { COLORS, DEPTH, TEXT_STYLES, menuTextStyle } from '../ui/theme'

const SURVEY_NOTE_ID = 'OBS_P2_SURVEY'

function entryProvenance(entry, runtime) {
  const sourceKey = notebookSourceKey(entry)
  return [
    sourceKey ? runtime.t('notebook.provenance', { source: runtime.t(sourceKey) }) : null,
    entry.collected_phase ? runtime.t('notebook.phase', { phase: entry.collected_phase }) : null,
  ]
    .filter(Boolean)
    .join(' · ')
}

/**
 * Sổ tay điều tra 4 tab — Project.docx §3.2 (Evidence, People, Timeline, Statements).
 * Chạy chồng lên scene điều tra (launch + pause). N hoặc Esc để đóng.
 * Lưu tiến trình nằm ở đây (DEC-013 Q-R6: lưu game thiết kế trong Sổ tay, bỏ phím tắt S):
 * bấm "Lưu tiến trình" -> runtime.saveNow() -> React lưu -> báo lại qua SAVE_RESULT.
 * data: { returnTo: string } — key scene cần resume khi đóng.
 */
export class NotebookScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.NOTEBOOK)
  }

  init(data) {
    this.returnTo = data.returnTo
    this.onClose = data.onClose
    this.onPress = data.onPress
    this.canPress = data.canPress
    this.activeTab = NOTEBOOK_TABS[0].id
    this.entry = null
    this.history = false
    this.conversation = null
    this.menu = null
    this.detailControls = []
    this.timelineGroup = 'timed'
    this.timelineOrigin = null
  }

  create() {
    const { width, height } = this.scale
    this.add
      .rectangle(40, 40, width - 80, height - 80, COLORS.background, 0.97)
      .setOrigin(0)
      .setStrokeStyle(2, COLORS.panelBorder)
      .setDepth(DEPTH.OVERLAY)

    this.tabButtons = NOTEBOOK_TABS.map((tab, index) =>
      new TextButton(
        this,
        160 + index * 205,
        90,
        getRuntime(this).t(`notebook.tab.${tab.id}`),
        () => this.selectTab(tab.id),
      ).setDepth(DEPTH.OVERLAY),
    )
    this.content = this.add
      .text(80, 150, '', { ...TEXT_STYLES.body, wordWrap: { width: width - 160 } })
      .setDepth(DEPTH.OVERLAY)
    if (getRuntime(this).session.story) {
      new PanelButton(this, {
        x: 950,
        y: 68,
        label: getRuntime(this).t('notebook.history'),
        onClick: () => this.showHistory(),
      }).setDepth(DEPTH.OVERLAY)
    }
    this.closeHint = this.add
      .text(width - 80, height - 70, getRuntime(this).t('notebook.close'), TEXT_STYLES.small)
      .setOrigin(1, 0)
      .setDepth(DEPTH.OVERLAY)

    this.createSaveControls()
    this.input.keyboard?.on('keydown-N', () => this.close())
    this.input.keyboard?.on('keydown-ESC', (event) => {
      if (event.repeat) return
      event.stopPropagation()
      this.back()
    })
    this.input.keyboard?.on('keydown-UP', () => this.menu?.move(-1))
    this.input.keyboard?.on('keydown-DOWN', () => this.menu?.move(1))
    this.input.keyboard?.on('keydown-ENTER', (event) => {
      if (!event.repeat) this.menu?.select()
    })
    this.selectTab(this.activeTab)
  }

  createSaveControls() {
    const { height } = this.scale
    const runtime = getRuntime(this)
    const saveButton = new PanelButton(this, {
      x: 80,
      y: height - 112,
      label: runtime.t('notebook.save'),
      variant: 'primary',
      onClick: () => {
        const sent = runtime.saveNow()
        this.saveStatus.setText(
          sent ? runtime.t('notebook.saving') : runtime.t('notebook.saveFailed', { message: '—' }),
        )
      },
    }).setDepth(DEPTH.OVERLAY)
    this.saveStatus = this.add
      .text(saveButton.x + saveButton.width + 16, height - 90, '', menuTextStyle({ size: 14 }))
      .setColor(COLORS.mutedHex)
      .setOrigin(0, 0.5)
      .setDepth(DEPTH.OVERLAY)

    const onResult = ({ ok, remote, message } = {}) => {
      if (!this.saveStatus?.active) return
      const text = !ok
        ? runtime.t('notebook.saveFailed', { message: message ?? '' })
        : runtime.t(remote ? 'notebook.savedRemote' : 'notebook.savedLocal')
      this.saveStatus.setText(text)
    }
    EventBus.on(GAME_EVENTS.SAVE_RESULT, onResult)
    onSceneEnd(this, () => EventBus.off(GAME_EVENTS.SAVE_RESULT, onResult))
  }

  selectTab(tabId) {
    this.clearDetails()
    this.activeTab = tabId
    this.history = false
    NOTEBOOK_TABS.forEach((tab, index) =>
      this.tabButtons[index].setAlpha(tab.id === tabId ? 1 : 0.5),
    )
    const runtime = getRuntime(this)
    const state = runtime.session.story
    if (state || tabId === 'evidence') {
      const group = tabId === 'evidence' ? 'evidence_records' : tabId
      const records = state?.[group] ?? {}
      const entries = [
        ...Object.values(records),
        ...runtime.session.notebook[tabId].filter((entry) => !Object.hasOwn(records, entry.id)),
      ]
      if (tabId === 'timeline') return this.showTimeline(entries)
      if (!entries.length) this.content.setText(runtime.t('notebook.empty'))
      this.menu = new ChoiceMenu(
        this,
        entries.map((entry) => ({
          text: this.entryTitle(entry),
          onSelect: () => this.showEntry(entry),
        })),
        { y: 167 },
      )
      return
    }
    const entries = runtime.session.notebook[tabId]
    if (tabId === 'timeline') return this.showTimeline(entries)
    this.content.setText(
      entries.length === 0
        ? runtime.t('notebook.empty')
        : entries.map((entry) => `• ${entry.title ?? entry.id}`).join('\n'),
    )
  }

  entryTitle(entry) {
    if (this.activeTab === 'statements') {
      const speaker =
        { HOA: 'Hòa', LINH: 'Linh', HAO: 'Hào', MINH: 'Minh', POLICE: 'Cảnh sát' }[entry.speaker] ??
        entry.speaker
      return [speaker, entry.text ?? entry.title ?? entry.id].filter(Boolean).join(' · ')
    }
    return entry.name ?? entry.title ?? entry.display_time ?? entry.text ?? entry.id
  }

  showTimeline(entries, selectedGroup = this.timelineGroup) {
    this.clearDetails()
    const runtime = getRuntime(this)
    const t = (key, params) => runtime.t(key, params)
    const groups = Object.entries(timelineGroups(entries)).filter(([, rows]) => rows.length)
    if (!groups.length) {
      this.content.setText(t('notebook.empty'))
      return
    }
    const [group, records] = groups.find(([key]) => key === selectedGroup) ?? groups[0]
    this.timelineGroup = group
    groups.forEach(([key, rows], index) => {
      this.detailControls.push(
        new TextButton(
          this,
          245 + index * 380,
          150,
          `${t(`notebook.timeline.${key}`)} (${rows.length})`,
          () => this.showTimeline(entries, key),
          menuTextStyle({ size: 18 }),
        )
          .setAlpha(key === group ? 1 : 0.5)
          .setDepth(DEPTH.OVERLAY),
      )
    })
    this.menu = new ChoiceMenu(
      this,
      records.map((entry) => {
        const title = timelineTitle(entry, t)
        const heading = group === 'timed' ? `${entry.display_time} — ${title}` : title
        return {
          text: `${heading}\n${timelineSourceSummary(entry, runtime.session.story, t)} · ${timelineStatus(entry, t, runtime.session.story)}`,
          onSelect: () => this.showTimelineEntry(entry),
        }
      }),
      { y: 190, rowHeight: 76, rowsPerPage: 4 },
    )
  }

  showTimelineEntry(entry) {
    this.clearDetails()
    this.entry = entry
    const runtime = getRuntime(this)
    const t = (key, params) => runtime.t(key, params)
    const sources = timelineSources(entry, runtime.session.story)
    this.content.setText(
      [
        timelineTitle(entry, t),
        entry.display_time ?? t('notebook.timeline.timeUnknown'),
        timelineStatus(entry, t, runtime.session.story),
        timelineSourceSummary(entry, runtime.session.story, t),
        entryProvenance(entry, runtime),
      ]
        .filter(Boolean)
        .join('\n\n'),
    )
    this.detailButton(80, 'story.back', () => this.selectTab('timeline'))
    if (sources.length) {
      this.detailButton(
        260,
        'notebook.timeline.viewSources',
        () => this.showTimelineSources(entry),
        {
          count: sources.length,
        },
      )
    }
  }

  showTimelineSources(entry) {
    this.clearDetails()
    this.timelineOrigin = entry
    const runtime = getRuntime(this)
    this.content.setText(timelineTitle(entry, (key) => runtime.t(key)))
    this.menu = new ChoiceMenu(
      this,
      timelineSources(entry, runtime.session.story).map((source) => ({
        text: timelineSourceLabel(source, (key, params) => runtime.t(key, params)),
        onSelect: () => this.showEntry(source, { fromTimeline: entry }),
      })),
      { y: 230 },
    )
    this.detailButton(80, 'story.back', () => this.showTimelineEntry(entry))
  }

  showEntry(entry, { fromTimeline = null } = {}) {
    this.clearDetails()
    this.entry = entry
    this.timelineOrigin = fromTimeline
    const runtime = getRuntime(this)
    const state = runtime.session.story
    const title = fromTimeline
      ? timelineSourceLabel(entry, (key, params) => runtime.t(key, params))
      : this.entryTitle(entry)
    const replacement = state?.statements[entry.superseded_by]
    const sources = (entry.source_ids ?? [])
      .map((id) => {
        const source =
          state?.statements[id] ?? state?.evidence_records[id] ?? state?.observations[id]
        return source?.name ?? source?.text
      })
      .filter(Boolean)
    const observations = new Set(entry.observations ?? [])
    if (entry.id === 'PEO_TUNG') observations.add(SURVEY_NOTE_ID)
    const related = [...observations].map((id) => state?.observations[id]).filter(Boolean)
    const statusKey = `notebook.status.${entry.status}`
    const status = runtime.t(statusKey)
    const provenance = entryProvenance(entry, runtime)
    const description = entry.text && !title.includes(entry.text) ? entry.text : null
    const details = [
      entry.role,
      entry.scope,
      entry.corroborated_scope,
      entry.status ? (status === statusKey ? entry.status : status) : null,
      replacement ? runtime.t('notebook.replacement', { text: replacement.text }) : null,
      ...sources,
      ...related.map((record) =>
        [record.text, entryProvenance(record, runtime)].filter(Boolean).join('\n'),
      ),
    ]
    if (this.activeTab === 'evidence') {
      this.closeHint.setText(runtime.t('notebook.evidenceControls'))
      this.detailControls.push(
        new EvidenceDetailView(this, {
          id: entry.id,
          title,
          provenance,
          text: [description ?? entry.description, ...details].filter(Boolean).join('\n\n'),
          settings: runtime.settings.get(),
        }),
      )
    } else {
      this.content.setText(
        [title, provenance, description, fromTimeline ? entry.description : null, ...details]
          .filter(Boolean)
          .join('\n\n'),
      )
    }
    this.detailButton(80, 'story.back', () =>
      fromTimeline ? this.showTimelineSources(fromTimeline) : this.selectTab(this.activeTab),
    )
    if (this.activeTab === 'statements' && this.canPress?.(entry.id)) {
      this.detailButton(230, 'story.press', () => {
        if (this.onPress(entry.id)) this.close(false)
      })
    }
  }

  showHistory() {
    this.clearDetails()
    this.history = true
    this.tabButtons.forEach((tab) => tab.setAlpha(0.5))
    const runtime = getRuntime(this)
    const history = runtime.session.story.conversation_history ?? []
    if (!history.length) this.content.setText(runtime.t('notebook.empty'))
    this.menu = new ChoiceMenu(
      this,
      history.map((conversation, index) => ({
        text: runtime.t('notebook.conversation', {
          index: index + 1,
          speaker: conversation[0].speaker,
        }),
        onSelect: () => this.showConversation(conversation, 0),
      })),
      { y: 167 },
    )
  }

  showConversation(conversation, index) {
    this.clearDetails()
    this.conversation = conversation
    const { speaker, text } = conversation[index]
    this.content.setText(
      `${index + 1} / ${conversation.length}\n\n${speaker}\n\n${text.replaceAll('**', '')}`,
    )
    this.detailButton(80, 'story.back', () => this.showHistory())
    if (index > 0)
      this.detailButton(230, 'notebook.previous', () =>
        this.showConversation(conversation, index - 1),
      )
    if (index + 1 < conversation.length)
      this.detailButton(405, 'story.continue', () => this.showConversation(conversation, index + 1))
  }

  detailButton(x, key, onClick, params) {
    this.detailControls.push(
      new PanelButton(this, {
        x,
        y: 545,
        label: getRuntime(this).t(key, params),
        onClick,
      }).setDepth(DEPTH.OVERLAY),
    )
  }

  clearDetails() {
    this.content.setText('')
    this.closeHint.setText(getRuntime(this).t('notebook.close'))
    this.entry = null
    this.timelineOrigin = null
    this.conversation = null
    this.menu?.destroy()
    this.menu = null
    this.detailControls.forEach((button) => button.destroy())
    this.detailControls = []
  }

  back() {
    if (this.timelineOrigin) {
      if (this.entry) this.showTimelineSources(this.timelineOrigin)
      else this.showTimelineEntry(this.timelineOrigin)
    } else if (this.conversation) this.showHistory()
    else if (this.entry || this.history) this.selectTab(this.activeTab)
    else this.close()
  }

  close(advance = true) {
    if (advance) this.onClose?.()
    this.scene.stop()
    if (this.returnTo) this.scene.resume(this.returnTo)
  }
}
