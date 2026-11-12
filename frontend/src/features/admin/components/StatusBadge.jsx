/**
 * Nhãn trạng thái thân thiện trên giao diện quản trị.
 */
export function StatusBadge({ status }) {
  const normalized = String(status || '').toUpperCase()

  if (normalized === 'RESOLVED') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Đã khắc phục
      </span>
    )
  }

  if (normalized === 'PENDING') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded border border-[#d9534f]/50 bg-[#d9534f]/15 px-2.5 py-0.5 text-xs font-medium text-[#f28b88]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d9534f]" />
        Chờ xử lý
      </span>
    )
  }

  if (normalized === 'ROLE_ADMIN') {
    return (
      <span className="inline-flex items-center rounded border border-amber-400/50 bg-amber-400/15 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
        Quản trị viên
      </span>
    )
  }

  if (normalized === 'ROLE_PLAYER') {
    return (
      <span className="inline-flex items-center rounded border border-[#5c5266] bg-[#17151b] px-2.5 py-0.5 text-xs text-[#a89f94]">
        Người chơi
      </span>
    )
  }

  return (
    <span className="inline-flex items-center rounded border border-[#5c5266] bg-[#17151b] px-2.5 py-0.5 text-xs text-[#a89f94]">
      {status || 'Không rõ'}
    </span>
  )
}
