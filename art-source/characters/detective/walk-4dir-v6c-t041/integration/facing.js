/**
 * Hướng nhìn + tên khung hình của nhân vật theo hướng đi (DEC-013, DEC-020). Logic thuần.
 *
 * Asset (V6c): 4 chu kỳ đi riêng — trái, phải (ảnh riêng, KHÔNG lật gương), lên, xuống — + 4 tư thế đứng.
 * Tên khung trong atlas: `walk-<hướng>-NN`, `idle-<hướng>` (scripts/art/build_detective_atlas.py).
 */
export const FACINGS = Object.freeze(['left', 'right', 'up', 'down'])

/**
 * Hướng theo vector trên MẶT SÀN (systems/locomotion.groundDirection): trục nào trội thì dùng hoạt ảnh trục đó;
 * bằng nhau (phím chéo) → ngang.
 * @param {number} gx
 * @param {number} gy
 * @param {string} previous hướng cũ — giữ nguyên khi đứng yên
 * @returns {'left'|'right'|'up'|'down'}
 */
export function facingFromVector(gx, gy, previous = 'down') {
  if (gx === 0 && gy === 0) return previous
  if (Math.abs(gx) >= Math.abs(gy)) return gx < 0 ? 'left' : 'right'
  return gy < 0 ? 'up' : 'down'
}

/** Hướng hợp lệ; dữ liệu cũ/hỏng → nhìn xuống. */
export function normalizeFacing(facing) {
  return FACINGS.includes(facing) ? facing : 'down'
}

/** Khung đứng yên của một hướng. */
export function idleFrameName(facing) {
  return `idle-${normalizeFacing(facing)}`
}

/** Khung thứ `index` (0-based) của chu kỳ đi một hướng. */
export function walkFrameName(facing, index) {
  return `walk-${normalizeFacing(facing)}-${String(index).padStart(2, '0')}`
}
