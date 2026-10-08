/** Khung chung cho trang Login/Register. */
export function AuthCard({ title, subtitle, children }) {
  return (
    <main className="mx-auto mt-[10vh] max-w-md rounded-lg border border-stone-700 bg-stone-950/80 p-8 shadow-xl">
      <h1 className="text-3xl font-semibold tracking-wide text-stone-100">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-stone-400">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </main>
  )
}
