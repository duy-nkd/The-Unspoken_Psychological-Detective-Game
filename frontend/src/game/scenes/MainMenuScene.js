import Phaser from 'phaser'

export class MainMenuScene extends Phaser.Scene {
  constructor() { super('MainMenuScene') }
  create() { this.add.text(40, 40, 'The Unspoken', { color: '#f4efe6', fontSize: '42px' }) }
}
