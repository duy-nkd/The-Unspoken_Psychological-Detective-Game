/**
 * Biểu đồ tỷ lệ phần trăm người chơi tiếp cận & hoàn thành từng chương (Chương 1 -> Chương 5).
 */
export function ChapterFunnelChart({ chapterStats = [] }) {
  return (
    <section className="rounded border border-[#5c5266]/60 bg-[#241f2b] p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3d3546] pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Tiến độ cốt truyện
          </span>
          <h2 className="mt-0.5 text-lg font-bold text-[#f4efe6]">
            Tỷ lệ người chơi tiếp cận & hoàn thành từng chương
          </h2>
        </div>
        <div className="flex items-center gap-5 text-xs text-[#a89f94]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-xs bg-amber-400" />
            Đã phá án (%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-xs bg-[#5c5266]" />
            Đang điều tra (%)
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {chapterStats.map((item) => {
          const reachedPct = Math.min(100, Math.max(0, Number(item.reachedPercentage ?? 0)))
          const completedPct = Math.min(100, Math.max(0, Number(item.completedPercentage ?? 0)))

          return (
            <div key={item.chapter} className="space-y-1.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-[#f4efe6]">{item.title}</span>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-[#a89f94]">
                    Đang chơi: <strong className="text-[#f4efe6]">{item.reachedCount}</strong> (
                    {reachedPct}%)
                  </span>
                  <span className="text-amber-300">
                    Hoàn thành: <strong>{item.completedCount}</strong> ({completedPct}%)
                  </span>
                </div>
              </div>

              <div className="relative h-3.5 w-full overflow-hidden rounded bg-[#17151b] ring-1 ring-[#3d3546]">
                <div
                  className="absolute inset-y-0 left-0 bg-[#5c5266]/70 transition-all duration-500"
                  style={{ width: `${reachedPct}%` }}
                  title={`Đã tiếp cận: ${reachedPct}%`}
                />
                <div
                  className="absolute inset-y-0 left-0 bg-amber-400 transition-all duration-500"
                  style={{ width: `${completedPct}%` }}
                  title={`Đã hoàn thành: ${completedPct}%`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
