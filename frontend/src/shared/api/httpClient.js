import axios from 'axios'
import { env } from '@/config/env'
import { createLogger } from '@/shared/logger/logger'
import { storage } from '@/shared/storage/storage'
import { STORAGE_KEYS } from '@/shared/storage/storageKeys'

const log = createLogger('HTTP')

/**
 * Axios instance dùng chung (Project.docx §1.2 Bước 1):
 * - JSON payload
 * - Tự gắn header `Authorization: Bearer <token>` qua tokenProvider
 * - Chuẩn hóa lỗi thành ApiError để UI hiển thị thống nhất
 */
export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Token đọc thẳng từ storage (AuthProvider ghi vào đó khi login) -> luôn có ngay từ request đầu tiên
const tokenProvider = () => storage.get(STORAGE_KEYS.AUTH_SESSION)?.token ?? null
let onUnauthorized = () => {}

/** AuthProvider đăng ký phản ứng khi server trả 401. Tránh vòng import auth <-> http. */
export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler
}

export class ApiError extends Error {
  constructor({ message, status = null, isNetworkError = false, data = null }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.isNetworkError = isNetworkError
    this.data = data
  }
}

httpClient.interceptors.request.use((config) => {
  const token = tokenProvider()
  if (token) config.headers.Authorization = `Bearer ${token}`
  log.debug(config.method?.toUpperCase(), config.url)
  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? null
    if (status === 401) onUnauthorized()

    const apiError = new ApiError({
      message: error.response?.data?.message || error.message || 'Lỗi không xác định',
      status,
      isNetworkError: !error.response, // mất mạng / server tắt -> dùng cho Hybrid Storage
      data: error.response?.data ?? null,
    })
    log.warn(`${error.config?.method?.toUpperCase()} ${error.config?.url} thất bại`, apiError)
    return Promise.reject(apiError)
  },
)
