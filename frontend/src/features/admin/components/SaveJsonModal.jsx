import { useMemo, useState } from 'react'

/**
 * Hộp thoại xem chi tiết tiến trình điều tra và Sổ tay của người chơi.
 * Liên kết trực tiếp với Danh mục Chứng cứ (evidenceCatalog) để hiển thị ảnh, tên tiếng Việt và mô tả.
 */
export function SaveJsonModal({ saveDetail, evidenceCatalog = [], onClose }) {
  const [viewMode, setViewMode] = useState('structured')

  const evidenceByCode = useMemo(() => {
    const map = new Map()
    for (const item of evidenceCatalog) {
      if (item?.evidenceCode) {
        map.set(item.evidenceCode, item)
      }
    }
    return map
  }, [evidenceCatalog])

  const parsed = useMemo(() => {
    if (!saveDetail?.saveDataJson) return { ok: false, error: 'Chưa có dữ liệu sổ tay', data: null }
    try {
      const data = JSON.parse(saveDetail.saveDataJson)
      return { ok: true, error: null, data }
    } catch (err) {
      return { ok: false, error: err.message, data: null }
    }
  }, [saveDetail])

  if (!saveDetail) return null

  const stateObj = parsed.data?.state ?? parsed.data ?? {}
  const notebookSummary = extractNotebookSummary(stateObj)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded border border-[#5c5266] bg-[#17151b] text-[#f4efe6] shadow-2xl">
        <header className="flex items-center justify-between border-b border-[#3d3546] bg-[#241f2b] px-6 py-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Hồ sơ tiến trình điều tra #{saveDetail.saveId}
            </span>
            <h2 className="mt-0.5 text-lg font-bold">
              Thám tử: {saveDetail.username}{' '}
              <span className="text-xs font-normal text-[#a89f94]">({saveDetail.email})</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-[#5c5266] px-3 py-1 text-xs font-medium text-[#a89f94] hover:border-amber-400 hover:text-amber-300"
          >
            Đóng
          </button>
        </header>

        <div className="grid grid-cols-2 gap-3 border-b border-[#3d3546] bg-[#241f2b]/50 px-6 py-3 text-xs sm:grid-cols-4">
          <div>
            <span className="text-[#a89f94]">Chương hiện tại:</span>
            <p className="mt-0.5 text-sm font-semibold text-amber-300">
              Chương {saveDetail.currentChapter}
            </p>
          </div>
          <div>
            <span className="text-[#a89f94]">Điểm uy tín:</span>
            <p className="mt-0.5 text-sm font-semibold text-emerald-300">
              {saveDetail.credibilityScore} / 100
            </p>
          </div>
          <div>
            <span className="text-[#a89f94]">Trạng thái bản lưu:</span>
            <p
              className={`mt-0.5 text-sm font-semibold ${
                parsed.ok ? 'text-emerald-400' : 'text-[#ef6b67]'
              }`}
            >
              {parsed.ok ? 'Toàn vẹn' : 'Dữ liệu lỗi'}
            </p>
          </div>
          <div>
            <span className="text-[#a89f94]">Cập nhật lần cuối:</span>
            <p className="mt-0.5 text-sm text-[#f4efe6]">{formatDateTime(saveDetail.updatedAt)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-[#3d3546] px-6 py-2.5">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setViewMode('structured')}
              className={`rounded px-3.5 py-1.5 text-xs font-medium transition ${
                viewMode === 'structured'
                  ? 'bg-amber-400 font-semibold text-[#17151b]'
                  : 'border border-[#5c5266] text-[#a89f94] hover:text-[#f4efe6]'
              }`}
            >
              Sổ tay điều tra (4 mục)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('raw')}
              className={`rounded px-3.5 py-1.5 text-xs font-medium transition ${
                viewMode === 'raw'
                  ? 'bg-amber-400 font-semibold text-[#17151b]'
                  : 'border border-[#5c5266] text-[#a89f94] hover:text-[#f4efe6]'
              }`}
            >
              Chi tiết kỹ thuật
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!parsed.ok ? (
            <div className="rounded border border-[#d9534f] bg-[#d9534f]/10 p-4 text-xs text-[#f28b88]">
              Không thể đọc dữ liệu sổ tay: {parsed.error}
            </div>
          ) : viewMode === 'structured' ? (
            <div className="space-y-5">
              {/* Khối Vật chứng đã thu thập — Liên kết trực tiếp với Danh mục Chứng cứ */}
              <div className="rounded border border-[#3d3546] bg-[#241f2b] p-4">
                <div className="flex items-center justify-between border-b border-[#3d3546] pb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Vật chứng đã thu thập trong Sổ tay
                  </span>
                  <span className="rounded bg-amber-400/20 px-2 py-0.5 font-mono text-xs font-bold text-amber-300">
                    {notebookSummary.evidence.length} vật chứng
                  </span>
                </div>

                {notebookSummary.evidence.length === 0 ? (
                  <p className="mt-3 text-xs text-[#6f6874] italic">
                    Người chơi chưa thu thập vật chứng nào.
                  </p>
                ) : (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {notebookSummary.evidence.map((code) => {
                      const catalogItem = evidenceByCode.get(code)
                      return (
                        <div
                          key={code}
                          className="flex gap-3 rounded border border-[#3d3546] bg-[#17151b] p-3"
                        >
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded border border-[#3d3546] bg-[#241f2b]">
                            {catalogItem?.imageUrl ? (
                              <img
                                src={catalogItem.imageUrl}
                                alt={catalogItem.evidenceName}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] text-[#6f6874]">
                                Không ảnh
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="truncate text-xs font-bold text-[#f4efe6]">
                                {catalogItem?.evidenceName || code}
                              </span>
                              <span className="shrink-0 font-mono text-[10px] text-amber-300">
                                {code}
                              </span>
                            </div>
                            <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#a89f94]">
                              {catalogItem?.description ||
                                'Chưa có mô tả trong Danh mục Chứng cứ (bấm nạp mẫu ở mục 04 để đồng bộ).'}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* 3 mục còn lại của Sổ tay */}
              <div className="grid gap-3 sm:grid-cols-3">
                <SummaryBox
                  title="Hồ sơ nhân vật"
                  count={notebookSummary.people.length}
                  items={notebookSummary.people}
                />
                <SummaryBox
                  title="Mốc thời gian"
                  count={notebookSummary.timeline.length}
                  items={notebookSummary.timeline}
                />
                <SummaryBox
                  title="Lời khai ghi nhận"
                  count={notebookSummary.statements.length}
                  items={notebookSummary.statements}
                />
              </div>

              <div className="rounded border border-[#3d3546] bg-[#241f2b] p-4 text-xs">
                <h4 className="font-semibold text-amber-300">Vị trí và tiến trình hiện tại</h4>
                <div className="mt-2 grid gap-2 text-[#a89f94] sm:grid-cols-3">
                  <div>
                    Phân cảnh cốt truyện:{' '}
                    <strong className="text-[#f4efe6]">
                      {notebookSummary.currentNodeId || 'Đang khám phá tự do'}
                    </strong>
                  </div>
                  <div>
                    Khu vực hiện tại:{' '}
                    <strong className="text-[#f4efe6]">
                      {notebookSummary.roomId || 'Phòng 201'}
                    </strong>
                  </div>
                  <div>
                    Hướng dẫn tân thủ:{' '}
                    <strong className="text-[#f4efe6]">
                      {notebookSummary.tutorialStep || 'Đã hoàn thành'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <pre className="max-h-96 overflow-auto rounded border border-[#3d3546] bg-[#0f0e12] p-4 font-mono text-xs leading-relaxed text-amber-200">
              {JSON.stringify(parsed.data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}

function SummaryBox({ title, count, items }) {
  return (
    <div className="rounded border border-[#3d3546] bg-[#241f2b] p-3">
      <div className="flex items-center justify-between border-b border-[#3d3546] pb-1.5">
        <span className="text-xs font-medium text-[#a89f94]">{title}</span>
        <span className="rounded bg-amber-400/20 px-1.5 py-0.5 font-mono text-xs font-bold text-amber-300">
          {count}
        </span>
      </div>
      <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto text-xs text-[#f4efe6]">
        {items.length === 0 ? (
          <li className="text-[#6f6874] italic">Chưa thu thập</li>
        ) : (
          items.map((id) => (
            <li key={id} className="truncate rounded bg-[#17151b] px-2 py-1 font-mono text-[11px]">
              • {id}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

function extractNotebookSummary(raw) {
  const nb = raw.notebook ?? {}
  const toList = (val) => {
    if (!val) return []
    if (Array.isArray(val)) {
      return val.map((item) => (typeof item === 'string' ? item : item?.id || JSON.stringify(item)))
    }
    if (typeof val === 'object') {
      return Object.keys(val)
    }
    return []
  }

  return {
    evidence: toList(raw.evidence ?? nb.evidence ?? nb.Evidence),
    people: toList(raw.people ?? nb.people ?? nb.People),
    timeline: toList(raw.timeline ?? nb.timeline ?? nb.Timeline),
    statements: toList(raw.statements ?? nb.statements ?? nb.Statements),
    currentNodeId: raw.currentNodeId ?? raw.current_node_id ?? null,
    roomId: raw.player?.roomId ?? raw.scene_location ?? null,
    tutorialStep: raw.tutorial?.step ?? null,
  }
}

function formatDateTime(value) {
  if (!value) return '—'
  return String(value).replace('T', ' ').slice(0, 19)
}
