import { Link } from 'react-router-dom'
import { ROUTES } from '@/app/router/routePaths'

/**
 * Admin Dashboard — Project.docx §5.1 (ReactJS + Tailwind CSS):
 * 1. Số lượng tài khoản hoạt động
 * 2. Biểu đồ % người chơi hoàn thành Chương 1 -> Chương 5
 * 3. Bảng báo cáo lỗi thời gian thực, chuyển PENDING -> RESOLVED
 * PENDING(ISS-10, ISS-11, ISS-12): API admin, định nghĩa chỉ số, công nghệ real-time chưa có.
 */
const WIDGETS = [
  { title: 'Tài khoản hoạt động', pending: 'ISS-10, ISS-11' },
  { title: 'Tỷ lệ hoàn thành Chương 1–5', pending: 'ISS-10, ISS-11' },
  { title: 'Báo cáo lỗi (PENDING → RESOLVED)', pending: 'ISS-10, ISS-12' },
]

export function AdminDashboardPage() {
  return (
    <main className="mx-auto max-w-6xl p-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-100">Admin Dashboard</h1>
        <Link to={ROUTES.PLAY} className="text-sm text-amber-400 hover:underline">
          ← Về game
        </Link>
      </header>
      <section className="mt-8 grid gap-6 md:grid-cols-3">
        {WIDGETS.map((widget) => (
          <article
            key={widget.title}
            className="rounded-lg border border-stone-700 bg-stone-900 p-6"
          >
            <h2 className="font-medium text-stone-200">{widget.title}</h2>
            <p className="mt-3 text-sm text-stone-500">Chờ đặc tả API ({widget.pending})</p>
          </article>
        ))}
      </section>
    </main>
  )
}
