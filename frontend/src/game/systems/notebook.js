/**
 * Sổ tay điều tra — Project.docx §3.2: ĐÚNG 4 tab Evidence, People, Timeline, Statements.
 *
 * PENDING(ISS-06): cấu trúc từng mục (entry) chưa được đặc tả. Tạm thời mỗi entry là object
 * bắt buộc có `id` (chuỗi, duy nhất trong tab — với Evidence nên dùng evidence_code §2.1),
 * các trường còn lại giữ nguyên như dữ liệu truyền vào.
 */
export const NOTEBOOK_TABS = Object.freeze([
  Object.freeze({ id: 'evidence', label: 'Evidence' }),
  Object.freeze({ id: 'people', label: 'People' }),
  Object.freeze({ id: 'timeline', label: 'Timeline' }),
  Object.freeze({ id: 'statements', label: 'Statements' }),
])

const TAB_IDS = NOTEBOOK_TABS.map((tab) => tab.id)

export function createEmptyNotebook() {
  return Object.fromEntries(TAB_IDS.map((id) => [id, []]))
}

/**
 * Trả về notebook MỚI (không sửa object cũ) có thêm entry.
 * Entry trùng id trong cùng tab -> bỏ qua (nhặt lại vật chứng không nhân đôi).
 */
export function addEntry(notebook, tabId, entry) {
  if (!TAB_IDS.includes(tabId)) {
    throw new RangeError(`Tab "${tabId}" không tồn tại. Hợp lệ: ${TAB_IDS.join(', ')}`)
  }
  if (!entry || typeof entry.id !== 'string' || entry.id.length === 0) {
    throw new TypeError('Entry sổ tay phải có `id` dạng chuỗi')
  }
  if (notebook[tabId].some((existing) => existing.id === entry.id)) return notebook
  return { ...notebook, [tabId]: [...notebook[tabId], entry] }
}
