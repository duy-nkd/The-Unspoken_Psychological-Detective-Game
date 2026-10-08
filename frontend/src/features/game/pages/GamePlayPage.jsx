import { Link } from 'react-router-dom'
import { ROUTES } from '@/app/router/routePaths'
import { useAuth } from '@/features/auth/state/useAuth'
import { PhaserGame } from '../components/PhaserGame'
import { useGameBridge } from '../hooks/useGameBridge'

/** Trang chơi: khung web (React) bao quanh canvas game (Phaser). */
export function GamePlayPage() {
  const { session, logout } = useAuth()
  // PENDING(ISS-29): session chưa có userId -> lưu server chưa khả dụng, vẫn lưu localStorage
  const { statusMessage } = useGameBridge({ userId: session?.userId ?? null })

  return (
    <div className="flex min-h-screen flex-col items-center gap-3 p-4">
      <header className="flex w-full max-w-[1280px] items-center justify-between text-sm text-stone-400">
        <span>
          Thám tử: <strong className="text-stone-200">{session?.username}</strong>
        </span>
        <nav className="flex gap-4">
          <Link to={ROUTES.ADMIN} className="hover:text-amber-400">
            Admin
          </Link>
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
