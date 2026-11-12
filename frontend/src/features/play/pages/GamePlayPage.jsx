import { Link } from 'react-router-dom'
import { ROUTES } from '@/app/router/routePaths'
import { useAuth } from '@/features/auth/state/useAuth'
import { PhaserGame } from '../components/PhaserGame'
import { useGameBridge } from '../hooks/useGameBridge'

/** Trang chơi: khung web (React) bao quanh canvas game (Phaser). */
export function GamePlayPage() {
  const { session, logout } = useAuth()
  // PENDING(ISS-29): session chưa có userId -> lưu server chưa khả dụng, vẫn lưu localStorage
  const { statusMessage } = useGameBridge({
    userId: session?.userId ?? null,
    username: session?.username,
  })
  const isAdmin = session?.role === 'ROLE_ADMIN'

  return (
    <div className="flex min-h-screen flex-col items-center gap-3 p-4">
      <header className="flex w-full max-w-[1280px] items-center justify-between text-sm text-stone-400">
        <span>
          Thám tử: <strong className="text-stone-200">{session?.username}</strong>
          {isAdmin && (
            <span className="ml-2 rounded border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono text-xs text-amber-300">
              ADMIN
            </span>
          )}
        </span>
        <nav className="flex items-center gap-4">
          {isAdmin && (
            <Link
              to={ROUTES.ADMIN}
              className="rounded border border-amber-400/50 bg-[#241f2b] px-3 py-1 font-mono text-xs tracking-wider text-amber-300 transition hover:bg-amber-400 hover:text-[#17151b]"
            >
              HỒ SƠ QUẢN TRỊ →
            </Link>
          )}
          <button type="button" onClick={logout} className="hover:text-amber-400">
            Đăng xuất
          </button>
        </nav>
      </header>
      <PhaserGame />
      <p role="status" className="min-h-5 text-sm text-stone-400">
        {statusMessage}
      </p>
    </div>
  )
}
