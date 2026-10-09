import { env } from '@/config/env'

/**
 * Logger có namespace: mọi log đều có tiền tố [Namespace] để lọc trong DevTools.
 *   const log = createLogger('SaveService')
 *   log.debug('autosave', payload)   // chỉ in khi env.debug = true
 *   log.warn(...) / log.error(...)   // luôn in
 *
 * Quy ước: KHÔNG gọi console.* trực tiếp ở nơi khác (ESLint cảnh báo no-console).
 */
export function createLogger(namespace) {
  const tag = `[${namespace}]`
  return {
    debug: (...args) => env.debug && console.debug(tag, ...args),
    info: (...args) => env.debug && console.info(tag, ...args),
    warn: (...args) => console.warn(tag, ...args),
    error: (...args) => console.error(tag, ...args),
  }
}
