/**
 * Đọc/ghi giá trị trong state theo đường dẫn dạng `/a/b/c` (Data Contract 2.0 — DEC-016, kế hoạch N1).
 *
 * Ngữ nghĩa giữ ĐÚNG như `validate_data.py` của gói Chương 1 (hàm `get`/`put`):
 *   - chỉ đi xuyên qua object thường (không đánh chỉ số mảng: `/evidence_collected/0` → null);
 *   - thiếu bất kỳ đoạn nào → `null` (giống `None` của Python), không ném lỗi;
 *   - ghi tạo object trung gian còn thiếu và luôn ghi BẢN SAO của giá trị (không dùng chung tham chiếu).
 * Đường dẫn điều kiện (`/state/...`, `/bindings/...`, `/input/...`) tính từ ngữ cảnh của expr.js;
 * đường dẫn hiệu ứng (`/flags/...`, `/deduction/...`) tính từ gốc state.
 */

/** Tên khóa không bao giờ được đọc/ghi qua đường dẫn (chặn ghi đè prototype khi dữ liệu/save bị sửa tay). */
const FORBIDDEN_KEYS = new Set(['__proto__', 'prototype', 'constructor'])

/** Tách `/a/b/c` → ['a', 'b', 'c']. Đường dẫn sai định dạng là lỗi dữ liệu → ném lỗi ngay. */
export function parsePath(path) {
  if (typeof path !== 'string' || !path.startsWith('/')) {
    throw new TypeError(`Đường dẫn state phải là chuỗi bắt đầu bằng "/": ${JSON.stringify(path)}`)
  }
  const parts = path.replace(/^\/+|\/+$/g, '').split('/')
  for (const part of parts) {
    if (part === '') throw new TypeError(`Đường dẫn state có đoạn rỗng: ${path}`)
    if (FORBIDDEN_KEYS.has(part)) throw new TypeError(`Đường dẫn state dùng khóa bị cấm: ${path}`)
  }
  return parts
}

/** Object JSON thường (không phải mảng, không phải null). */
export function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Đọc giá trị tại `path`; thiếu → null. Trả về chính tham chiếu trong state (người gọi không được sửa). */
export function getPath(root, path) {
  let node = root
  for (const part of parsePath(path)) {
    if (!isPlainObject(node) || !Object.hasOwn(node, part)) return null
    node = node[part]
  }
  return node === undefined ? null : node
}

/**
 * Ghi BẢN SAO của `value` vào `path` (sửa trực tiếp `root`). Thiếu object trung gian thì tạo;
 * gặp giá trị trung gian không phải object (null, số, mảng) → ném lỗi thay vì ghi đè âm thầm (Python cũng lỗi).
 * Hiệu ứng nhiều bước nên chạy trên bản sao state rồi mới thay state thật (giao dịch — N2).
 */
export function setPath(root, path, value) {
  if (!isPlainObject(root)) throw new TypeError('setPath: gốc state phải là object')
  const parts = parsePath(path)
  let node = root
  for (const part of parts.slice(0, -1)) {
    if (!Object.hasOwn(node, part)) node[part] = {}
    if (!isPlainObject(node[part])) {
      throw new TypeError(`setPath: "${part}" trong ${path} không phải object`)
    }
    node = node[part]
  }
  node[parts[parts.length - 1]] = cloneJson(value)
  return root
}

/** Sao chép sâu giá trị JSON (state, literal). `undefined` → null để state luôn là JSON hợp lệ. */
export function cloneJson(value) {
  if (value === undefined) return null
  if (value === null || typeof value !== 'object') return value
  return structuredClone(value)
}
