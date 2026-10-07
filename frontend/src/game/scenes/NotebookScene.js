import Phaser from 'phaser'

export class NotebookScene extends Phaser.Scene {
  constructor() { super('NotebookScene') }
  create() { this.add.text(40, 40, 'Notebook', { color: '#f4efe6' }) }
}
