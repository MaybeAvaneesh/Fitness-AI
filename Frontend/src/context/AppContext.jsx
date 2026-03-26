import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const mockUser = {
  name: 'Alex Morgan',
  email: 'alex@powerml.io',
  phone: '+1 (555) 234-5678',
  joinDate: new Date('2025-07-15'),
  weightKg: 87,
  heightCm: 178,
  age: 28,
  gender: 'male',
  goals: {
    squat:    { current: 140, target: 180 },
    bench:    { current: 100, target: 130 },
    deadlift: { current: 170, target: 220 },
  },
}

export function AppProvider({ children }) {
  const [unit, setUnit]               = useState('kg')
  const [user, setUser]               = useState(mockUser)
  const [profileOpen, setProfileOpen] = useState(false)
  const [theme, setTheme]             = useState('orange')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'orange' ? 'yellow' : 'orange')

  const toDisplay = (kg) => unit === 'kg' ? kg : Math.round(kg * 2.205)
  const toKg      = (val) => unit === 'kg' ? val : Math.round(val / 2.205)

  return (
    <AppContext.Provider value={{
      unit, setUnit,
      user, setUser,
      profileOpen, setProfileOpen,
      theme, toggleTheme,
      toDisplay, toKg,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
