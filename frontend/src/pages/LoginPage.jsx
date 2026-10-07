import { useState } from 'react'
import { login } from '../api/authApi'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('Đang kết nối máy chủ...')
    try {
      const { data } = await login({ email, password })
      if (data.token) localStorage.setItem('auth_token', data.token)
      setMessage('Đăng nhập thành công.')
    } catch {
      setMessage('Chưa thể đăng nhập. Hãy kiểm tra backend hoặc thông tin tài khoản.')
    }
  }

  return (
    <main style={{ maxWidth: 440, margin: '10vh auto', padding: 24 }}>
      <h1>The Unspoken</h1>
      <p>Psychological Detective Game</p>
      <form onSubmit={handleSubmit}>
        <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required /></label>
        <label>Mật khẩu<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required /></label>
        <button type="submit">Đăng nhập</button>
      </form>
      {message && <p role="status">{message}</p>}
    </main>
  )
}
