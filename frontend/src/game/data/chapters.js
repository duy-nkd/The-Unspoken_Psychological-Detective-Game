/**
 * Dữ liệu kịch bản theo chương — Data Contract 2.0 (DEC-016, kế hoạch `docs/NARRATIVE_ENGINE_PLAN.md` N0).
 *
 * File dữ liệu nằm ở `public/assets/chapters/chapter<N>/` (chép nguyên từ gói `docs/sources/chapter1/data/`,
 * đã kiểm SHA-256 khớp MANIFEST khi nhập — T-034). Đây là bản game ĐỌC; bản trong `docs/sources/` là nguồn gốc,
 * không sửa. Nhóm sửa lời thoại thì sửa bản trong `public/assets/chapters/…` rồi chạy
 * `python scripts/chapter1/validate.py` để kiểm tra lại.
 *
 * Không nạp `source-map.json` (chỉ dùng khi viết/đối chiếu kịch bản) và KHÔNG bao giờ hiển thị
 * `deduction.answerKey` cho người chơi (DATA_CONTRACT "Press và Present").
 */
export const CHAPTER_DATA = Object.freeze({
  1: Object.freeze({
    contractVersion: '2.0.0',
    baseUrl: 'assets/chapters/chapter1/',
    files: Object.freeze({
      /** Mạng nút (1.257 nút), luật Press/Present, suy luận, chính sách runtime. */
      graph: Object.freeze({ key: 'chapter1-graph', file: 'chapter1.json' }),
      /** Danh mục 12 vật chứng — chỉ là mẫu; vật chứng người chơi đã thu nằm trong state. */
      evidence: Object.freeze({ key: 'chapter1-evidence', file: 'evidence.json' }),
      /** Danh mục nhân vật (mẫu). */
      people: Object.freeze({ key: 'chapter1-people', file: 'people.json' }),
      /** Danh mục lời khai (mẫu). */
      statements: Object.freeze({ key: 'chapter1-statements', file: 'statements.json' }),
      /** State v2 ban đầu, chính sách lưu, mức phạt. */
      state: Object.freeze({ key: 'chapter1-state', file: 'game-state.definitions.json' }),
    }),
  }),
})

/** Đường dẫn (tương đối với thư mục public) của một file dữ liệu chương. */
export function chapterFileUrl(chapter, name) {
  const entry = CHAPTER_DATA[chapter]
  if (!entry) throw new RangeError(`Chưa có dữ liệu cho chương ${chapter}`)
  const file = entry.files[name]
  if (!file) throw new RangeError(`Chương ${chapter} không có file dữ liệu "${name}"`)
  return entry.baseUrl + file.file
}
