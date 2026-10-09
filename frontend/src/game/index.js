import Phaser from 'phaser'
import { env } from '@/config/env'
import { createLogger } from '@/shared/logger/logger'
import { createGameConfig } from './config/gameConfig'
import { EventBus } from './core/EventBus'
import { createRuntime, registerRuntime } from './core/runtime'

const log = createLogger('Game')

/**
 * Điểm vào DUY NHẤT để tạo game — React gọi hàm này (features/game/components/PhaserGame.jsx).
 * @param {HTMLElement} parent phần tử DOM chứa canvas
 * @returns {Phaser.Game}
 */
export function createGame(parent) {
  const game = new Phaser.Game(createGameConfig(parent))
  const runtime = createRuntime()
  registerRuntime(game, runtime)

  game.events.once(Phaser.Core.Events.DESTROY, () => {
    runtime.destroy()
    if (globalThis.__THE_UNSPOKEN__?.game === game) delete globalThis.__THE_UNSPOKEN__
  })

  if (env.debug) {
    // Debug từ console trình duyệt: __THE_UNSPOKEN__.runtime.session, __THE_UNSPOKEN__.game.scene...
    globalThis.__THE_UNSPOKEN__ = { game, runtime, EventBus }
    log.debug('Phaser', Phaser.VERSION, 'đã khởi tạo')
  }
  return game
}
