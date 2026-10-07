import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'))
  const value = useMemo(() => ({
    token,
    isAuthenticated: Boolean(token),
    setToken: (nextToken) => {
      if (nextToken) localStorage.setItem('auth_token', nextToken)
      else localStorage.removeItem('auth_token')
      setToken(nextToken)
    },
  }), [token])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
