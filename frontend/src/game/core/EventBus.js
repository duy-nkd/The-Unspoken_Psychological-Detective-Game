import Phaser from 'phaser'

/**
 * EventBus toàn cục — kênh DUY NHẤT để React và Phaser nói chuyện với nhau.
 * - Phaser không import React; React không gọi trực tiếp vào scene.
 * - Tên sự kiện: xem constants/gameEvents.js.
 * Debug: bật env.debug để mọi emit được log (xem game/index.js).
 */
export const EventBus = new Phaser.Events.EventEmitter()
