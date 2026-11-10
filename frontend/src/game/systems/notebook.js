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

/** Nhãn giao diện dựa vào lần ghi nhận gốc, kể cả khi hiện trường được khám lại ở Phase 3. */
export function notebookSourceKey(entry) {
  const origin = entry.source_node ?? entry.source_step
  if (entry.physical_custody === 'public_document') return 'notebook.source.hallwayCertificate'
  if (origin?.startsWith('P4_COIN_RECORD') || origin?.startsWith('P4_SURVEY_')) {
    return 'notebook.source.policeArchivePhoto'
  }
  if (entry.source_kind === 'professional_record') return 'notebook.source.policeRecord'
  if (origin?.startsWith('P2_SURVEY')) return 'notebook.source.room204Observation'
  if (origin?.startsWith('P2_')) return 'notebook.source.room204Photo'
  if (entry.source_kind === 'source_node' && entry.speaker) return 'notebook.source.interview'
  if (entry.source_kind === 'observed' || (origin && entry.status === 'observed')) {
    return 'notebook.source.observation'
  }
  return null
}
