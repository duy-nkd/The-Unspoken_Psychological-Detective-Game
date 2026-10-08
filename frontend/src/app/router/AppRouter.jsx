import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { ProtectedRoute } from './ProtectedRoute'
import { ROUTES } from './routePaths'

// Tách chunk: Phaser (~1.3 MB) chỉ tải khi vào trang chơi; Admin chỉ tải khi vào trang quản trị
const GamePlayPage = lazy(() =>
  import('@/features/game/pages/GamePlayPage').then((m) => ({ default: m.GamePlayPage })),
)
const AdminDashboardPage = lazy(() =>
  import('@/features/admin/pages/AdminDashboardPage').then((m) => ({
    default: m.AdminDashboardPage,
  })),
)

const Loading = () => <p className="p-8 text-stone-400">Đang tải…</p>

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.PLAY} element={<GamePlayPage />} />
            <Route path={ROUTES.ADMIN} element={<AdminDashboardPage />} />
          </Route>
          <Route path="*" element={<Navigate to={ROUTES.PLAY} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
