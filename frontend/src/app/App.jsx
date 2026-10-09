import { AuthProvider } from '@/features/auth/state/AuthContext'
import { ErrorBoundary } from './ErrorBoundary'
import { AppRouter } from './router/AppRouter'

/** Gốc ứng dụng: ErrorBoundary -> Providers -> Router. Thêm provider mới tại đây. */
export function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ErrorBoundary>
  )
}
