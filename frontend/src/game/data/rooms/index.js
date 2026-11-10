import { HALLWAY } from './hallway'
import { ROOM_201 } from './room201'
import { ROOM_204 } from './room204'

/** Danh sách phòng 2.5D theo id (RoomInvestigationScene nạp theo data.roomId). Thêm phòng: thêm file + khai báo ở đây. */
export const ROOMS = Object.freeze({
  [ROOM_201.id]: ROOM_201,
  [HALLWAY.id]: HALLWAY,
  [ROOM_204.id]: ROOM_204,
})

/** Phòng mở đầu Chương 1 (Bible 1.3: New Game ở phòng 201) — DEC-013. */
export const FIRST_ROOM_ID = ROOM_201.id

/** Dùng ảnh hiện trường khi thấy Tùng lần đầu và khi được phép khám phòng 204. */
export function roomBackground(room, state) {
  const preview = state?.current_phase === 1 && state.scene_location === room.id
  const inspecting = state?.flags?.inspect_permission && !state.flags.samples_submitted
  if (room.backgroundWithTung && (preview || inspecting)) {
    return room.backgroundWithTung
  }
  return room.background
}

/**
 * Chỗ nhân vật xuất hiện khi vào `room` từ phòng `fromRoomId` (T-024). Không có lối vào tương ứng
 * (New Game, tải game, phòng lạ) -> điểm xuất hiện mặc định `room.spawn`.
 * @returns {{ x: number, y: number, face: string }}
 */
export function entrancePoint(room, fromRoomId) {
  return (fromRoomId && room.entrances?.[fromRoomId]) || room.spawn
}
