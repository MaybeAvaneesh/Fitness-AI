import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(form.email, form.password)
      navigate('/goals')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-topbar">
        <button className="auth-back" onClick={() => navigate('/welcome')}>
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
        <span className="auth-logo" onClick={() => navigate('/welcome')}>
          Power<span>ML</span>
        </span>
      </div>

      <div className="auth-center">
        <div className="auth-card">
          <h1 className="auth-heading">Welcome back</h1>
          <p className="auth-sub">Log in to continue your powerlifting journey.</p>

          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input className="auth-input" type="email" value={form.email}
                onChange={set('email')} placeholder="you@example.com" required />
            </div>
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input className="auth-input" type="password" value={form.password}
                onChange={set('password')} placeholder="••••••••" required />
            </div>

            <div className="auth-forgot-row">
              <button type="button" className="auth-forgot">Forgot password?</button>
            </div>

            <button type="submit" className="auth-submit" disabled={submitting}>
              {submitting ? 'Logging in...' : 'Log In →'}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account?{' '}
            <span className="auth-link" onClick={() => navigate('/signup')}>Sign Up</span>
          </p>
        </div>
      </div>

      <div className="auth-orb" />
    </div>
  )
}
