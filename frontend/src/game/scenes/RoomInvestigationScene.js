import Phaser from 'phaser'

export class RoomInvestigationScene extends Phaser.Scene {
  constructor() { super('RoomInvestigationScene') }
  create() { this.add.text(40, 40, 'Room Investigation', { color: '#f4efe6' }) }
}
