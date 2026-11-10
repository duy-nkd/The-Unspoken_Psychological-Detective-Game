/**
 * Hành lang tầng 2 — mở cửa phòng 201 ra là tới đây (người dùng 24/10/2026; gói Chương 1 cần nền
 * "hallway" có cửa 204, lan can, cầu thang — CHAPTER1_MEMORY §8). T-024, dựng theo DEC-013/DEC-014.
 *
 * MỌI tọa độ theo khung logic 1280×720. Số đo trên ảnh gốc 1672×940 (art-source/hallway/hallway.png),
 * đổi sang khung bằng ×1280/1672 (TẠM — chỉnh bằng overlay debug F8).
 *
 * - walkArea hình chữ U: dải hành lang bên trái (từ cửa A201 vào tới A203) + dải sàn chiếu nghỉ sau
 *   lan can (trước A204/A205, tới đầu cầu thang phải). Giếng cầu thang, chân tường, chậu cây sát tường
 *   nằm ngoài vùng đi. Mép dưới y = 624 (kiểu DEC-014: không xuống sát camera để nhân vật không quá to).
 * - occluders: ảnh cắt từ nền (scripts/art/build_hallway_assets.py). Không có baseY = luôn vẽ đè nhân vật
 *   (lan can: nhân vật luôn ở sau). Có baseY = chỉ đè khi chân nhân vật ở sau đáy vật đó (chậu cây).
 * - entrances: chỗ nhân vật xuất hiện khi đi từ phòng khác sang (khóa = id phòng vừa rời).
 * - hotspots: lời khi XEM nằm ở file nội dung `inspectContent` (khóa = id hotspot) — nhóm tự điền.
 *   PENDING: A204 dẫn vào phòng 204 (Chương 1 P2) và cầu thang đi đâu — chưa có nền/kịch bản nối.
 */
export const HALLWAY = Object.freeze({
  id: 'hallway',
  background: { key: 'bg-hallway', url: 'assets/images/backgrounds/hallway.webp' },
  inspectContent: { key: 'inspect-hallway', url: 'assets/dialogues/hallway-inspect.json' },
  occluders: Object.freeze([
    Object.freeze({
      key: 'occ-hallway-railing',
      url: 'assets/images/backgrounds/hallway-occ-railing.webp',
      x: 468.52,
      y: 355.4,
      width: 536.65,
      height: 281.11,
    }),
    Object.freeze({
      key: 'occ-hallway-plant-a',
      url: 'assets/images/backgrounds/hallway-occ-plant-a.webp',
      x: 450.91,
      y: 461.87,
      width: 46.7,
      height: 65.11,
      baseY: 527, // đáy chậu cây nhỏ cạnh góc lan can
    }),
    Object.freeze({
      key: 'occ-hallway-plant-b',
      url: 'assets/images/backgrounds/hallway-occ-plant-b.webp',
      x: 410.33,
      y: 507.06,
      width: 69.67,
      height: 186.89,
      baseY: 693, // đáy chậu cây lớn sát lan can
    }),
  ]),
  walkArea: Object.freeze([
    [302, 460],
    [367, 460],
    [367, 446],
    [961, 446],
    [961, 470],
    [540, 470],
    [490, 498],
    [459, 515],
    [429, 536],
    [417, 624],
    [165, 624],
    [165, 571],
    [230, 565],
    [302, 536],
  ]),
  obstacles: Object.freeze([]),
  spawn: Object.freeze({ x: 200, y: 605, face: 'right' }),
  entrances: Object.freeze({
    room201: Object.freeze({ x: 200, y: 605, face: 'right' }),
    room204: Object.freeze({ x: 629, y: 460, face: 'down' }),
  }),
  // TẠM: chân tường sau y 446 -> cao 222 px; mép dưới y 624 -> 330 px (cùng cỡ gần nhất phòng 201)
  depth: Object.freeze({ nearY: 624, nearHeight: 330, farY: 446, farHeight: 222 }),
  hotspots: Object.freeze([
    Object.freeze({
      id: 'HALL_A201',
      nameKey: 'hallway.a201',
      promptKey: 'interact.enter',
      rect: [29, 73, 122, 540],
      stand: [200, 605],
      face: 'left',
      action: 'exit',
      target: Object.freeze({ roomId: 'room201' }),
    }),
    Object.freeze({
      id: 'HALL_A202',
      nameKey: 'hallway.a202',
      rect: [219, 153, 54, 305],
      stand: [330, 486],
      face: 'left',
      action: 'inspect',
    }),
    Object.freeze({
      id: 'HALL_A203',
      nameKey: 'hallway.a203',
      rect: [337, 169, 134, 276],
      stand: [403, 462],
      face: 'up',
      action: 'inspect',
    }),
    Object.freeze({
      id: 'HALL_A204',
      nameKey: 'hallway.a204',
      rect: [565, 169, 130, 276],
      stand: [629, 460],
      face: 'up',
      action: 'inspect',
    }),
    Object.freeze({
      id: 'HALL_A205',
      nameKey: 'hallway.a205',
      rect: [723, 169, 122, 276],
      stand: [784, 460],
      face: 'up',
      action: 'inspect',
    }),
    Object.freeze({
      id: 'HALL_STAIRS',
      nameKey: 'hallway.stairs',
      rect: [1018, 429, 262, 291],
      stand: [938, 460],
      face: 'right',
      action: 'inspect',
    }),
  ]),
})
