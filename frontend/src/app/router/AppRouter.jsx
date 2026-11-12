import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { AdminRoute } from './AdminRoute'
import { ProtectedRoute } from './ProtectedRoute'
import { ROUTES } from './routePaths'

// Tách chunk: Phaser (~1.3 MB) chỉ tải khi vào trang chơi; Admin chỉ tải khi vào trang quản trị
const GamePlayPage = lazy(() =>
  import('@/features/play/pages/GamePlayPage').then((m) => ({ default: m.GamePlayPage })),
)
const AdminLayout = lazy(() =>
  import('@/features/admin/layout/AdminLayout').then((m) => ({ default: m.AdminLayout })),
)
const AdminOverviewPage = lazy(() =>
  import('@/features/admin/pages/AdminOverviewPage').then((m) => ({
    default: m.AdminOverviewPage,
  })),
)
const AdminUsersPage = lazy(() =>
  import('@/features/admin/pages/AdminUsersPage').then((m) => ({
    default: m.AdminUsersPage,
  })),
)
const AdminBugReportsPage = lazy(() =>
  import('@/features/admin/pages/AdminBugReportsPage').then((m) => ({
    default: m.AdminBugReportsPage,
  })),
)
const AdminEvidencePage = lazy(() =>
  import('@/features/admin/pages/AdminEvidencePage').then((m) => ({
    default: m.AdminEvidencePage,
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
          </Route>
          <Route element={<AdminRoute />}>
            <Route path={ROUTES.ADMIN} element={<AdminLayout />}>
              <Route index element={<AdminOverviewPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="bugs" element={<AdminBugReportsPage />} />
              <Route path="evidence" element={<AdminEvidencePage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to={ROUTES.PLAY} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
