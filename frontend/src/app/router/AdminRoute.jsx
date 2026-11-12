import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/state/useAuth'
import { ROUTES } from './routePaths'

/**
 * Chốt chặn phân quyền chỉ dành riêng cho tài khoản quản trị duy nhất (ROLE_ADMIN — DEC-024):
 * - Chưa đăng nhập -> chuyển về /login
 * - Đã đăng nhập nhưng không phải ROLE_ADMIN -> chuyển về trang chơi /play
 */
export function AdminRoute() {
  const { isAuthenticated, session } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />
  }

  if (session?.role !== 'ROLE_ADMIN') {
    return <Navigate to={ROUTES.PLAY} replace />
  }

  return <Outlet />
}
