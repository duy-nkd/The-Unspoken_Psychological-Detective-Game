/**
 * Vận tốc đi trên sàn 2.5D (DEC-020). Logic thuần -> test được.
 *
 * Sàn bị nén theo chiều dọc màn hình: cùng một bước chân, đi ngang được `horizontal` px (220) nhưng đi lên/xuống chỉ
 * `vertical` px (88) — hoạt ảnh V6c khớp chân đúng 2 tốc độ này. Hướng đi vì thế tính trên MẶT SÀN: chia trục ngang cho
 * `horizontal`, trục dọc cho `vertical`, rồi chuẩn hóa → nhịp bước luôn như nhau, tốc độ màn hình đổi dần giữa 220 và 88.
 * Giá trị trả về là px/giây ở mốc gần; nhân thêm hệ số phối cảnh (systems/depthScale.speedFactorAt) khi dùng.
 */

/**
 * Đi tới một điểm (bấm chuột / đường đi): GIỮ hướng trên màn hình, độ lớn theo elip ngang/dọc.
 * @param {number} dx hiệu tọa độ màn hình tới đích
 * @param {number} dy
 * @param {{ horizontal: number, vertical: number }} speeds
 * @returns {{ x: number, y: number }} px/giây
 */
export function velocityToward(dx, dy, speeds) {
  const groundLength = Math.hypot(dx / speeds.horizontal, dy / speeds.vertical)
  if (groundLength === 0) return { x: 0, y: 0 }
  return { x: dx / groundLength, y: dy / groundLength }
}

/**
 * Đi bằng phím: hướng bấm là hướng trên MẶT SÀN (phím chéo = đường chéo của sàn).
 * @param {number} ix -1..1
 * @param {number} iy -1..1
 * @returns {{ x: number, y: number }} px/giây
 */
export function velocityFromInput(ix, iy, speeds) {
  const length = Math.hypot(ix, iy)
  if (length === 0) return { x: 0, y: 0 }
  return { x: (speeds.horizontal * ix) / length, y: (speeds.vertical * iy) / length }
}

/** Đổi vận tốc màn hình về hướng trên mặt sàn (để chọn hoạt ảnh theo trục trội). */
export function groundDirection(vx, vy, speeds) {
  return { x: vx / speeds.horizontal, y: vy / speeds.vertical }
}

/**
 * Quãng vừa đi quy ra "thời gian bước" — số ms mà nhân vật cần để đi quãng đó ở tốc độ chuẩn tại chỗ đứng (T-040).
 * Khung hình chạy theo QUÃNG ĐƯỜNG THẬT chứ không theo đồng hồ: bị tường chặn / trượt dọc vật cản thì bước chậm lại
 * đúng bằng phần đi được, không "giậm chân tại chỗ".
 * @param {number} movedX quãng màn hình vừa đi (px)
 * @param {number} movedY
 * @param {{ horizontal: number, vertical: number }} speeds px/giây ở mốc gần
 * @param {number} factor hệ số phối cảnh tại chỗ đứng (systems/depthScale.speedFactorAt)
 * @returns {number} ms
 */
export function strideProgressMs(movedX, movedY, speeds, factor) {
  if (!(factor > 0)) return 0
  return (Math.hypot(movedX / speeds.horizontal, movedY / speeds.vertical) / factor) * 1000
}

/**
 * Một nhịp của chu kỳ đi — chọn khung (DEC-020; sửa T-040).
 *
 * Nhân vật được VẼ ở vị trí liên tục (mượt ở 60 hình/giây). Bản T-039 chỉ dời hình lúc đổi khung để chân chống không
 * trượt, nhưng cả người nhảy từng nấc 24 (ngang) / 12 (dọc) lần/giây → người chơi thấy giật. Đánh đổi hiện tại: chân chống
 * lệch tối đa 1 khung (≈ 9 px ngang, 7 px dọc ở mốc gần) rồi về đúng chỗ — như đa số game 2D.
 * Khung đổi theo `progressMs` (strideProgressMs) nên nhịp bước luôn khớp quãng đường đã đi.
 *
 * @param {{ facing: string, clock: number, index: number } | null} cycle nhịp trước; null = vừa bắt đầu đi
 * @param {{ facing: string, progressMs: number, frameRate: number, frameCount: number }} tick
 * @returns {{ facing: string, clock: number, index: number }}
 */
export function advanceWalkCycle(cycle, { facing, progressMs, frameRate, frameCount }) {
  const period = 1000 / frameRate
  const restart = !cycle || cycle.facing !== facing
  const clock = ((restart ? 0 : cycle.clock) + Math.max(0, progressMs)) % (period * frameCount)
  return { facing, clock, index: Math.floor(clock / period) }
}
