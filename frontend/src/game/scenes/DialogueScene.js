import Phaser from 'phaser'

export class DialogueScene extends Phaser.Scene {
  constructor() { super('DialogueScene') }
  create() { this.add.text(40, 40, 'Dialogue', { color: '#f4efe6' }) }
}
