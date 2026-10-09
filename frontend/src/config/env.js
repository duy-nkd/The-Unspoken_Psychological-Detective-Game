/**
 * Điểm DUY NHẤT đọc biến môi trường (import.meta.env).
 * Module khác chỉ import từ đây -> dễ tìm, dễ mock khi test.
 */
const raw = import.meta.env ?? {}

export const env = Object.freeze({
  apiBaseUrl: raw.VITE_API_URL || 'http://localhost:8080/api',
  isDev: Boolean(raw.DEV),
  // VITE_DEBUG=true|false ghi đè; để trống -> bật khi dev
  debug: raw.VITE_DEBUG ? raw.VITE_DEBUG === 'true' : Boolean(raw.DEV),
})
