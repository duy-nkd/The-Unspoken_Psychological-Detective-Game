// Vùng sàn và điểm đứng đo trên nền hiện có theo khung logic 1280 × 720.
export const ROOM_204 = {
  id: 'room204',
  background: { key: 'bg-room204', url: 'assets/images/backgrounds/room204.webp' },
  backgroundWithTung: {
    key: 'bg-room204-tung',
    url: 'assets/images/characters/Tunginroom.png',
  },
  occluders: [],
  walkArea: [
    [90, 632],
    [315, 532],
    [952, 532],
    [1190, 634],
    [1190, 655],
    [90, 655],
  ],
  // Phần thân, tay và chân nằm trong dải sàn đi lại của cảnh khám hiện trường.
  obstacles: [
    [
      [552, 484],
      [642, 478],
      [726, 495],
      [818, 509],
      [893, 536],
      [891, 557],
      [846, 558],
      [774, 548],
      [684, 539],
      [615, 544],
      [586, 561],
      [555, 559],
      [557, 543],
      [575, 529],
      [551, 507],
    ],
  ],
  spawn: { x: 199, y: 624, face: 'up' },
  depth: { nearY: 655, nearHeight: 315, farY: 532, farHeight: 216 },
  hotspots: [],
}

export const ROOM_204_NECK_PHOTO = {
  key: 'room204-neck-photo',
  url: 'assets/images/characters/Tung.png',
  frame: 'neck-and-collar',
  crop: [28, 75, 630, 420],
}

// Khung và điểm đứng theo nền Tunginroom.png.
export const ROOM_204_HOTSPOTS = {
  HP_LOCK: { rect: [152, 340, 45, 130], stand: [225, 601] },
  HP_SINK: { rect: [1172, 304, 108, 125], stand: [1042, 593] },
  HP_NECK: { rect: [550, 481, 96, 55], stand: [582, 587] },
  HP_INHALER: { rect: [381, 319, 40, 41], stand: [359, 560] },
  HP_TRASH: { rect: [502, 408, 55, 73], stand: [527, 559] },
  HP_RECEIPT: { rect: [486, 334, 73, 45], stand: [449, 559] },
  HP_DUST: { rect: [645, 368, 79, 39], stand: [688, 586] },
  HP_BED: { rect: [725, 333, 230, 157], stand: [806, 588] },
  HP_BOARD: { rect: [565, 210, 160, 112], stand: [623, 587] },
  P2_EXIT_CHECK: { rect: [35, 128, 114, 454], stand: [156, 630] },
}
