import Phaser from 'phaser'
import { env } from '@/config/env'
import { createLogger } from '@/shared/logger/logger'
import { GAME_EVENTS } from '../constants/gameEvents'
import { ROOM_MOVEMENT } from '../constants/gameplay'
import { SCENE_KEYS } from '../constants/sceneKeys'
import { EventBus } from '../core/EventBus'
import { getRuntime } from '../core/runtime'
import { FIRST_ROOM_ID, ROOMS, entrancePoint, roomBackground } from '../data/rooms'
import { getInspectLines } from '../data/rooms/inspectContent'
import { isStoryMapNode, openingMapObjective, storyMapHotspots } from '../data/storyMap'
import { suspectPortrait } from '../data/suspectPortraits'
import { Player } from '../entities/Player'
import { footAt } from '../systems/depthScale'
import { buildGrid, findPath, smoothPath } from '../systems/pathfinding'
import { dialogueFontSizePx, textCharDelayMs } from '../systems/settings'
import { TUTORIAL_EVENTS, advanceTutorial, canExit, isTutorialActive } from '../systems/tutorial'
import { nearestClearPoint } from '../systems/walkArea'
import { ConfirmDialog } from '../ui/ConfirmDialog'
import { CredibilityBar } from '../ui/CredibilityBar'
import { DialogueBox } from '../ui/DialogueBox'
import { PanelButton } from '../ui/PanelButton'
import { FloorMarker, HotspotOutline, InteractPrompt, Toast, TutorialHint } from '../ui/RoomWidgets'
import { COLORS, DEPTH, TEXT_STYLES } from '../ui/theme'

const log = createLogger('RoomInvestigationScene')

/**
 * Lớp vẽ: nền 0 · đồ vật/viền 10 · nhân vật 20 + y/1000 (theo y chân) · lớp che 30 · HUD 100 · hộp thoại 200.
 * Lớp che có baseY xếp cùng thang với nhân vật (20 + baseY/1000): nhân vật đứng sau đáy vật thì bị che.
 */
const OCCLUDER_DEPTH = 30
const CHARACTER_DEPTH_BASE = 20
/** TẠM — thời gian tối/sáng màn hình khi chuyển phòng (ms). */
const ROOM_FADE_MS = 250

/**
 * Màn điều tra 2.5D Point-and-Click — Project.docx §3.2: "Người chơi điều khiển nhân vật hoặc trỏ chuột
 * tương tác với các điểm nóng (Hotspots)". Phòng nạp theo dữ liệu `data/rooms/*` (DEC-013).
 *
 * Điều khiển: ← ↑ → ↓ / W A S D hoặc bấm chuột lên sàn để đi · E / Space / Enter hoặc bấm vào đồ vật
 * để tương tác · N mở Sổ tay (lưu tiến trình nằm trong Sổ tay — DEC-013 Q-R6) · Esc bỏ qua hướng dẫn.
 * Debug (env.debug): F8 hiện vùng đi được + bấm chuột in tọa độ ra console để chỉnh dữ liệu phòng.
 *
 * data: { chapter: number, roomId?: string, entrance?: string (id phòng vừa rời — chọn chỗ xuất hiện) }
 * Cửa có `target` chuyển sang phòng khác (T-024: phòng 201 <-> hành lang).
 * PENDING(Q3–Q5, CHAPTER1_PLAN): chưa nối P1_001 (Hòa gõ cửa) — vị trí phòng chưa nằm trong file lưu.
 * PENDING (Capstone 3): Flashback Hiện tại/Quá khứ tại Chương 5 sẽ gắn vào scene này.
 */
export class RoomInvestigationScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.ROOM_INVESTIGATION)
  }

  init(data) {
    this.chapter = data?.chapter
    this.roomId = data?.roomId ?? FIRST_ROOM_ID
    this.entrance = data?.entrance ?? null
    // Scene được dựng lại (restart) khi đổi phòng -> xóa tham chiếu tới object của lần trước
    this.leaving = false
    this.player = null
    this.marker = null
    this.debugOverlay = null
  }

  create() {
    this.runtime = getRuntime(this)
    this.room = ROOMS[this.roomId]
    this.createHud()
    if (!this.room) {
      this.createPlaceholder()
      return
    }

    const { width, height } = this.scale
    const background = roomBackground(this.room, this.runtime.session.story)
    this.add
      .image(0, 0, background.key)
      .setOrigin(0)
      .setDisplaySize(width, height)
      .setDepth(DEPTH.BACKGROUND)
    for (const occluder of this.room.occluders) {
      const depth =
        occluder.baseY === undefined ? OCCLUDER_DEPTH : CHARACTER_DEPTH_BASE + occluder.baseY / 1000
      this.add
        .image(occluder.x, occluder.y, occluder.key)
        .setOrigin(0)
        .setDisplaySize(occluder.width, occluder.height)
        .setDepth(depth)
    }

    this.footAt = ([, y]) => footAt(this.room.depth, y)
    this.grid = buildGrid(this.room, this.footAt, undefined, width, height)

    const saved = this.runtime.session.player
    const start =
      saved?.roomId === this.roomId && Number.isFinite(saved.x) && Number.isFinite(saved.y)
        ? saved
        : entrancePoint(this.room, this.entrance)
    const spawn = nearestClearPoint(this.room, [start.x, start.y], this.footAt)
    this.player = new Player(this, {
      room: this.room,
      x: spawn.x,
      y: spawn.y,
      face: start.face,
      depthBase: CHARACTER_DEPTH_BASE,
    })

    this.outline = new HotspotOutline(this)
    this.prompt = new InteractPrompt(this)
    this.toast = new Toast(this)
    this.tutorialHint = new TutorialHint(this)
    this.inspectBox = null
    this.dialog = null
    this.nearHotspot = null
    this.notebookOpen = false
    this.storyMap = isStoryMapNode(this.runtime.story?.node)
    this.openingObjective = openingMapObjective(this.runtime.story?.node)
    const storySpots = storyMapHotspots(this.runtime.story ?? {})
    this.hotspots = this.storyMap ? storySpots : this.room.hotspots
    if (this.storyMap) this.createStoryMapControls(storySpots)

    this.createHotspotZones()
    this.bindInput()
    this.refreshTutorial()

    // Quay lại từ Sổ tay: xóa phím đang "dính" và ghi nhận bước tutorial
    // this.events tồn tại qua các lần restart -> gỡ listener khi tắt scene để không bị gọi lặp
    const onResume = () => this.onResume()
    this.events.on(Phaser.Scenes.Events.RESUME, onResume)
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.events.off(Phaser.Scenes.Events.RESUME, onResume)
      this.player?.destroy()
    })
    this.cameras.main.fadeIn(ROOM_FADE_MS, 0, 0, 0)
  }

  createStoryMapControls(spots) {
    for (const spot of spots) {
      if (!spot.name) continue
      if (spot.suspect) {
        const { portrait, portraitFrame } = suspectPortrait(spot.suspect)
        const [x, y] = spot.stand
        this.add
          .rectangle(x, y - 83, 52, 52, COLORS.panel)
          .setStrokeStyle(2, COLORS.panelBorder)
          .setDepth(DEPTH.HUD)
        this.add
          .image(x, y - 83, portrait, portraitFrame)
          .setDisplaySize(48, 48)
          .setDepth(DEPTH.HUD + 1)
      }
      this.add
        .text(spot.stand[0], spot.stand[1] - 55, spot.name, {
          ...TEXT_STYLES.body,
          color: COLORS.textHex,
          backgroundColor: '#241f2b',
          padding: { x: 6, y: 2 },
        })
        .setOrigin(0.5)
        .setDepth(DEPTH.HUD)
    }
    if (this.openingObjective) return
    const button = new PanelButton(this, {
      y: 62,
      label: this.runtime.t('story.investigate'),
      onClick: () => {
        if (!this.isBusy()) this.openStory({ mapMenu: true })
      },
    })
    button.setX(this.scale.width - button.width - 24).setDepth(DEPTH.HUD)
  }

  // ---------- HUD & dự phòng ----------

  createHud() {
    const { width } = this.scale
    const runtime = this.runtime
    // Nền tối mờ sau HUD: ảnh phòng sáng màu làm chữ nhỏ khó đọc
    this.add
      .rectangle(14, 10, 260, 46, COLORS.background, 0.72)
      .setOrigin(0)
      .setRounded(8)
      .setDepth(DEPTH.HUD - 1)
    const credibilityBar = new CredibilityBar(this, 24, 16, runtime.session.credibility, (value) =>
      runtime.t('hud.credibility', { value }),
    )
    const hint = env.debug
      ? `${runtime.t('room.hint')}   ${runtime.t('room.debugHint')}`
      : runtime.t('room.hint')
    // Giữa phía trên (góc trên phải dành cho Debug Overlay khi chạy dev)
    const hintText = this.add
      .text(width / 2, 22, hint, { ...TEXT_STYLES.small, color: COLORS.textHex })
      .setOrigin(0.5, 0)
      .setDepth(DEPTH.HUD)
    this.add
      .rectangle(width / 2, 12, hintText.width + 24, hintText.height + 20, COLORS.background, 0.72)
      .setOrigin(0.5, 0)
      .setRounded(8)
      .setDepth(DEPTH.HUD - 1)

    const onCredibilityChanged = ({ value }) => credibilityBar.setValue(value)
    EventBus.on(GAME_EVENTS.CREDIBILITY_CHANGED, onCredibilityChanged)
    // Gỡ listener khi rời scene -> tránh rò rỉ và gọi vào object đã hủy
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () =>
      EventBus.off(GAME_EVENTS.CREDIBILITY_CHANGED, onCredibilityChanged),
    )
  }

  /** Phòng chưa có dữ liệu/asset (ISS-27) -> nền tạm như trước. */
  createPlaceholder() {
    const { width, height } = this.scale
    this.add.rectangle(0, 0, width, height, COLORS.panel).setOrigin(0).setDepth(DEPTH.BACKGROUND)
    this.add
      .text(
        width / 2,
        height / 2,
        this.runtime.t('room.placeholder', { chapter: this.chapter }),
        TEXT_STYLES.heading,
      )
      .setOrigin(0.5)
      .setDepth(DEPTH.BACKGROUND)
    this.input.keyboard?.on('keydown-N', () => this.openNotebook())
  }

  // ---------- Nhập liệu ----------

  bindInput() {
    const keyboard = this.input.keyboard
    if (keyboard) {
      this.keys = keyboard.addKeys('UP,DOWN,LEFT,RIGHT,W,A,S,D')
      keyboard.on('keydown-E', () => this.onInteractKey())
      keyboard.on('keydown-SPACE', () => this.onInteractKey())
      keyboard.on('keydown-ENTER', () => this.onInteractKey())
      keyboard.on('keydown-N', () => {
        if (!this.isBusy()) this.openNotebook()
      })
      keyboard.on('keydown-M', () => {
        if (this.storyMap && !this.openingObjective && !this.isBusy())
          this.openStory({ mapMenu: true })
      })
      keyboard.on('keydown-ESC', () => this.onEscape())
      if (env.debug) keyboard.on('keydown-F8', () => this.toggleDebugOverlay())
    }

    // Bấm chuột lên sàn (không trúng đồ vật) -> tìm đường đi tới
    this.input.on('pointerup', (pointer, currentlyOver) => {
      if (this.debugOverlay)
        log.debug(`Tọa độ: [${Math.round(pointer.x)}, ${Math.round(pointer.y)}]`)
      if (this.inspectBox) {
        this.onInteractKey()
        return
      }
      if (this.isBusy() || currentlyOver.length > 0) return
      this.walkToPoint({ x: pointer.x, y: pointer.y })
    })
  }

  /** Vector phím đã chuẩn hóa (đi chéo không nhanh hơn). */
  readKeyVector() {
    if (!this.keys || this.isBusy()) return { x: 0, y: 0 }
    const k = this.keys
    const x = (k.RIGHT.isDown || k.D.isDown ? 1 : 0) - (k.LEFT.isDown || k.A.isDown ? 1 : 0)
    const y = (k.DOWN.isDown || k.S.isDown ? 1 : 0) - (k.UP.isDown || k.W.isDown ? 1 : 0)
    const length = Math.hypot(x, y)
    return length === 0 ? { x: 0, y: 0 } : { x: x / length, y: y / length }
  }

  isBusy() {
    return Boolean(this.inspectBox || this.dialog || this.leaving)
  }

  // ---------- Vòng lặp ----------

  update(time, delta) {
    if (!this.player) return
    // Giới hạn delta khi tab bị treo lâu -> không "nhảy cóc" (walkArea vẫn chia bước nhỏ)
    this.player.update(Math.min(delta, 50), this.readKeyVector())
    if (this.runtime.session.story && !this.leaving) this.rememberPosition()
    this.updateNearbyHotspot(time)
    this.checkMarker()
  }

  updateNearbyHotspot(time) {
    let nearest = null
    let nearestDistance = ROOM_MOVEMENT.INTERACT_RADIUS
    for (const hotspot of this.hotspots) {
      const [sx, sy] = hotspot.stand
      const distance = Math.hypot(this.player.x - sx, this.player.y - sy)
      if (distance <= nearestDistance) {
        nearest = hotspot
        nearestDistance = distance
      }
    }
    this.nearHotspot = this.isBusy() ? null : nearest

    const tutorial = this.runtime.session.tutorial
    const showAll = isTutorialActive(tutorial) && tutorial.step === 'interact'
    const rects = this.openingObjective
      ? this.hotspots.map((hotspot) => hotspot.rect)
      : showAll
        ? this.room.hotspots.filter((h) => h.action === 'inspect').map((h) => h.rect)
        : []
    this.outline.draw(rects, this.nearHotspot?.rect ?? null, time)

    if (this.nearHotspot) {
      const label =
        this.nearHotspot.promptKey ??
        (this.nearHotspot.action === 'exit' ? 'interact.exit' : 'interact.inspect')
      this.prompt.showAt(
        this.player.x,
        this.player.headY - 30,
        this.nearHotspot.label ?? this.runtime.t(label),
      )
    } else {
      this.prompt.hide()
    }
  }

  // ---------- Đi lại ----------

  walkToPoint(target, onArrive = null) {
    const path = findPath(this.grid, this.player, target)
    if (!path) return
    const smooth = smoothPath(this.room, this.player, path, this.footAt, target)
    this.player.walkTo(smooth, onArrive)
  }

  createHotspotZones() {
    for (const hotspot of this.hotspots) {
      const [x, y, w, h] = hotspot.rect
      const zone = this.add.zone(x, y, w, h).setOrigin(0).setDepth(DEPTH.HOTSPOT)
      zone.setInteractive({ useHandCursor: true })
      zone.on('pointerup', () => {
        if (this.isBusy()) return
        const [sx, sy] = hotspot.stand
        const interact = () => {
          this.player.face(hotspot.face)
          this.activateHotspot(hotspot)
        }
        if (
          hotspot.choiceIndex !== undefined &&
          Math.hypot(this.player.x - sx, this.player.y - sy) <= ROOM_MOVEMENT.INTERACT_RADIUS
        ) {
          this.player.stop()
          interact()
          return
        }
        this.walkToPoint({ x: sx, y: sy }, interact)
      })
    }
  }

  // ---------- Tương tác ----------

  onInteractKey() {
    if (this.dialog) return // hộp xác nhận tự xử lý phím
    if (this.inspectBox) {
      if (this.inspectBox.isTyping) this.inspectBox.completeTyping()
      else this.nextInspectLine()
      return
    }
    if (this.nearHotspot) {
      this.player.stop()
      this.player.face(this.nearHotspot.face)
      this.activateHotspot(this.nearHotspot)
    }
  }

  activateHotspot(hotspot) {
    if (hotspot.choiceIndex !== undefined) {
      this.rememberPosition()
      if (this.runtime.story.choose(hotspot.choiceIndex)) this.openStory({ entrance: this.roomId })
      return
    }
    if (hotspot.action === 'exit') {
      this.tryExit(hotspot)
      return
    }
    this.openInspect(hotspot)
  }

  /**
   * Xem đồ vật. Lời lấy từ file nội dung của phòng (vd public/assets/dialogues/room201-inspect.json,
   * khóa = id hotspot) — nhóm tự điền (DEC-013 Q-R3). Chưa có -> hiện "[Chờ nội dung]", không tự viết.
   * Nhiều câu: E / Space / Enter / bấm chuột để sang câu sau; hết câu thì đóng.
   */
  openInspect(hotspot) {
    const settings = this.runtime.settings.get()
    this.inspectBox = new DialogueBox(this, {
      charDelayMs: textCharDelayMs(settings),
      fontSize: dialogueFontSizePx(settings),
    })
    const content = this.room.inspectContent
      ? this.cache.json.get(this.room.inspectContent.key)
      : null
    const lines = getInspectLines(content, hotspot.id)
    this.inspectSpeaker = this.runtime.t(hotspot.nameKey)
    this.inspectLines = lines.length > 0 ? lines : [this.runtime.t('interact.pending')]
    this.inspectIndex = 0
    this.inspectBox.showLine({ speaker: this.inspectSpeaker, text: this.inspectLines[0] })
    this.prompt.hide()
    this.advanceTutorial(TUTORIAL_EVENTS.INSPECTED)
  }

  nextInspectLine() {
    this.inspectIndex += 1
    if (this.inspectIndex >= this.inspectLines.length) {
      this.closeInspect()
      return
    }
    this.inspectBox.showLine({
      speaker: this.inspectSpeaker,
      text: this.inspectLines[this.inspectIndex],
    })
  }

  closeInspect() {
    this.inspectBox?.destroy()
    this.inspectBox = null
    this.inspectLines = null
  }

  /** Ra cửa: sang phòng `hotspot.target.roomId` (tối màn hình rồi dựng lại scene với phòng mới). */
  tryExit(hotspot) {
    const session = this.runtime.session
    if (!canExit(session.tutorial)) {
      this.toast.show(this.runtime.t('room201.exitLocked'))
      return
    }
    const targetId = hotspot.target?.roomId
    if (!targetId || !ROOMS[targetId]) {
      log.warn(`Cửa ${hotspot.id} chưa có phòng đích hợp lệ: ${targetId}`)
      this.toast.show(this.runtime.t('interact.pending'))
      return
    }
    this.advanceTutorial(TUTORIAL_EVENTS.EXITED)
    if (session.story && !this.runtime.story) {
      this.openStory()
      return
    }
    this.leaving = true
    this.player.stop()
    this.prompt.hide()
    this.cameras.main.fadeOut(ROOM_FADE_MS, 0, 0, 0)
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.restart({
        chapter: this.chapter ?? session.chapter,
        roomId: targetId,
        entrance: this.room.id,
      })
    })
  }

  // ---------- Sổ tay ----------

  openNotebook() {
    this.rememberPosition()
    const runner = this.runtime.story
    const notebook = runner?.choices().find(({ targetNode }) => targetNode === 'P3_NOTEBOOK')
    if (notebook && runner.choose(notebook.index)) {
      this.openStory()
      return
    }
    this.player?.stop()
    this.notebookOpen = true
    this.scene.launch(SCENE_KEYS.NOTEBOOK, { returnTo: this.scene.key })
    this.scene.pause()
  }

  rememberPosition() {
    if (!this.player) return
    const session = this.runtime.session
    if (session.player?.roomId !== this.roomId) session.player = { roomId: this.roomId }
    session.player.x = this.player.x
    session.player.y = this.player.y
    session.player.face = this.player.facing
  }

  openStory(data = {}) {
    if (data.mapMenu) this.rememberPosition()
    this.leaving = true
    this.player.stop()
    this.scene.start(SCENE_KEYS.STORY, data)
  }

  onResume() {
    this.input.keyboard?.resetKeys()
    if (this.notebookOpen) {
      this.notebookOpen = false
      this.advanceTutorial(TUTORIAL_EVENTS.NOTEBOOK_CLOSED)
    }
  }

  // ---------- Tutorial ----------

  advanceTutorial(event) {
    const session = this.runtime.session
    const next = advanceTutorial(session.tutorial, event)
    if (next === session.tutorial) return
    session.tutorial = next // nằm trong file lưu (DEC-013 Q-R9)
    this.refreshTutorial()
  }

  refreshTutorial() {
    const tutorial = this.runtime.session.tutorial
    const t = (key) => this.runtime.t(key)
    if (!isTutorialActive(tutorial)) {
      const objective =
        this.openingObjective ??
        (this.runtime.story?.node?.id === 'P1_HUB_MENU' ? 'story.objective.interviews' : null)
      if (objective) {
        this.tutorialHint.show({
          title: t('story.objective.title'),
          body: t(objective),
          footer: t('story.objective.interact'),
        })
      } else {
        this.tutorialHint.hide()
      }
      this.marker?.destroy()
      this.marker = null
      return
    }
    this.tutorialHint.show({
      title: t('tutorial.title'),
      body: t(`tutorial.${tutorial.step}`),
      footer: t('tutorial.skipHint'),
    })
    if (tutorial.step === 'move' && !this.marker && this.room.tutorialMarker) {
      const { x, y } = this.room.tutorialMarker
      this.marker = new FloorMarker(this, x, y, ROOM_MOVEMENT.MARKER_RADIUS)
    } else if (tutorial.step !== 'move' && this.marker) {
      this.marker.destroy()
      this.marker = null
    }
  }

  checkMarker() {
    if (!this.marker) return
    const distance = Math.hypot(this.player.x - this.marker.x, this.player.y - this.marker.y)
    if (distance <= ROOM_MOVEMENT.MARKER_RADIUS)
      this.advanceTutorial(TUTORIAL_EVENTS.REACHED_MARKER)
  }

  onEscape() {
    if (this.dialog) return
    if (this.inspectBox) {
      this.closeInspect()
      return
    }
    if (!isTutorialActive(this.runtime.session.tutorial)) return
    const t = (key) => this.runtime.t(key)
    this.player.stop()
    this.dialog = new ConfirmDialog(this, {
      title: t('tutorial.skip.title'),
      body: t('tutorial.skip.body'),
      confirmLabel: t('tutorial.skip.ok'),
      cancelLabel: t('confirm.cancel'),
      onConfirm: () => {
        this.dialog = null
        this.advanceTutorial(TUTORIAL_EVENTS.SKIPPED)
        if (this.runtime.session.story && !this.runtime.story) this.openStory()
      },
      onCancel: () => {
        this.dialog = null
      },
    })
  }

  // ---------- Debug ----------

  /** F8 (chỉ khi env.debug): vẽ vùng đi được, ô lưới, vật cản, đồ vật, điểm đứng. */
  toggleDebugOverlay() {
    if (this.debugOverlay) {
      this.debugOverlay.destroy()
      this.debugOverlay = null
      return
    }
    const g = this.add.graphics().setDepth(DEPTH.DEBUG)
    const { cell, cols, rows, open } = this.grid
    g.fillStyle(0x3cc85a, 0.18)
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        if (open[r * cols + c]) g.fillRect(c * cell + 1, r * cell + 1, cell - 2, cell - 2)
      }
    }
    const strokePolygon = (points, color) => {
      g.lineStyle(2, color, 1)
      g.strokePoints(
        points.map(([x, y]) => ({ x, y })),
        true,
      )
    }
    strokePolygon(this.room.walkArea, 0x3cc85a)
    for (const obstacle of this.room.obstacles) strokePolygon(obstacle, 0xd9534f)
    for (const hotspot of this.room.hotspots) {
      const [x, y, w, h] = hotspot.rect
      g.lineStyle(1, 0xf2b84b, 1).strokeRect(x, y, w, h)
      g.fillStyle(0xf2b84b, 1).fillCircle(hotspot.stand[0], hotspot.stand[1], 4)
    }
    this.debugOverlay = g
  }
}
