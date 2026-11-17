import { mkdirSync, writeFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

const directory = 'node_modules/.cache/hallway-npc-qa'
test.setTimeout(90_000)

async function setup(page) {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.addInitScript(() => {
    localStorage.setItem(
      'theUnspoken.auth.v1',
      JSON.stringify({ token: 'npc-fixture', username: 'npc-ui', userId: 75, role: 'ROLE_PLAYER' }),
    )
    localStorage.setItem('theUnspoken.settings.v1', JSON.stringify({ textSpeed: 'instant' }))
  })
  await page.route('**/api/**', (route) => {
    const url = new URL(route.request().url())
    if (!url.pathname.startsWith('/api/')) return route.continue()
    const system = {
      serverNow: new Date().toISOString(),
      active: false,
      scheduled: false,
      revision: 0,
      startsAt: null,
      message: '',
    }
    if (url.pathname.endsWith('/auth/config')) return route.fulfill({ json: {} })
    if (url.pathname.endsWith('/auth/session'))
      return route.fulfill({ json: { maintenance: system } })
    if (url.pathname.endsWith('/system/status')) return route.fulfill({ json: system })
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
    if (url.pathname === '/api/game/load/75')
      return route.fulfill({ status: 404, json: { message: 'No saved game' } })
    if (url.pathname === '/api/game/save')
      return route.fulfill({ json: { message: 'Saved', updatedAt: new Date().toISOString() } })
    return route.fulfill({ status: 404, json: { message: 'No NPC fixture data' } })
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

// Technical map fixture only; no runtime graph changes or server writes.
async function hallway(page, { phase = 1, knownHao = true, x = 403, y = 460 } = {}) {
  await page.evaluate(
    ({ phase, knownHao, x, y }) => {
      const { runtime, game } = window.__THE_UNSPOKEN__
      const graph = game.cache.json.get('chapter1-graph')
      const state = structuredClone(game.cache.json.get('chapter1-state').initialState)
      state.current_node = phase === 1 ? 'P1_HUB_MENU' : 'P3_HUB'
      state.current_phase = phase
      state.scene_location = 'hallway'
      state.flags.hoa_initial = true
      state.flags.hao_name_known = knownHao
      state.flags.notebook_unlocked = true
      runtime.startNewGame(state, { graph, versionId: null, status: 'base' })
      runtime.session.tutorial = { step: null, status: 'skipped' }
      runtime.session.player = { roomId: 'hallway', x, y, face: 'right' }
      runtime.startStory(graph)
      const scene = game.scene.getScene('RoomInvestigationScene')
      scene.__npcPreviousPlayer = scene.player
      game.scene.stop('StoryScene')
      game.scene.start('RoomInvestigationScene', { chapter: 1, roomId: 'hallway' })
    },
    { phase, knownHao, x, y },
  )
  await page.waitForFunction(() => {
    const scene = window.__THE_UNSPOKEN__.game.scene.getScene('RoomInvestigationScene')
    return (
      scene.sys.isActive() &&
      scene.roomId === 'hallway' &&
      scene.player !== scene.__npcPreviousPlayer &&
      scene.npcs.size === 4 &&
      !scene.cameras.main.fadeEffect.isRunning
    )
  })
  await page.evaluate(() => new Promise(requestAnimationFrame))
}

async function actors(page) {
  return page.evaluate(() => {
    const scene = window.__THE_UNSPOKEN__.game.scene.getScene('RoomInvestigationScene')
    return [...scene.npcs].map(([spotId, actor]) => {
      const sprite = actor.sprite
      const canvas = sprite.texture.getSourceImage()
      const context = canvas.getContext('2d')
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
      const alpha = (x, y) => pixels[(y * canvas.width + x) * 4 + 3]
      return {
        spotId,
        id: actor.id,
        name: actor.label.text,
        texture: sprite.texture.key,
        x: sprite.x,
        y: sprite.y,
        height: sprite.displayHeight,
        width: sprite.displayWidth,
        origin: [sprite.originX, sprite.originY],
        depth: sprite.depth,
        labelBottom: actor.label.getBounds().bottom,
        bodyTop: sprite.getBounds().top,
        corners: [
          [0, 0],
          [canvas.width - 1, 0],
          [0, canvas.height - 1],
          [canvas.width - 1, canvas.height - 1],
        ].map(([x, y]) => alpha(x, y)),
        rect: scene.hotspots.find((s) => s.id === spotId).rect,
      }
    })
  })
}

test('four NPC bodies have transparent textures, floor anchors and railing depth in P1/P3', async ({
  page,
}) => {
  const errors = await setup(page)
  await hallway(page)
  const models = await actors(page)
  expect(models.map((m) => m.id).sort()).toEqual(['hao', 'landlord', 'linh', 'minh'])
  for (const model of models) {
    expect(model.texture).toBe(`map-npc-${model.id}`)
    expect(model.height).toBeGreaterThan(220)
    expect(model.height).toBeLessThan(240)
    expect(model.origin).toEqual([0.5, 1])
    expect(model.depth).toBeCloseTo(20 + model.y / 1000)
    expect(model.labelBottom).toBeLessThan(model.bodyTop)
    expect(model.corners.every((a) => a === 0)).toBe(true)
    expect(model.rect[1]).toBeLessThan(model.bodyTop)
  }
  const sceneInfo = await page.evaluate(() => {
    const s = window.__THE_UNSPOKEN__.game.scene.getScene('RoomInvestigationScene')
    return {
      railingDepth: s.children.list.find((c) => c.texture?.key === 'occ-hallway-railing').depth,
      headIcons: s.children.list.filter((c) => c.texture?.key.startsWith('chapter1-portrait-'))
        .length,
    }
  })
  expect(sceneInfo.railingDepth).toBeGreaterThan(Math.max(...models.map((m) => m.depth)))
  expect(sceneInfo.headIcons).toBe(0)
  writeFileSync(`${directory}/models.json`, JSON.stringify(models, null, 2))
  await page.locator('canvas').screenshot({ path: `${directory}/hallway-p1.png` })
  await hallway(page, { phase: 3 })
  expect((await actors(page)).map((m) => m.name).sort()).toEqual(['Hào', 'Hòa', 'Linh', 'Minh'])
  await page.locator('canvas').screenshot({ path: `${directory}/hallway-p3.png` })
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.locator('canvas').screenshot({ path: `${directory}/hallway-tablet.png` })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.locator('canvas').screenshot({ path: `${directory}/hallway-mobile.png` })
  expect(errors).toEqual([])
})

test('clicking each body above the former portrait area walks to the same story interaction', async ({
  page,
}) => {
  const errors = await setup(page)
  for (const [id, node] of [
    ['linh', 'P1_LINH_01__001'],
    ['hao', 'P1_HAO_01__001'],
    ['minh', 'P1_MINH_01__002'],
    ['landlord', 'P1_REVISIT_HOA__001'],
  ]) {
    await hallway(page, { knownHao: false })
    const model = (await actors(page)).find((m) => m.id === id)
    const canvas = await page.locator('canvas').boundingBox()
    await page.mouse.click(
      canvas.x + (model.x * canvas.width) / 1280,
      canvas.y + ((model.bodyTop + 28) * canvas.height) / 720,
    )
    await page.waitForFunction(() => window.__THE_UNSPOKEN__.game.scene.isActive('StoryScene'))
    await expect
      .poll(() => page.evaluate(() => window.__THE_UNSPOKEN__.runtime.story.state.current_node))
      .toBe(node)
    expect(await page.evaluate(() => window.__THE_UNSPOKEN__.runtime.story.state.credibility)).toBe(
      100,
    )
  }
  expect(errors).toEqual([])
})

test('nearby E interaction, hidden Hao name, and repeated scene entry keep the correct actors', async ({
  page,
}) => {
  const errors = await setup(page)
  for (const [id, x] of [
    ['hao', 478],
    ['landlord', 592],
    ['linh', 744],
    ['minh', 889],
  ]) {
    await hallway(page, { knownHao: false, x })
    const models = await actors(page)
    expect(models.find((m) => m.id === 'hao').name).toBe('Người đàn ông')
    await page.waitForFunction(
      (id) =>
        window.__THE_UNSPOKEN__.game.scene
          .getScene('RoomInvestigationScene')
          .npcs.get(
            window.__THE_UNSPOKEN__.game.scene.getScene('RoomInvestigationScene').nearHotspot?.id,
          )?.id === id,
      id,
    )
    await page.keyboard.press('E')
    await page.waitForFunction(() => window.__THE_UNSPOKEN__.game.scene.isActive('StoryScene'))
  }
  for (let i = 0; i < 5; i++) {
    await hallway(page, { phase: i % 2 ? 3 : 1 })
    expect(
      await page.evaluate(() => {
        const { game } = window.__THE_UNSPOKEN__
        const s = game.scene.getScene('RoomInvestigationScene')
        return [
          s.children.list.filter((c) => c.texture?.key.startsWith('map-npc-')).length,
          game.textures.getTextureKeys().filter((k) => /^map-npc-(hao|landlord|linh|minh)$/.test(k))
            .length,
        ]
      }),
    ).toEqual([4, 4])
  }
  expect(errors).toEqual([])
})
