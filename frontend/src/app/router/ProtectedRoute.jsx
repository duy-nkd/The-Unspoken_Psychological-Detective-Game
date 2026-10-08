import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/state/useAuth'
import { ROUTES } from './routePaths'

/**
 * Chặn trang cần đăng nhập. Chưa đăng nhập -> về /login, nhớ trang định vào.
 * PENDING(ISS-10): tài liệu chưa định nghĩa ROLE_ADMIN -> trang Admin hiện chỉ yêu cầu đăng nhập.
 */
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />
  }
  return <Outlet />
}
