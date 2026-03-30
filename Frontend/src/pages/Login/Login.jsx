import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

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

          <form onSubmit={(e) => { e.preventDefault(); navigate('/goals') }}>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input className="auth-input" type="email" value={form.email}
                onChange={set('email')} placeholder="you@example.com" />
            </div>
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input className="auth-input" type="password" value={form.password}
                onChange={set('password')} placeholder="••••••••" />
            </div>

            <div className="auth-forgot-row">
              <button type="button" className="auth-forgot">Forgot password?</button>
            </div>

            <button type="submit" className="auth-submit">Log In →</button>
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
