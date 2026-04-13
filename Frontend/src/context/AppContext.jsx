import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi } from '@power-ml/auth-lib'

const AppContext = createContext()

/* ── helpers ── */
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

/* ── fallback profile shape (used while logged-out so UI never crashes) ── */
const guestUser = {
  id: null,
  name: 'Guest',
  username: 'Guest',
  email: '',
  phone: '',
  phone_number: '',
  joinDate: new Date(),
  weightKg: 0,
  heightCm: 0,
  age: 0,
  gender: '',
  goals: {
    squat:    { current: 0, target: 0 },
    bench:    { current: 0, target: 0 },
    deadlift: { current: 0, target: 0 },
  },
}

export function AppProvider({ children }) {
  const [unit, setUnit]               = useState('kg')
  const [user, setUser]               = useState(guestUser)
  const [loading, setLoading]         = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)
  const [theme, setTheme]             = useState('orange')

  const isAuthenticated = !!user.id

  /* ── theme ── */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'orange' ? 'yellow' : 'orange')

  /* ── on mount: rehydrate session from stored token ── */
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) { setLoading(false); return }

    const payload = decodeToken(token)
    if (!payload?.id) {
      authApi.logout()
      setLoading(false)
      return
    }

    authApi.fetchUserProfile(payload.id)
      .then(res => {
        const p = res.data.profile
        setUser({
          ...guestUser,
          id: p.id,
          name: p.username,
          username: p.username,
          email: p.email,
          phone: p.phone_number,
          phone_number: p.phone_number,
          joinDate: new Date(),
        })
      })
      .catch(() => authApi.logout())
      .finally(() => setLoading(false))
  }, [])

  /* ── resolvers ── */
  const login = useCallback(async (email, password) => {
    const res = await authApi.login({ email, password })
    const payload = decodeToken(res.data.accessToken)
    const profile = await authApi.fetchUserProfile(payload.id)
    const p = profile.data.profile
    setUser({
      ...guestUser,
      id: p.id,
      name: p.username,
      username: p.username,
      email: p.email,
      phone: p.phone_number,
      phone_number: p.phone_number,
      joinDate: new Date(),
    })
  }, [])

  const signup = useCallback(async ({ username, email, password, phoneNumber }) => {
    await authApi.signup({ username, email, password, phoneNumber })
    await login(email, password)
  }, [login])

  const logout = useCallback(() => {
    authApi.logout()
    setUser(guestUser)
  }, [])

  const deleteAccount = useCallback(async () => {
    if (!user.id) return
    await authApi.deleteUser(user.id)
    authApi.logout()
    setUser(guestUser)
  }, [user.id])

  /* ── unit conversion ── */
  const toDisplay = (kg) => unit === 'kg' ? kg : Math.round(kg * 2.205)
  const toKg      = (val) => unit === 'kg' ? val : Math.round(val / 2.205)

  return (
    <AppContext.Provider value={{
      unit, setUnit,
      user, setUser,
      loading, isAuthenticated,
      profileOpen, setProfileOpen,
      theme, toggleTheme,
      login, signup, logout, deleteAccount,
      toDisplay, toKg,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
