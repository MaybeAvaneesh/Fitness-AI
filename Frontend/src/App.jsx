import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Welcome  from './pages/Welcome/Welcome'
import Login    from './pages/Login/Login'
import Signup   from './pages/Signup/Signup'
import Goals    from './pages/Goals/Goals'
import Profile  from './pages/Profile/Profile'
import Program  from './pages/Program/Program'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"               element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome"        element={<Welcome />}  />
          <Route path="/login"          element={<Login />}    />
          <Route path="/signup"         element={<Signup />}   />
          <Route path="/goals"          element={<ProtectedRoute><Goals /></ProtectedRoute>}    />
          <Route path="/profile"        element={<ProtectedRoute><Profile /></ProtectedRoute>}  />
          <Route path="/program/:userId" element={<ProtectedRoute><Program /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
