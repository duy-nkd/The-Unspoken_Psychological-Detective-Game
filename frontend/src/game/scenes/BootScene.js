import Phaser from 'phaser'
import { env } from '@/config/env'
import { SCENE_KEYS } from '../constants/sceneKeys'

/** Scene khởi động: cấu hình chung rồi chuyển sang Preload. Không tải asset nặng ở đây. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.BOOT)
  }

  create() {
    if (env.debug) this.scene.launch(SCENE_KEYS.DEBUG)
    this.scene.start(SCENE_KEYS.PRELOAD)
  }
}
