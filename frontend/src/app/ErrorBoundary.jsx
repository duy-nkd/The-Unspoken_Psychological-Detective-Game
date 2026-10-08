import { Component } from 'react'
import { createLogger } from '@/shared/logger/logger'

const log = createLogger('ErrorBoundary')

/**
 * Bắt lỗi render của React -> hiện màn hình lỗi thay vì trang trắng,
 * in stack vào console để debug. (React chỉ hỗ trợ Error Boundary bằng class component.)
 */
export class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    log.error(error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <main className="mx-auto mt-[10vh] max-w-xl p-8 text-stone-200">
        <h1 className="text-2xl font-semibold text-red-400">Đã xảy ra lỗi</h1>
        <pre className="mt-4 overflow-auto rounded bg-stone-900 p-4 text-xs">
          {String(this.state.error?.message ?? this.state.error)}
        </pre>
        <button
          type="button"
          className="mt-6 rounded bg-amber-500 px-4 py-2 text-stone-950"
          onClick={() => window.location.reload()}
        >
          Tải lại trang
        </button>
      </main>
    )
  }
}
