import Phaser from 'phaser'

export class DeductionScene extends Phaser.Scene {
  constructor() { super('DeductionScene') }
  create() { this.add.text(40, 40, 'Deduction', { color: '#f4efe6' }) }
}
