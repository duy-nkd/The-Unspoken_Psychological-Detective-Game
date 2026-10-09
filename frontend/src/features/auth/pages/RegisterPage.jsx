import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/app/router/routePaths'
import { AuthCard } from '@/shared/ui/AuthCard'
import { FormField } from '@/shared/ui/FormField'
import { registerAccount } from '../api/authApi'

/**
 * Đăng ký: payload { username, email, password } -> 201 Created (Project.docx §4.3).
 * Giới hạn độ dài lấy từ schema users (§2.1): username VARCHAR(50), email VARCHAR(100).
 * PENDING(ISS-13): quy tắc mật khẩu, thông báo lỗi trùng username/email chưa được đặc tả.
 */
export function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [status, setStatus] = useState({ loading: false, error: '' })

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus({ loading: true, error: '' })
    try {
      await registerAccount(form)
      navigate(ROUTES.LOGIN, { replace: true })
    } catch (error) {
      setStatus({ loading: false, error: error.message })
    }
  }

  return (
    <AuthCard title="Tạo tài khoản" subtitle="The Unspoken">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          id="username"
          name="username"
          label="Tên đăng nhập"
          value={form.username}
          onChange={updateField}
          maxLength={50}
          autoComplete="username"
          required
        />
        <FormField
          id="email"
          name="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={updateField}
          maxLength={100}
          autoComplete="email"
          required
        />
        <FormField
          id="password"
          name="password"
          type="password"
          label="Mật khẩu"
          value={form.password}
          onChange={updateField}
          autoComplete="new-password"
          required
        />
        <button
          type="submit"
          disabled={status.loading}
          className="rounded bg-amber-500 px-4 py-2 font-medium text-stone-950 hover:bg-amber-400 disabled:opacity-60"
        >
          {status.loading ? 'Đang gửi…' : 'Đăng ký'}
        </button>
        {status.error && (
          <p role="alert" className="text-sm text-red-400">
            {status.error}
          </p>
        )}
      </form>
      <p className="mt-6 text-sm text-stone-400">
        Đã có tài khoản?{' '}
        <Link to={ROUTES.LOGIN} className="text-amber-400 hover:underline">
          Đăng nhập
        </Link>
      </p>
    </AuthCard>
  )
}
