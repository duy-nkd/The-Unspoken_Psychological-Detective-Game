import { mkdirSync, writeFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

const directory = 'node_modules/.cache/tung-observation-qa'
test.setTimeout(90_000)

async function setup(page, reducedMotion = 'no-preference') {
  await page.emulateMedia({ reducedMotion })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.addInitScript(() => {
    localStorage.setItem(
      'theUnspoken.auth.v1',
      JSON.stringify({
        token: 'tung-fixture',
        username: 'tung-ui',
        userId: 79,
        role: 'ROLE_PLAYER',
      }),
    )
    localStorage.setItem('theUnspoken.settings.v1', JSON.stringify({ textSpeed: 'instant' }))
  })
  await page.route('**/api/**', (route) => {
    const url = new URL(route.request().url())
    if (!url.pathname.startsWith('/api/')) return route.continue()
    const status = {
      serverNow: new Date().toISOString(),
      active: false,
      scheduled: false,
      revision: 0,
      startsAt: null,
      message: '',
    }
    if (url.pathname.endsWith('/auth/config')) return route.fulfill({ json: {} })
    if (url.pathname.endsWith('/auth/logout')) return route.fulfill({ json: {} })
    if (url.pathname.endsWith('/auth/session'))
      return route.fulfill({ json: { maintenance: status } })
    if (url.pathname.endsWith('/system/status')) return route.fulfill({ json: status })
    if (url.pathname.endsWith('/story-text'))
      return route.fulfill({
        json: {
          chapterId: 1,
          baseHash: url.searchParams.get('baseHash'),
          contractVersion: '2.0.0',
          allowlistVersion: 1,
          versionId: null,
          overrides: [],
        },
      })
    return route.fulfill({ status: 404, json: { message: 'No observation fixture data' } })
  })
  await page.goto('/play')
  await page.waitForFunction(() => window.__THE_UNSPOKEN__?.game.scene.isActive('MainMenuScene'))
  await page.keyboard.press('Enter')
  await page.waitForFunction(() =>
    window.__THE_UNSPOKEN__?.game.scene.isActive('RoomInvestigationScene'),
  )
  mkdirSync(directory, { recursive: true })
  return errors
}

// Technical fixture reaches the same P1 choice; the actual interaction uses mouse/keyboard.
async function enterRoom(page) {
  await page.evaluate(() => {
    const { game, runtime } = window.__THE_UNSPOKEN__
    const graph = game.cache.json.get('chapter1-graph')
    const state = structuredClone(game.cache.json.get('chapter1-state').initialState)
    state.current_node = 'P1_ROOM_204_VIEW'
    state.scene_location = 'room204'
    state.flags.notebook_unlocked = true
    runtime.startNewGame(state, { graph, versionId: null, status: 'base' })
    runtime.session.tutorial = { step: null, status: 'skipped' }
    runtime.session.player = { roomId: 'room204', x: 582, y: 587, face: 'up' }
    runtime.startStory(graph)
    const scene = game.scene.getScene('RoomInvestigationScene')
    scene.__observationPreviousPlayer = scene.player
    game.scene.stop('StoryScene')
    game.scene.start('RoomInvestigationScene', { chapter: 1, roomId: 'room204' })
  })
  await page.waitForFunction(() => {
    const { game } = window.__THE_UNSPOKEN__
    const scene = game.scene.getScene('RoomInvestigationScene')
    return (
      scene.sys.isActive() &&
      scene.player !== scene.__observationPreviousPlayer &&
      !scene.cameras.main.fadeEffect.isRunning &&
      scene.nearHotspot?.id === 'P1_SEE_TUNG'
    )
  })
}

async function opened(page) {
  await page.waitForFunction(() => {
    const scene = window.__THE_UNSPOKEN__?.game.scene.getScene('StoryScene')
    return scene?.sys.isActive() && scene.tungObservation?.active
  })
}

async function returned(page) {
  await page.waitForFunction(() => {
    const { game, runtime } = window.__THE_UNSPOKEN__
    return (
      game.scene.isActive('RoomInvestigationScene') &&
      runtime.story.state.current_node === 'P1_ROOM_204_EXIT'
    )
  })
}

async function measurements(page) {
  return page.evaluate(() => {
    const { game, runtime } = window.__THE_UNSPOKEN__
    const scene = game.scene.getScene('StoryScene')
    const view = scene.tungObservation
    return {
      viewport: view.viewport,
      panel: view.panel.getBounds(),
      body: view.body.getBounds(),
      heading: view.heading.getBounds(),
      button: view.continueButton.getBounds(),
      photo: {
        key: view.photo.texture.key,
        frame: view.photo.frame.name,
        width: view.photo.displayWidth,
        height: view.photo.displayHeight,
        scaleX: view.photo.scaleX,
        scaleY: view.photo.scaleY,
        cropped: view.photo.isCropped,
        crop: view.photoCrop,
      },
      text: view.body.text,
      state: runtime.story.state,
    }
  })
}

test('E opens a full-width 2/3 image with brief image-only shake and a separate description', async ({
  page,
}) => {
  const errors = await setup(page)
  await enterRoom(page)
  await page.keyboard.press('E')
  await opened(page)
  const motion = await page.evaluate(async () => {
    const scene = window.__THE_UNSPOKEN__.game.scene.getScene('StoryScene')
    const view = scene.tungObservation
    const positions = new Set()
    const textPositions = new Set()
    const deadline = performance.now() + 450
    while (performance.now() < deadline) {
      positions.add(view.photo.x.toFixed(2))
      textPositions.add(view.body.y)
      await new Promise(requestAnimationFrame)
    }
    return { imagePositions: positions.size, textPositions: textPositions.size, x: view.photo.x }
  })
  expect(motion.imagePositions).toBeGreaterThan(2)
  expect(motion.textPositions).toBe(1)
  expect(motion.x).toBe(640)
  const m = await measurements(page)
  expect(m.viewport).toEqual({ x: 0, y: 0, width: 1280, height: 480 })
  expect(m.panel.y).toBe(480)
  expect(m.panel.height).toBe(240)
  expect(m.photo).toMatchObject({ key: 'room204-neck-photo', frame: '__BASE', cropped: true })
  expect(m.photo.crop.height * m.photo.scaleY).toBeCloseTo(480)
  expect(m.photo.width).toBeGreaterThanOrEqual(1280)
  expect(m.photo.height).toBeGreaterThanOrEqual(480)
  expect(m.photo.scaleX).toBe(m.photo.scaleY)
  expect(m.heading.y).toBeGreaterThanOrEqual(480)
  expect(m.body.y).toBeGreaterThan(m.heading.y + m.heading.height)
  expect(m.body.y + m.body.height).toBeLessThan(m.button.y)
  expect(m.button.y + m.button.height).toBeLessThanOrEqual(720)
  expect(m.text).toContain('Ba vết cào đỏ rướm máu')
  expect(m.text).not.toMatch(/nguyên nhân|tự cào|ngoại lực/)
  expect(m.state.flags.victim_seen_from_door).toBe(true)
  expect(m.state.evidence_collected).toEqual([])
  expect(m.state.credibility).toBe(100)
  writeFileSync(`${directory}/measurements.json`, JSON.stringify({ ...m, motion }, null, 2))
  for (const [label, width, height] of [
    ['desktop', 1280, 800],
    ['tablet', 1024, 768],
    ['mobile', 390, 844],
  ]) {
    await page.setViewportSize({ width, height })
    await page.locator('canvas').screenshot({ path: `${directory}/${label}.png` })
  }
  await page.keyboard.press('Enter')
  await returned(page)
  expect(errors).toEqual([])
})

test('mouse interaction, reduced motion and the continue button preserve the original effect', async ({
  page,
}) => {
  const errors = await setup(page, 'reduce')
  await page.evaluate(() => {
    const { settings } = window.__THE_UNSPOKEN__.runtime
    settings.set({ ...settings.get(), dialogueTextSize: 'large', language: 'en' })
  })
  await enterRoom(page)
  const canvas = await page.locator('canvas').boundingBox()
  await page.mouse.click(
    canvas.x + (598 * canvas.width) / 1280,
    canvas.y + (508 * canvas.height) / 720,
  )
  await opened(page)
  expect(
    await page.evaluate(
      () => window.__THE_UNSPOKEN__.game.scene.getScene('StoryScene').tungObservation.impactTween,
    ),
  ).toBeNull()
  const m = await measurements(page)
  expect(m.body.y + m.body.height).toBeLessThan(m.button.y)
  expect(
    await page.evaluate(
      () => window.__THE_UNSPOKEN__.game.scene.getScene('StoryScene').tungObservation.heading.text,
    ),
  ).toBe('Observe Tùng')
  await page.mouse.click(
    canvas.x + ((m.button.x + m.button.width / 2) * canvas.width) / 1280,
    canvas.y + ((m.button.y + m.button.height / 2) * canvas.height) / 720,
  )
  await returned(page)
  expect(
    await page.evaluate(() =>
      window.__THE_UNSPOKEN__.runtime.story.state.committed_events.filter((id) =>
        id.endsWith(':P1_SEE_TUNG'),
      ),
    ),
  ).toHaveLength(1)
  expect(errors).toEqual([])
})

test('Notebook resume keeps the preview without replaying impact; Escape and scene teardown clean up', async ({
  page,
}) => {
  const errors = await setup(page)
  await enterRoom(page)
  await page.keyboard.press('E')
  await opened(page)
  await page.keyboard.press('N')
  await page.waitForFunction(() => window.__THE_UNSPOKEN__.game.scene.isActive('NotebookScene'))
  await page.keyboard.press('N')
  await opened(page)
  const resumed = await page.evaluate(() => {
    const scene = window.__THE_UNSPOKEN__.game.scene.getScene('StoryScene')
    return {
      count: scene.children.list.filter(
        (child) => child instanceof scene.tungObservation.constructor,
      ).length,
      pending: scene.observationPending,
      motion: scene.tungObservation.impactTween,
    }
  })
  expect(resumed).toEqual({ count: 1, pending: true, motion: null })
  await page.keyboard.press('Escape')
  await returned(page)
  await enterRoom(page)
  await page.keyboard.press('E')
  await opened(page)
  page.once('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: 'Đăng xuất' }).click()
  await page.waitForFunction(() => !window.__THE_UNSPOKEN__?.game)
  expect(errors).toEqual([])
})
