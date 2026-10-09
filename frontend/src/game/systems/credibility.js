import { CREDIBILITY } from '../constants/gameplay'

/**
 * Thanh Uy Tín — Project.docx §3.3:
 *   credibility = max(0, credibility − ΔP)
 * Hàm thuần (không phụ thuộc Phaser) -> unit test được.
 */
export function applyPenalty(current, penalty) {
  if (!Number.isFinite(current) || !Number.isFinite(penalty)) {
    throw new TypeError(`applyPenalty: tham số phải là số (current=${current}, penalty=${penalty})`)
  }
  if (penalty < 0) {
    throw new RangeError(`applyPenalty: ΔP không được âm (penalty=${penalty})`)
  }
  return Math.max(CREDIBILITY.MIN, current - penalty)
}

/** §3.3: credibility = 0 -> Bad Ending. */
export function isDepleted(current) {
  return current <= CREDIBILITY.MIN
}
