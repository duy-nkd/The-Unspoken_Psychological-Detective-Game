import { useEffect, useMemo, useRef, useState } from 'react'
import {
  createAdminEvidence,
  deleteAdminEvidence,
  fetchAdminEvidence,
  seedAdminChapter1Evidence,
  updateAdminEvidence,
} from '../api/adminApi'

const EMPTY_FORM = {
  chapterId: 1,
  evidenceCode: '',
  evidenceName: '',
  description: '',
  imageUrl: '',
}

const MAX_IMAGE_WIDTH = 360

/**
 * Nén ảnh tải lên thành chuỗi Data URL gọn nhẹ (WebP/JPEG) để lưu thẳng vào cột TEXT.
 */
function resizeImageFileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh đã chọn.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Định dạng ảnh không hợp lệ.'))
      img.onload = () => {
        const scale = img.width > MAX_IMAGE_WIDTH ? MAX_IMAGE_WIDTH / img.width : 1
        const w = Math.max(1, Math.round(img.width * scale))
        const h = Math.max(1, Math.round(img.height * scale))
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        const dataUrl = canvas.toDataURL('image/webp', 0.82)
        resolve(dataUrl)
      }
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

/**
 * Trang 4: Quản lý Danh mục Bằng chứng chuẩn toàn hệ thống (Thêm, sửa, xóa, đính kèm ảnh, lọc và nạp mẫu).
 */
export function AdminEvidencePage() {
  const [evidenceList, setEvidenceList] = useState([])
  const [chapterFilter, setChapterFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const fileInputRef = useRef(null)

  useEffect(() => {
    let active = true
    fetchAdminEvidence()
      .then((data) => {
        if (!active) return
        setEvidenceList(data)
        setError('')
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Không thể tải danh mục bằng chứng.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const filteredList = useMemo(() => {
    return evidenceList.filter((ev) => {
      if (chapterFilter !== 'ALL' && Number(ev.chapterId) !== Number(chapterFilter)) {
        return false
      }
      const q = search.trim().toLowerCase()
      if (!q) return true
      return (
        ev.evidenceCode?.toLowerCase().includes(q) ||
        ev.evidenceName?.toLowerCase().includes(q) ||
        ev.description?.toLowerCase().includes(q)
      )
    })
  }, [evidenceList, chapterFilter, search])

  const openCreateForm = () => {
    setEditingId(null)
    setFormData(EMPTY_FORM)
    setError('')
    setSuccessMsg('')
    setShowForm(true)
  }

  const openEditForm = (ev) => {
    setEditingId(ev.id)
    setFormData({
      chapterId: ev.chapterId ?? 1,
      evidenceCode: ev.evidenceCode ?? '',
      evidenceName: ev.evidenceName ?? '',
      description: ev.description ?? '',
      imageUrl: ev.imageUrl ?? '',
    })
    setError('')
    setSuccessMsg('')
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData(EMPTY_FORM)
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    try {
      const dataUrl = await resizeImageFileToDataUrl(file)
      setFormData((prev) => ({ ...prev, imageUrl: dataUrl }))
    } catch (err) {
      setError(err.message || 'Không thể xử lý ảnh đã chọn.')
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccessMsg('')
    try {
      const payload = {
        chapterId: Number(formData.chapterId),
        evidenceCode: formData.evidenceCode.trim(),
        evidenceName: formData.evidenceName.trim(),
        description: formData.description.trim(),
        imageUrl: formData.imageUrl.trim() || null,
      }
      if (editingId) {
        const updated = await updateAdminEvidence(editingId, payload)
        setEvidenceList((prev) => prev.map((item) => (item.id === editingId ? updated : item)))
        setSuccessMsg(`Đã cập nhật vật chứng "${updated.evidenceName}".`)
      } else {
        const created = await createAdminEvidence(payload)
        setEvidenceList((prev) => [...prev, created])
        setSuccessMsg(`Đã thêm vật chứng mới "${created.evidenceName}".`)
      }
      closeForm()
    } catch (err) {
      setError(err.message || 'Không thể lưu thông tin vật chứng.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (ev) => {
    setError('')
    setSuccessMsg('')
    try {
      await deleteAdminEvidence(ev.id)
      setEvidenceList((prev) => prev.filter((item) => item.id !== ev.id))
      setSuccessMsg(`Đã xóa vật chứng "${ev.evidenceName}".`)
    } catch (err) {
      setError(err.message || 'Không thể xóa vật chứng.')
    }
  }

  const handleSeedChapter1 = async () => {
    setSeeding(true)
    setError('')
    setSuccessMsg('')
    try {
      const data = await seedAdminChapter1Evidence()
      setEvidenceList(data)
      setSuccessMsg('Đã nạp bộ 12 vật chứng chuẩn của Chương 1.')
    } catch (err) {
      setError(err.message || 'Không thể nạp danh mục bằng chứng Chương 1.')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Kho dữ liệu vụ án
          </span>
          <h1 className="mt-0.5 text-2xl font-bold text-[#f4efe6]">
            Quản lý Danh mục Chứng cứ Toàn hệ thống
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={openCreateForm}
            className="rounded border border-amber-400 bg-amber-400 px-3.5 py-1.5 text-xs font-semibold text-[#17151b] transition hover:bg-amber-300"
          >
            + Thêm vật chứng mới
          </button>
          <button
            type="button"
            disabled={seeding}
            onClick={handleSeedChapter1}
            className="rounded border border-[#5c5266] bg-[#241f2b] px-3.5 py-1.5 text-xs font-medium text-[#f4efe6] transition hover:border-amber-400 hover:text-amber-300 disabled:opacity-50"
          >
            {seeding ? 'Đang nạp mẫu…' : 'Nạp 12 vật chứng mẫu Chương 1'}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded border border-[#d9534f] bg-[#d9534f]/10 p-4 text-xs text-[#f28b88]">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="rounded border border-emerald-500/50 bg-emerald-500/10 p-4 text-xs text-emerald-300">
          {successMsg}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmitForm}
          className="space-y-4 rounded border border-amber-400/50 bg-[#241f2b] p-5 shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-[#3d3546] pb-3">
            <h2 className="text-base font-bold text-[#f4efe6]">
              {editingId ? 'Chỉnh sửa thông tin vật chứng' : 'Thêm vật chứng mới vào hệ thống'}
            </h2>
            <button
              type="button"
              onClick={closeForm}
              className="text-xs text-[#a89f94] hover:text-[#f4efe6]"
            >
              Đóng
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-medium text-[#a89f94]">Thuộc chương</label>
              <select
                value={formData.chapterId}
                onChange={(e) => setFormData((p) => ({ ...p, chapterId: Number(e.target.value) }))}
                className="mt-1 w-full rounded border border-[#5c5266] bg-[#17151b] px-3 py-2 text-sm text-[#f4efe6] focus:border-amber-400 focus:outline-none"
              >
                {[1, 2, 3, 4, 5].map((ch) => (
                  <option key={ch} value={ch}>
                    Chương {ch}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#a89f94]">
                Mã định danh (ví dụ: EV_NewItem)
              </label>
              <input
                type="text"
                required
                maxLength={50}
                value={formData.evidenceCode}
                onChange={(e) => setFormData((p) => ({ ...p, evidenceCode: e.target.value }))}
                placeholder="Nhập mã vật chứng..."
                className="mt-1 w-full rounded border border-[#5c5266] bg-[#17151b] px-3 py-2 font-mono text-sm text-[#f4efe6] placeholder-[#6f6874] focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#a89f94]">
                Tên hiển thị vật chứng
              </label>
              <input
                type="text"
                required
                maxLength={100}
                value={formData.evidenceName}
                onChange={(e) => setFormData((p) => ({ ...p, evidenceName: e.target.value }))}
                placeholder="Ví dụ: Ống hít hen suyễn"
                className="mt-1 w-full rounded border border-[#5c5266] bg-[#17151b] px-3 py-2 text-sm text-[#f4efe6] placeholder-[#6f6874] focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-[#a89f94]">
                Hình ảnh vật chứng (Tải ảnh từ máy hoặc dán đường dẫn URL)
              </label>
              <div className="mt-1 flex flex-wrap gap-2">
                <input
                  type="text"
                  value={formData.imageUrl.startsWith('data:') ? '' : formData.imageUrl}
                  onChange={(e) => setFormData((p) => ({ ...p, imageUrl: e.target.value }))}
                  placeholder={
                    formData.imageUrl.startsWith('data:')
                      ? 'Đã chọn tệp ảnh từ máy tính'
                      : 'Dán đường dẫn ảnh (ví dụ: /assets/images/...)'
                  }
                  className="min-w-48 flex-1 rounded border border-[#5c5266] bg-[#17151b] px-3 py-2 text-sm text-[#f4efe6] placeholder-[#6f6874] focus:border-amber-400 focus:outline-none"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded border border-amber-400/60 bg-amber-400/10 px-3.5 py-2 text-xs font-semibold text-amber-300 transition hover:bg-amber-400 hover:text-[#17151b]"
                >
                  📁 Chọn ảnh từ máy
                </button>
                {formData.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, imageUrl: '' }))}
                    className="rounded border border-[#5c5266] px-3 py-2 text-xs text-[#a89f94] hover:text-[#f28b88]"
                  >
                    Gỡ ảnh
                  </button>
                )}
              </div>

              <label className="mt-3 block text-xs font-medium text-[#a89f94]">
                Mô tả chi tiết vật chứng
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                placeholder="Nhập nội dung mô tả chi tiết của vật chứng tại hiện trường..."
                className="mt-1 w-full rounded border border-[#5c5266] bg-[#17151b] px-3 py-2 text-sm text-[#f4efe6] placeholder-[#6f6874] focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col items-center justify-center rounded border border-dashed border-[#5c5266] bg-[#17151b] p-3">
              <span className="mb-2 text-[11px] font-medium text-[#a89f94]">
                Xem trước hình ảnh
              </span>
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="Xem trước vật chứng"
                  className="h-32 w-full rounded object-contain"
                />
              ) : (
                <div className="flex h-32 w-full items-center justify-center rounded bg-[#241f2b]/60 text-xs text-[#6f6874]">
                  Chưa có ảnh đính kèm
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-1">
            <button
              type="button"
              onClick={closeForm}
              className="rounded border border-[#5c5266] px-4 py-1.5 text-xs font-medium text-[#a89f94] hover:text-[#f4efe6]"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded bg-amber-400 px-4 py-1.5 text-xs font-semibold text-[#17151b] hover:bg-amber-300 disabled:opacity-50"
            >
              {submitting ? 'Đang lưu…' : editingId ? 'Lưu thay đổi' : 'Tạo vật chứng'}
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded border border-[#5c5266]/60 bg-[#241f2b] p-4">
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 1, 2, 3, 4, 5].map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => setChapterFilter(ch)}
              className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                chapterFilter === ch
                  ? 'bg-amber-400 font-semibold text-[#17151b]'
                  : 'border border-[#5c5266] bg-[#17151b] text-[#a89f94] hover:text-[#f4efe6]'
              }`}
            >
              {ch === 'ALL' ? 'Tất cả chương' : `Chương ${ch}`}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên hoặc mã vật chứng..."
          className="w-full max-w-xs rounded border border-[#5c5266] bg-[#17151b] px-3 py-1.5 text-sm text-[#f4efe6] placeholder-[#6f6874] focus:border-amber-400 focus:outline-none"
        />
      </div>

      {loading ? (
        <p className="text-sm text-[#a89f94]">Đang tải danh mục chứng cứ…</p>
      ) : filteredList.length === 0 ? (
        <div className="rounded border border-[#5c5266]/60 bg-[#241f2b] p-8 text-center">
          <p className="text-base font-semibold text-[#f4efe6]">
            Chưa có vật chứng nào trong danh sách hiện tại.
          </p>
          <p className="mt-1 text-xs text-[#a89f94]">
            Bạn có thể bấm &ldquo;+ Thêm vật chứng mới&rdquo; để tự tạo vật chứng hoặc bấm
            &ldquo;Nạp 12 vật chứng mẫu Chương 1&rdquo; ở góc trên.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredList.map((ev) => (
            <article
              key={ev.id}
              className="flex flex-col justify-between rounded border border-[#5c5266]/60 bg-[#241f2b] p-5 transition hover:border-[#5c5266]"
            >
              <div className="flex gap-4">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded border border-[#3d3546] bg-[#17151b]">
                  {ev.imageUrl ? (
                    <img
                      src={ev.imageUrl}
                      alt={ev.evidenceName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-2 text-center text-[10px] text-[#6f6874]">
                      <span>Chưa có ảnh</span>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 border-b border-[#3d3546] pb-2">
                    <span className="truncate font-mono text-xs font-bold text-amber-300">
                      {ev.evidenceCode}
                    </span>
                    <span className="shrink-0 rounded border border-[#5c5266] bg-[#17151b] px-2.5 py-0.5 text-xs font-medium text-[#a89f94]">
                      Chương {ev.chapterId}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-[#f4efe6]">{ev.evidenceName}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#a89f94]">{ev.description}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2 border-t border-[#2f2937] pt-3">
                <button
                  type="button"
                  onClick={() => openEditForm(ev)}
                  className="rounded border border-[#5c5266] bg-[#17151b] px-3 py-1 text-xs font-medium text-[#f4efe6] transition hover:border-amber-400 hover:text-amber-300"
                >
                  Chỉnh sửa / Đổi ảnh
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(ev)}
                  className="rounded border border-[#d9534f]/50 bg-[#d9534f]/10 px-3 py-1 text-xs font-medium text-[#f28b88] transition hover:bg-[#d9534f] hover:text-white"
                >
                  Xóa
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
