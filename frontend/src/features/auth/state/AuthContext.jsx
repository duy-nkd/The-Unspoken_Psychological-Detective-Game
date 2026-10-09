import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { setUnauthorizedHandler } from '@/shared/api/httpClient'
import { storage } from '@/shared/storage/storage'
import { STORAGE_KEYS } from '@/shared/storage/storageKeys'
import { loginAccount } from '../api/authApi'

export const AuthContext = createContext(null)

/**
 * Phiên đăng nhập = đúng các trường login trả về (Project.docx §4.3):
 * { token, type, username, role }.
 * PENDING(ISS-29): response login không có userId nhưng /api/game/save và /load/{userId} cần userId.
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => storage.get(STORAGE_KEYS.AUTH_SESSION))

  const logout = useCallback(() => {
    storage.remove(STORAGE_KEYS.AUTH_SESSION)
    setSession(null)
  }, [])

  const login = useCallback(async (credentials) => {
    const data = await loginAccount(credentials)
    const next = { token: data.token, type: data.type, username: data.username, role: data.role }
    storage.set(STORAGE_KEYS.AUTH_SESSION, next)
    setSession(next)
    return next
  }, [])

  // Server trả 401 (token hết hạn/sai) -> đăng xuất
  useEffect(() => {
    setUnauthorizedHandler(logout)
  }, [logout])

  const value = useMemo(
    () => ({ session, isAuthenticated: Boolean(session?.token), login, logout }),
    [session, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
