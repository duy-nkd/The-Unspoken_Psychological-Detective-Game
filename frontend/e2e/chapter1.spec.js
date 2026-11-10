import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

const assets = new URL('../public/assets/chapters/chapter1/', import.meta.url)
const read = (file) => JSON.parse(readFileSync(new URL(file, assets), 'utf8'))
const graph = read('chapter1.json')
const evidenceNames = new Map(
  read('evidence.json').records.map((record) => [record.id, record.name ?? record.title]),
)

// Phaser vẽ trên canvas. Chỉ đọc debug để tìm vị trí, nhãn và trạng thái đồng bộ.
// Mọi thao tác chơi đều gửi chuột/phím qua Playwright.
class ChapterPlaytest {
  constructor(page) {
    this.page = page
    this.errors = []
    page.setDefaultTimeout(12_000)
    page.on('pageerror', (error) => this.errors.push(error.message))
  }

  async key(name) {
    await this.page.keyboard.press(name)
    await this.page.evaluate(() => new Promise(requestAnimationFrame))
  }

  async waitForScene(key) {
    await this.page.waitForFunction(
      (sceneKey) => window.__THE_UNSPOKEN__?.game.scene.isActive(sceneKey),
      key,
    )
  }

  node() {
    return this.page.evaluate(() => window.__THE_UNSPOKEN__.runtime.story.state.current_node)
  }

  state() {
    return this.page.evaluate(() => window.__THE_UNSPOKEN__.runtime.story.state)
  }

  dialoguePortrait() {
    return this.page.evaluate(() => {
      const { game, runtime } = window.__THE_UNSPOKEN__
      const box = game.scene.getScene('StoryScene').view.find((object) => object.portrait)
      return [runtime.story.node.speaker, box?.portrait.texture.key]
    })
  }

  hasTexture(sceneKey, textureKey, frame) {
    return this.page.evaluate(
      ({ sceneKey, textureKey, frame }) =>
        window.__THE_UNSPOKEN__.game.scene
          .getScene(sceneKey)
          .children.list.some(
            (object) =>
              object.visible &&
              object.texture?.key === textureKey &&
              (!frame || object.frame?.name === frame),
          ),
      { sceneKey, textureKey, frame },
    )
  }

  async click(x, y) {
    const box = await this.page.locator('canvas').boundingBox()
    await this.page.mouse.click(box.x + (x * box.width) / 1280, box.y + (y * box.height) / 720)
  }

  async start(withTutorial, { textSpeed = 'instant', stopAtOpening = false } = {}) {
    // Phiên giả chỉ ở trình duyệt test. Luồng lưu cục bộ chạy qua React và Phaser thật.
    await this.page.addInitScript((speed) => {
      localStorage.setItem(
        'theUnspoken.auth.v1',
        JSON.stringify({ token: 'playtest', username: 'playtest' }),
      )
      localStorage.setItem('theUnspoken.settings.v1', JSON.stringify({ textSpeed: speed }))
    }, textSpeed)
    await this.page.goto('/play')
    await this.waitForScene('MainMenuScene')
    await this.key('Enter')
    await this.waitForScene('RoomInvestigationScene')
    if (withTutorial) {
      await this.click(760, 560)
      await this.page.waitForFunction(
        () => window.__THE_UNSPOKEN__.runtime.session.tutorial.step === 'interact',
      )
      await this.clickSpot('R201_DESK')
      await this.page.waitForFunction(
        () => window.__THE_UNSPOKEN__.runtime.session.tutorial.step === 'notebook',
      )
      await this.key('Enter')
      await this.key('n')
      await this.waitForScene('NotebookScene')
      await this.key('n')
      await this.page.waitForFunction(
        () => window.__THE_UNSPOKEN__.runtime.session.tutorial.step === 'exit',
      )
      await this.clickSpot('R201_DOOR')
    } else {
      await this.key('Escape')
      await this.key('Enter')
    }
    await this.waitForScene('StoryScene')
    expect(await this.node()).toBe('P1_001__002')
    if (stopAtOpening) return
    await this.readLines()
    await this.waitForScene('RoomInvestigationScene')
  }

  async readLines(stopAt) {
    for (let count = 0; count < 160; count += 1) {
      const view = await this.page.evaluate(() => {
        const { game, runtime } = window.__THE_UNSPOKEN__
        return {
          node: runtime.story.state.current_node,
          type: runtime.story.node?.type,
          line:
            game.scene.isActive('StoryScene') &&
            Boolean(game.scene.getScene('StoryScene').advanceLine),
        }
      })
      if (!view.line || view.node === stopAt) return
      expect(['narration', 'action']).not.toContain(view.type)
      await this.key('Enter')
    }
    throw new Error(`Không dừng được đoạn thoại tại ${await this.node()}`)
  }

  async row(text, { twice = false } = {}) {
    await this.waitForScene('StoryScene')
    const row = await this.page.evaluate((label) => {
      const { menu } = window.__THE_UNSPOKEN__.game.scene.getScene('StoryScene')
      return {
        index: menu?.rows.findIndex((item) => item.text === label) ?? -1,
        selected: menu?.index,
        labels: menu?.rows.map((item) => item.text),
      }
    }, text)
    expect(
      row.index,
      `${await this.node()} → ${text}\n${row.labels?.join(' | ')}`,
    ).toBeGreaterThanOrEqual(0)
    const distance = (row.index - row.selected + row.labels.length) % row.labels.length
    const moveDown = distance <= row.labels.length / 2
    for (let i = 0; i < (moveDown ? distance : row.labels.length - distance); i += 1) {
      await this.key(moveDown ? 'ArrowDown' : 'ArrowUp')
    }
    const selection = await this.page.evaluate(
      () => window.__THE_UNSPOKEN__.game.scene.getScene('StoryScene').menu?.index,
    )
    expect(selection, `Chọn dòng "${text}" bằng phím mũi tên`).toBe(row.index)
    if (twice) {
      const coords = await this.page.evaluate(() => {
        const { menu } = window.__THE_UNSPOKEN__.game.scene.getScene('StoryScene')
        const bounds = menu.objects
          .find(
            (object) => object.type === 'Rectangle' && object.y === menu.y + (menu.index % 6) * 48,
          )
          .getBounds()
        return [bounds.centerX, bounds.centerY]
      })
      const box = await this.page.locator('canvas').boundingBox()
      await this.page.mouse.dblclick(
        box.x + (coords[0] * box.width) / 1280,
        box.y + (coords[1] * box.height) / 720,
      )
    } else {
      await this.key('Enter')
    }
  }

  async clickSpot(id) {
    await this.page.waitForFunction(() => {
      const game = window.__THE_UNSPOKEN__?.game
      const room = game?.scene.getScene('RoomInvestigationScene')
      return room?.sys.isActive() && !room.leaving && !room.cameras.main.fadeEffect.isRunning
    })
    const rect = await this.page.evaluate(
      (spotId) =>
        window.__THE_UNSPOKEN__.game.scene
          .getScene('RoomInvestigationScene')
          .hotspots.find((spot) => spot.id === spotId)?.rect,
      id,
    )
    expect(rect, id).toBeDefined()
    const [x, y, width, height] = rect
    await this.click(x + width / 2, y + height / 2)
  }

  async choose(target, stopAt) {
    const option = await this.page.evaluate((targetNode) => {
      const { game, runtime } = window.__THE_UNSPOKEN__
      const choice = runtime.story.choices().find((item) => item.targetNode === targetNode)
      if (!choice) return null
      const onMap = game.scene.isActive('RoomInvestigationScene')
      const spotId = onMap
        ? game.scene
            .getScene('RoomInvestigationScene')
            .hotspots.find((spot) => spot.choiceIndex === choice.index)?.id
        : null
      return { text: choice.text, onMap, spotId, version: runtime.story.version }
    }, target)
    expect(option, `${await this.node()} → ${target}`).not.toBeNull()
    if (option.spotId) {
      await this.clickSpot(option.spotId)
      // Một nút kỹ thuật có thể chuyển thẳng từ bản đồ này sang bản đồ khác.
      await this.page.waitForFunction(
        (version) => window.__THE_UNSPOKEN__.runtime.story.version > version,
        option.version,
      )
      await this.page.evaluate(() => new Promise(requestAnimationFrame))
    } else {
      if (option.onMap) await this.key('m')
      await this.row(option.text)
    }
    await this.readLines(stopAt)
    const node = await this.node()
    if (
      [
        'P1_HALL_204',
        'P1_ROOM_204_VIEW',
        'P1_ROOM_204_EXIT',
        'P1_HUB_MENU',
        'P2_ROOM_UI',
        'P3_HUB',
      ].includes(node)
    ) {
      await this.page.waitForFunction(() => {
        const { game, runtime } = window.__THE_UNSPOKEN__
        const scene = game.scene.getScene('RoomInvestigationScene')
        return (
          scene.sys.isActive() &&
          !scene.leaving &&
          scene.roomId === runtime.story.state.scene_location
        )
      })
    }
  }

  async choices(...targets) {
    for (const target of targets) await this.choose(target)
  }

  async press(id) {
    const text = (await this.state()).statements[id].text
    await this.row(text)
    await this.row('Hỏi sâu')
    await this.readLines()
  }

  async present(statement, evidence, { twice = false } = {}) {
    const record = (await this.state()).statements[statement]
    await this.row(record.text)
    await this.row('Đưa vật chứng')
    await this.row(evidenceNames.get(evidence), { twice })
    await this.readLines()
  }

  async saveAndReload() {
    const snapshot = await this.state()
    await this.key('n')
    await this.waitForScene('NotebookScene')
    const save = await this.page.evaluate(() => {
      const scene = window.__THE_UNSPOKEN__.game.scene.getScene('NotebookScene')
      const button = scene.children.list.find((object) => object.text?.text === 'Lưu tiến trình')
      return [button.x + button.width / 2, button.y + button.height / 2]
    })
    await this.click(...save)
    await this.page.waitForFunction((node) => {
      const backup = JSON.parse(localStorage.getItem('theUnspoken.save.backup.v1.playtest'))
      return backup && JSON.parse(backup.saveDataJson).state.current_node === node
    }, snapshot.current_node)
    await this.page.reload()
    await this.waitForScene('MainMenuScene')
    await this.key('ArrowDown')
    await this.key('Enter')
    await this.waitForScene('StoryScene')
    expect(await this.state()).toEqual(snapshot)
  }

  async fillBoard(who) {
    const answer = graph.deduction.answerKey
    for (const [index, slot] of graph.deduction.slots.entries()) {
      const role = slot.id.split('/')[1]
      const group = graph.deduction.groups[index]
      const spec = role ? graph.deduction.evidenceRoles.find(({ id }) => id === role) : group
      const selected = (await this.state()).deduction.draft
      const current = role ? selected.evidence[role] : selected[slot.id]
      const cards = role ? graph.deduction.sourceCards : graph.deduction.cards[group.id]
      const cardId = role ? answer.evidence[role] : slot.id === 'who' ? who : answer[slot.id]
      await this.row(`${spec.text} · ${cards.find(({ id }) => id === current)?.text ?? '—'}`)
      await this.row(cards.find(({ id }) => id === cardId).text)
    }
  }
}

test('Chủ trọ nhép miệng theo lượt nói ở đầu Chương 1', async ({ page }) => {
  const game = new ChapterPlaytest(page)
  const renderedMouthColors = (sceneKey, poseCount) =>
    page.evaluate(
      async ({ key, count }) => {
        const { game } = window.__THE_UNSPOKEN__
        const { sprite } = game.scene.getScene(key).characterStage
        const colors = new Map()
        const deadline = performance.now() + 1500
        while (colors.size < count && performance.now() < deadline) {
          const texture = sprite.texture.key
          if (sprite.alpha === 1 && sprite.anims.isPlaying && !colors.has(texture)) {
            const { x, y } = sprite.getTopLeft()
            // Điểm nằm giữa miệng trên ảnh gốc 783 × 990.
            const sample = await new Promise((resolve) => {
              game.renderer.snapshotPixel(
                Math.round(x + 414 * sprite.scaleX),
                Math.round(y + 306 * sprite.scaleY),
                ({ color }) => resolve({ texture: sprite.texture.key, color }),
              )
            })
            colors.set(sample.texture, sample.color)
          }
          await new Promise(requestAnimationFrame)
        }
        return [...colors.values()]
      },
      { key: sceneKey, count: poseCount },
    )
  const stageState = () =>
    page.evaluate(() => {
      const scene = window.__THE_UNSPOKEN__.game.scene.getScene('StoryScene')
      const { sprite } = scene.characterStage
      const box = scene.view.find((object) => object.bodyText)
      return {
        visible: sprite.visible,
        dimmed: sprite.isTinted,
        playing: sprite.anims.isPlaying,
        texture: sprite.texture.key,
        typing: box.isTyping,
        textLength: box.bodyText.text.length,
      }
    })

  await game.start(false, { textSpeed: 'normal', stopAtOpening: true })
  expect(await stageState()).toMatchObject({ visible: true, dimmed: false })
  expect(new Set(await renderedMouthColors('StoryScene', 3)).size).toBe(3)
  await expect.poll(stageState).toMatchObject({
    playing: false,
    texture: 'char-landlord-stern',
    typing: false,
  })

  await game.key('Enter')
  expect(await game.node()).toBe('P1_002__002')
  await expect.poll(async () => (await stageState()).textLength).toBeGreaterThan(2)
  expect(await stageState()).toMatchObject({
    visible: true,
    dimmed: true,
    playing: false,
    texture: 'char-landlord-stern',
  })

  await game.readLines('P1_002__003')
  expect(await stageState()).toMatchObject({ dimmed: false, playing: true, typing: true })
  await game.key('Enter')
  expect(await stageState()).toMatchObject({ playing: false, texture: 'char-landlord-stern' })

  await game.key('F9')
  await game.waitForScene('DialogueScene')
  expect(new Set(await renderedMouthColors('DialogueScene', 2)).size).toBe(2)
})

for (const early of [true, false]) {
  test(`Chương 1 qua giao diện · nguồn tùy chọn ${early ? 'thu sớm' : 'qua hồ sơ Phase 4'}`, async ({
    page,
  }) => {
    const game = new ChapterPlaytest(page)
    await test.step('Phòng 201, hỏi đủ bốn người', async () => {
      await game.start(early)
      expect(await game.node()).toBe('P1_HALL_204')
      expect(await game.hasTexture('RoomInvestigationScene', 'chapter1-portrait-linh')).toBe(false)
      await game.choose('P1_ENTER_204')
      expect(await game.node()).toBe('P1_ROOM_204_VIEW')
      expect(await game.hasTexture('RoomInvestigationScene', 'bg-room204-tung')).toBe(true)
      expect(await game.hasTexture('RoomInvestigationScene', 'room204-neck-photo')).toBe(false)
      await game.choose('P1_SEE_TUNG')
      expect((await game.state()).flags.victim_seen_from_door).toBe(true)
      expect((await game.state()).statements).toEqual({})
      expect((await game.state()).evidence_collected).toEqual([])
      await game.choose('P1_LEAVE_204', 'P1_003__002')
      expect(await game.dialoguePortrait()).toEqual(['NGƯỜI ĐÀN ÔNG', 'chapter1-portrait-hao'])
      await game.readLines('P1_003__004')
      expect(await game.dialoguePortrait()).toEqual(['MINH', 'chapter1-portrait-minh'])
      await game.readLines()
      await game.choose('P1_HOA_04')
      for (const id of ['linh', 'minh', 'hao']) {
        expect(await game.hasTexture('RoomInvestigationScene', `chapter1-portrait-${id}`)).toBe(
          true,
        )
      }
      await game.choose('P1_LINH_DISPATCH', 'P1_LINH_01__002')
      expect(await game.dialoguePortrait()).toEqual(['LINH', 'chapter1-portrait-linh'])
      await game.readLines()
      await game.choices(
        'P1_LINH_04',
        'P1_HAO_DISPATCH',
        'P1_HAO_04',
        'P1_MINH_DISPATCH',
        'P1_MINH_04',
      )
      expect((await game.state()).evidence_collected).toEqual([])
      await game.choose('P1_END_CHECK')
    })

    await test.step('Phòng 204, lối ra và nguồn thu thập', async () => {
      expect(await game.node()).toBe('P2_ROOM_UI')
      expect(await game.hasTexture('RoomInvestigationScene', 'bg-room204-tung')).toBe(true)
      expect(await game.hasTexture('RoomInvestigationScene', 'room204-neck-photo')).toBe(false)
      await game.choose('P2_EXIT_CHECK')
      expect(await game.node()).toBe('P2_ROOM_UI')
      const core = [
        'P2_LOCK_DISPATCH',
        'P2_NECK_DISPATCH',
        'P2_INHALER_DISPATCH',
        'P2_RECEIPT_DISPATCH',
        'P2_WATCH_DISPATCH',
      ]
      for (const target of early ? core : core.reverse()) {
        if (target === 'P2_NECK_DISPATCH') {
          await game.choose(target, 'P2_NECK__002')
          expect(await game.hasTexture('StoryScene', 'room204-neck-photo', 'neck-and-collar')).toBe(
            true,
          )
          expect((await game.state()).evidence_collected).not.toContain('EV_NeckScratches')
          await game.readLines()
          await game.waitForScene('RoomInvestigationScene')
        } else {
          await game.choose(target)
        }
      }
      expect((await game.state()).evidence_collected).toHaveLength(5)
      if (early) {
        await game.choices(
          'P2_TOWEL_DISPATCH',
          'P2_BOX_DISPATCH',
          'P2_SURVEY_DISPATCH',
          'P2_COIN_DISPATCH',
          'P2_COIN_DETAIL',
        )
      }
      await game.choose('P2_EXIT_CHECK')
      if (!early) await game.choose('P2_EXIT')
      expect(await game.node()).toBe('P3_HUB')
      if (!early) {
        expect((await game.state()).evidence_records.EV_WetTowel).toBeUndefined()
        await game.choose('P3_ROOM_RETURN')
        expect(await game.hasTexture('RoomInvestigationScene', 'bg-room204-tung')).toBe(true)
        await game.choices('P2_TOWEL_DISPATCH', 'P2_BOX_DISPATCH', 'P2_EXIT_CHECK')
        expect((await game.state()).evidence_records.EV_WetTowel.collected_phase).toBe(3)
      }
    })

    await test.step('Đối chất, gửi mẫu và tiếp tục sau khi tải lại', async () => {
      await game.choose('P3_MINH_START')
      await game.press('ST_P1_MINH_INITIAL')
      expect((await game.state()).statements.ST_P1_MINH_WASH.collected_phase).toBe(3)
      await game.present('ST_P1_MINH_WASH', 'EV_RentReceipt')
      expect((await game.state()).credibility).toBe(100)
      await game.present('ST_P1_MINH_WASH', 'EV_WetTowel')
      await game.present('ST_P3_MINH_VISIT_DETAIL', 'EV_Inhaler')
      await game.present('ST_P3_MINH_MEDICINE', 'EV_InhalerBox')
      await game.choices('P3_HUB', 'P3_HAO_START')
      await game.press('ST_P1_HAO_INITIAL')
      await game.choices('P3_A3', 'P3_A2', 'P3_203_REQUEST', 'P3_A4', 'P3_LINH_START')
      await game.press('ST_P1_LINH_INITIAL')
      await game.present('ST_P3_LINH_REPEAT', 'EV_MissingWatch')
      await game.press('ST_P3_LINH_WATCH_DEFENSE')
      await game.choices('P3_L4', 'P3_HOA_START')
      await game.press('ST_P1_HOA_INITIAL')
      await game.present('ST_P3_HOA_REPEAT', 'EV_Inhaler', { twice: true })
      expect((await game.state()).credibility).toBe(85)
      await game.present('ST_P3_HOA_REPEAT', 'EV_LooseLock')
      expect((await game.state()).flags.hoa_entry_admitted).toBe(false)
      await game.present('ST_P3_HOA_REPEAT', 'EV_RentReceipt')
      expect((await game.state()).statements.ST_P3_HOA_REPEAT.status).toBe('superseded')
      await game.choices('P3_H3', 'P3_H4')
      if (early) await game.choose('P3_CERTIFICATE')
      await game.choices(
        'P3_MINH_START',
        'P3_MINH_R4',
        'P3_R4_HAO',
        'P3_R4_HOA',
        'P3_R4_LINH',
        'P3_POLICE_CHECK',
        'P3_MINH_START',
      )
      await game.present('ST_P3_MINH_NO_HANDLING', 'EV_PackagingMatch')
      expect((await game.state()).flags.deduction_unlocked).toBe(false)
      await game.press('ST_P3_MINH_PARTIAL')
      await game.choices('P3_RECOVER', 'P3_MINH_START')
      await game.present('ST_P3_MINH_OLD_LOCATION', 'EV_OriginalInhaler')
      await game.choices('P3_HUB', 'P3_SEND')
      await game.choose('P3_SEND_CONFIRM', 'P3_REPORT__001')
      expect(await game.node()).toBe('P3_REPORT__001')
      if (!early) await game.saveAndReload()
      await game.readLines()
      expect((await game.state()).flags.victim_link_confirmed).toBe(true)
      expect((await game.state()).flags.scene_revisit_available).toBe(false)
      await game.choose('P3_MINH_START')
      await game.present('ST_P3_MINH_NORMAL_REPLACEMENT', 'EV_MedicineAnalysis')
      await game.press('ST_P3_MINH_ACT')
      expect((await game.state()).statements.ST_P4_MINH_HOSTAGE).toBeUndefined()
      await game.choices('P3_READY', 'P3_END')
    })

    await test.step('Suy luận, Bad Ending và khôi phục checkpoint', async () => {
      expect(await game.node()).toBe('FD_BOARD')
      await game.choose('FD_SUBMIT')
      expect((await game.state()).credibility).toBe(85)
      await game.fillBoard('DC_WHO_HOA')
      await game.choose('FD_SUBMIT')
      expect((await game.state()).credibility).toBe(65)
      expect((await game.state()).deduction.draft.who).toBe('DC_WHO_HOA')
      if (!early) {
        for (let i = 0; i < 4; i += 1) await game.choose('FD_SUBMIT')
        expect(await game.node()).toBe('FD_BAD_MENU')
        expect((await game.state()).credibility).toBe(0)
        await game.choose('CHECKPOINT_PRE_FINAL')
        expect(await game.node()).toBe('FD_BOARD')
        expect((await game.state()).credibility).toBe(85)
        expect((await game.state()).deduction.draft.who).toBeNull()
      }
      await game.fillBoard(graph.deduction.answerKey.who)
      await game.choose('FD_SUBMIT')
      expect((await game.state()).flags.final_notebook_updated).toBe(true)
    })

    await test.step('Phase 4 và điểm kết Chương 1', async () => {
      await game.choices('FD_PHASE_TRANSITION', 'P4_MINH_HOSTAGE', 'P4_MINH_DEBT', 'P4_HUB')
      if (!early) {
        await game.choose('P4_CLOSE_GATE', 'P4_INCOMPLETE')
        expect(await game.node()).toBe('P4_INCOMPLETE')
        const checklist = await page.evaluate(() =>
          window.__THE_UNSPOKEN__.game.scene
            .getScene('StoryScene')
            .view.filter((object) => object.type === 'Text')
            .map(({ text }) => text)
            .join('\n'),
        )
        expect(checklist).toContain('tờ khảo sát')
        expect(checklist).toContain('giấy khen')
        expect(checklist).not.toContain('lượt hỏi Minh')
        await game.readLines()
      }
      await game.choices('P4_COIN_OPEN', 'P4_HAO_COIN')
      if (!early) await game.choose('P4_SURVEY_RECORD')
      await game.choices('P4_LINH_SURVEY', 'P4_CERTIFICATE')
      await game.choose('P4_CLOSE_GATE', 'P4_CHAPTER_TRANSITION__002')
      const title = await page.evaluate(() =>
        window.__THE_UNSPOKEN__.game.scene
          .getScene('StoryScene')
          .view.filter((object) => object.type === 'Text')
          .map(({ text }) => text)
          .join('\n'),
      )
      expect(title).toContain('CHAPTER 2 — CON HẺM NƠI QUÁN BAR')
      await game.readLines()
      const state = await game.state()
      expect(state.current_node).toBe('CH2_ENTRY')
      expect(state.flags.chapter1_complete).toBe(true)
      expect(state.evidence_records.EV_BoundaryCoin.collected_phase).toBe(early ? 2 : 4)
      expect(state.observations.OBS_P2_SURVEY.collected_phase).toBe(early ? 2 : 4)
      expect(state.evidence_records.EV_KhangCertificate.collected_phase).toBe(early ? 3 : 4)
      expect(state.evidence_collected).not.toContain('OBS_P2_SURVEY')
      await page.waitForFunction(() => {
        const saved = JSON.parse(localStorage.getItem('theUnspoken.save.backup.v1.playtest'))
        return (
          saved?.currentChapter === 2 &&
          JSON.parse(saved.saveDataJson).state.flags.chapter1_complete
        )
      })
      expect(game.errors).toEqual([])
    })
  })
}
