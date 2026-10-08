import Phaser from 'phaser'
import { BadEndingScene } from '../scenes/BadEndingScene'
import { BootScene } from '../scenes/BootScene'
import { DeductionScene } from '../scenes/DeductionScene'
import { DialogueScene } from '../scenes/DialogueScene'
import { MainMenuScene } from '../scenes/MainMenuScene'
import { NotebookScene } from '../scenes/NotebookScene'
import { PreloadScene } from '../scenes/PreloadScene'
import { RoomInvestigationScene } from '../scenes/RoomInvestigationScene'
import { DebugScene } from '../debug/DebugScene'
import { COLORS } from '../ui/theme'

export const GAME_WIDTH = 1280
export const GAME_HEIGHT = 720

/**
 * Cấu hình Phaser 4.2.1. Scene ĐẦU TIÊN trong mảng tự chạy (BootScene).
 * Thêm scene mới: tạo file trong scenes/, thêm key vào constants/sceneKeys.js, đăng ký tại đây.
 * @param {HTMLElement} parent
 * @returns {Phaser.Types.Core.GameConfig}
 */
export function createGameConfig(parent) {
  return {
    type: Phaser.AUTO, // Phaser 4: WebGL khuyến nghị, Canvas đã deprecated
    parent,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: COLORS.background,
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: [
      BootScene,
      PreloadScene,
      MainMenuScene,
      DialogueScene,
      RoomInvestigationScene,
      NotebookScene,
      DeductionScene,
      BadEndingScene,
      DebugScene,
    ],
  }
}
