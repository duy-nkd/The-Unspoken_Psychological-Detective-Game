/** Ô nhập liệu có nhãn — dùng chung cho Login/Register/Admin. */
export function FormField({ label, id, ...inputProps }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1 text-sm text-stone-300">
      {label}
      <input
        id={id}
        className="rounded border border-stone-600 bg-stone-900 px-3 py-2 text-stone-100 outline-none focus:border-amber-400"
        {...inputProps}
      />
    </label>
  )
}
