import { Link, Outlet } from 'react-router-dom'
import { ROUTES } from '@/app/router/routePaths'
import { useAuth } from '@/features/auth/state/useAuth'
import { StatusBadge } from '../components/StatusBadge'
import { AdminSidebar } from './AdminSidebar'

/**
 * Khung giao diện Website Admin tách biệt (Noir Detective Archive Style — DEC-024).
 * Có nút nối trực tiếp quay về trang chơi game (/play).
 */
export function AdminLayout() {
  const { session, logout } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-[#17151b] font-sans text-[#f4efe6] md:flex-row">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3d3546] bg-[#241f2b]/80 px-6 py-3.5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#a89f94]">Quản trị viên:</span>
            <strong className="text-sm font-semibold text-[#f4efe6]">{session?.username}</strong>
            <StatusBadge status={session?.role} />
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={ROUTES.PLAY}
              className="rounded border border-amber-400/60 bg-amber-400/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-400 hover:text-[#17151b]"
            >
              ← Quay lại trò chơi
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded border border-[#5c5266] px-3 py-1.5 text-xs font-medium text-[#a89f94] transition hover:border-[#d9534f] hover:text-[#f28b88]"
            >
              Đăng xuất
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
