/**
 * Thẻ chỉ số thống kê phong cách Noir Archive.
 */
export function StatCard({ code, label, value, subtitle, tone = 'amber' }) {
  const accentStyles = {
    amber: 'border-l-amber-400 text-amber-300',
    emerald: 'border-l-emerald-400 text-emerald-300',
    danger: 'border-l-[#d9534f] text-[#ef6b67]',
    stone: 'border-l-stone-400 text-stone-200',
  }

  return (
    <article
      className={`rounded border border-[#5c5266]/60 border-l-4 bg-[#241f2b] p-5 shadow-lg ${
        accentStyles[tone] ?? accentStyles.amber
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#a89f94]">
          {code}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
      </div>
      <p className="mt-2 font-mono text-3xl font-bold tracking-tight text-[#f4efe6]">{value}</p>
      <h3 className="mt-1 text-sm font-semibold text-[#f4efe6]">{label}</h3>
      {subtitle && <p className="mt-1 text-xs leading-relaxed text-[#a89f94]">{subtitle}</p>}
    </article>
  )
}
