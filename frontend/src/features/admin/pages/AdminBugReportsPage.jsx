import { useCallback, useEffect, useState } from 'react'
import { fetchAdminBugReports, updateAdminBugStatus } from '../api/adminApi'
import { StatusBadge } from '../components/StatusBadge'

const POLL_INTERVAL_MS = 5000

/**
 * Trang 3: Quản lý Phản hồi & Báo cáo lỗi Thời gian thực.
 */
export function AdminBugReportsPage() {
  const [reports, setReports] = useState([])
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [livePoll, setLivePoll] = useState(true)
  const [lastSyncedAt, setLastSyncedAt] = useState('')
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')

  const loadReports = useCallback(async () => {
    try {
      const data = await fetchAdminBugReports(statusFilter)
      setReports(data)
      setLastSyncedAt(new Date().toLocaleTimeString('vi-VN'))
      setError('')
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách báo cáo lỗi.')
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    let active = true
    fetchAdminBugReports(statusFilter)
      .then((data) => {
        if (!active) return
        setReports(data)
        setLastSyncedAt(new Date().toLocaleTimeString('vi-VN'))
        setError('')
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Không thể tải danh sách báo cáo lỗi.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [statusFilter])

  useEffect(() => {
    if (!livePoll) return undefined
    const timer = setInterval(() => {
      loadReports()
    }, POLL_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [livePoll, loadReports])

  const handleToggleStatus = async (report) => {
    const nextStatus = report.status === 'PENDING' ? 'RESOLVED' : 'PENDING'
    setUpdatingId(report.id)
    setError('')
    try {
      const updated = await updateAdminBugStatus(report.id, nextStatus)
      setReports((prev) => prev.map((item) => (item.id === report.id ? updated : item)))
    } catch (err) {
      setError(err.message || 'Không thể cập nhật trạng thái báo cáo lỗi.')
    } finally {
      setUpdatingId(null)
    }
  }

  const filterLabels = {
    ALL: 'Tất cả báo cáo',
    PENDING: 'Chờ xử lý',
    RESOLVED: 'Đã khắc phục',
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Hỗ trợ & Vận hành
          </span>
          <h1 className="mt-0.5 text-2xl font-bold text-[#f4efe6]">
            Quản lý Phản hồi Lỗi từ Người chơi
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLivePoll((v) => !v)}
            className={`flex items-center gap-2 rounded border px-3 py-1.5 text-xs font-medium transition ${
              livePoll
                ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300'
                : 'border-[#5c5266] bg-[#241f2b] text-[#a89f94]'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                livePoll ? 'animate-ping bg-emerald-400' : 'bg-[#6f6874]'
              }`}
            />
            {livePoll ? 'Tự động cập nhật (5s): Bật' : 'Tự động cập nhật: Tắt'}
          </button>

          <button
            type="button"
            onClick={loadReports}
            className="rounded border border-[#5c5266] bg-[#241f2b] px-3.5 py-1.5 text-xs font-medium text-[#f4efe6] transition hover:border-amber-400 hover:text-amber-300"
          >
            ↻ Làm mới ngay
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded border border-[#5c5266]/60 bg-[#241f2b] p-4">
        <div className="flex gap-2">
          {['ALL', 'PENDING', 'RESOLVED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`rounded px-3.5 py-1.5 text-xs font-medium transition ${
                statusFilter === st
                  ? 'bg-amber-400 font-semibold text-[#17151b]'
                  : 'border border-[#5c5266] bg-[#17151b] text-[#a89f94] hover:text-[#f4efe6]'
              }`}
            >
              {filterLabels[st]}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#a89f94]">
          Đồng bộ lúc: <strong className="text-[#f4efe6]">{lastSyncedAt || '—'}</strong> · Tổng
          cộng: <strong className="text-amber-300">{reports.length}</strong> phản hồi
        </span>
      </div>

      {error && (
        <div className="rounded border border-[#d9534f] bg-[#d9534f]/10 p-4 text-xs text-[#f28b88]">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded border border-[#5c5266]/60 bg-[#241f2b]">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#3d3546] bg-[#17151b]/60 text-xs font-semibold uppercase text-[#a89f94]">
              <th className="px-4 py-3">Mã</th>
              <th className="px-4 py-3">Người gửi</th>
              <th className="px-4 py-3">Nội dung phản hồi</th>
              <th className="px-4 py-3">Thời gian gửi</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Xử lý</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2f2937]">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-xs text-[#a89f94]">
                  Đang tải danh sách báo cáo lỗi…
                </td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-xs text-[#a89f94]">
                  Chưa có báo cáo lỗi nào trong mục này.
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} className="transition hover:bg-[#2f2937]/60">
                  <td className="px-4 py-3 font-mono text-xs text-[#a89f94]">#{report.id}</td>
                  <td className="px-4 py-3 text-xs font-medium text-[#f4efe6]">
                    {report.username}
                    {report.userId && (
                      <span className="ml-1 text-[#a89f94]">(#{report.userId})</span>
                    )}
                  </td>
                  <td className="max-w-md px-4 py-3 text-sm leading-relaxed text-[#f4efe6]">
                    {report.reportContent}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[#a89f94]">
                    {report.createdAt
                      ? String(report.createdAt).replace('T', ' ').slice(0, 19)
                      : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={report.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {report.status === 'PENDING' ? (
                      <button
                        type="button"
                        disabled={updatingId === report.id}
                        onClick={() => handleToggleStatus(report)}
                        className="rounded border border-emerald-500/60 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300 transition hover:bg-emerald-400 hover:text-[#17151b] disabled:opacity-50"
                      >
                        ✓ Đánh dấu đã sửa
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={updatingId === report.id}
                        onClick={() => handleToggleStatus(report)}
                        className="rounded border border-[#5c5266] bg-[#17151b] px-3 py-1 text-xs text-[#a89f94] transition hover:border-amber-400 hover:text-amber-300 disabled:opacity-50"
                      >
                        ↺ Mở lại báo cáo
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
