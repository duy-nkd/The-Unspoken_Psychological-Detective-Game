import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/app/router/routePaths'
import { fetchAdminOverview } from '../api/adminApi'
import { ChapterFunnelChart } from '../components/ChapterFunnelChart'
import { StatCard } from '../components/StatCard'

/**
 * Trang 1: Thống kê tổng quan & Phân tích hành vi người chơi.
 */
export function AdminOverviewPage() {
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = useCallback(async () => {
    try {
      const data = await fetchAdminOverview()
      setOverview(data)
      setError('')
    } catch (err) {
      setError(err.message || 'Không thể tải dữ liệu tổng quan từ máy chủ.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true
    fetchAdminOverview()
      .then((data) => {
        if (!active) return
        setOverview(data)
        setError('')
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Không thể tải dữ liệu tổng quan từ máy chủ.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Bảng điều khiển trung tâm
          </span>
          <h1 className="mt-0.5 text-2xl font-bold text-[#f4efe6]">
            Tổng quan Hệ thống & Phân tích Người chơi
          </h1>
        </div>
        <button
          type="button"
          onClick={loadData}
          className="rounded border border-[#5c5266] bg-[#241f2b] px-3.5 py-1.5 text-xs font-medium text-[#f4efe6] transition hover:border-amber-400 hover:text-amber-300"
        >
          ↻ Làm mới số liệu
        </button>
      </div>

      {error && (
        <div className="rounded border border-[#d9534f] bg-[#d9534f]/10 p-4 text-xs text-[#f28b88]">
          {error}
        </div>
      )}

      {loading && !overview ? (
        <p className="text-sm text-[#a89f94]">Đang tải số liệu thống kê…</p>
      ) : (
        overview && (
          <>
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                code="Người chơi"
                label="Tài khoản hoạt động"
                value={`${overview.activePlayers} / ${overview.totalPlayers}`}
                subtitle="Số người chơi đã bắt đầu điều tra trên tổng tài khoản"
                tone="amber"
              />
              <StatCard
                code="Điểm uy tín"
                label="Uy tín trung bình"
                value={`${overview.averageCredibility} điểm`}
                subtitle={`Số người chơi uy tín thấp (≤30 điểm): ${overview.lowCredibilityCount}`}
                tone="emerald"
              />
              <StatCard
                code="Hỗ trợ kỹ thuật"
                label="Báo lỗi chờ xử lý"
                value={overview.pendingBugReports}
                subtitle={`Đã khắc phục hoàn tất: ${overview.resolvedBugReports} báo cáo`}
                tone={overview.pendingBugReports > 0 ? 'danger' : 'stone'}
              />
              <StatCard
                code="Kho dữ liệu"
                label="Vật chứng trong hệ thống"
                value={overview.totalEvidenceMaster}
                subtitle="Tổng số vật chứng chuẩn đã lưu trữ"
                tone="stone"
              />
            </section>

            <ChapterFunnelChart chapterStats={overview.chapterStats} />

            <section className="grid gap-4 md:grid-cols-3">
              <QuickLinkCard
                badge="Quản lý người chơi"
                title="Tra cứu Hồ sơ & Sổ tay Thám tử"
                description="Theo dõi tiến trình từng người chơi, điểm uy tín hiện tại và các manh mối, vật chứng đã thu thập trong Sổ tay điều tra."
                to={ROUTES.ADMIN_USERS}
                actionText="Xem danh sách thám tử →"
              />
              <QuickLinkCard
                badge="Hỗ trợ & Vận hành"
                title="Tiếp nhận & Xử lý Báo cáo lỗi"
                description="Giám sát các phản hồi lỗi từ người chơi gửi về theo thời gian thực và cập nhật trạng thái xử lý nhanh chóng."
                to={ROUTES.ADMIN_BUGS}
                actionText="Mở trung tâm báo lỗi →"
              />
              <QuickLinkCard
                badge="Dữ liệu vụ án"
                title="Quản lý Kho Vật chứng"
                description="Thêm mới, chỉnh sửa thông tin hoặc nạp bộ vật chứng chuẩn cho các chương điều tra trong trò chơi."
                to={ROUTES.ADMIN_EVIDENCE}
                actionText="Quản lý vật chứng →"
              />
            </section>
          </>
        )
      )}
    </div>
  )
}

function QuickLinkCard({ badge, title, description, to, actionText }) {
  return (
    <div className="flex flex-col justify-between rounded border border-[#5c5266]/60 bg-[#241f2b] p-5 transition hover:border-amber-400/50">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
          {badge}
        </span>
        <h3 className="mt-1 text-base font-bold text-[#f4efe6]">{title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-[#a89f94]">{description}</p>
      </div>
      <Link
        to={to}
        className="mt-4 inline-block text-xs font-semibold text-amber-300 hover:underline"
      >
        {actionText}
      </Link>
    </div>
  )
}
