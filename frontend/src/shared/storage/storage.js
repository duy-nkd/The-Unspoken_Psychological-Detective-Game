import { createLogger } from '@/shared/logger/logger'

const log = createLogger('Storage')

/**
 * Bọc localStorage: tự JSON hóa và KHÔNG BAO GIỜ ném lỗi
 * (localStorage có thể bị chặn ở chế độ ẩn danh / đầy bộ nhớ).
 */
export const storage = {
  get(key, fallback = null) {
    try {
      const value = globalThis.localStorage?.getItem(key)
      return value === null || value === undefined ? fallback : JSON.parse(value)
    } catch (error) {
      log.warn(`Không đọc được key "${key}"`, error)
      return fallback
    }
  },

  set(key, value) {
    try {
      globalThis.localStorage?.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      log.warn(`Không ghi được key "${key}"`, error)
      return false
    }
  },

  remove(key) {
    try {
      globalThis.localStorage?.removeItem(key)
    } catch (error) {
      log.warn(`Không xóa được key "${key}"`, error)
    }
  },
}
