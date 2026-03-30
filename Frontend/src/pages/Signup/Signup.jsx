import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './Signup.css'

const fields = [
  { key: 'name',     label: 'Full Name',    type: 'text',     placeholder: 'Alex Morgan'       },
  { key: 'email',    label: 'Email',        type: 'email',    placeholder: 'you@example.com'   },
  { key: 'phone',    label: 'Phone Number', type: 'tel',      placeholder: '+1 (555) 000-0000' },
  { key: 'password', label: 'Password',     type: 'password', placeholder: '8+ characters'     },
]

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
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
          <h1 className="auth-heading">Create your account</h1>
          <p className="auth-sub">Join 10,000+ athletes already training smarter.</p>

          <form onSubmit={(e) => { e.preventDefault(); navigate('/goals') }}>
            {fields.map(f => (
              <div key={f.key} className="auth-field">
                <label className="auth-label">{f.label}</label>
                <input className="auth-input" type={f.type} value={form[f.key]}
                  onChange={set(f.key)} placeholder={f.placeholder} />
              </div>
            ))}

            <p className="auth-terms">
              By signing up you agree to our{' '}
              <span>Terms of Service</span> and <span>Privacy Policy</span>.
            </p>

            <button type="submit" className="auth-submit">Create Account →</button>
          </form>

          <p className="auth-footer">
            Already have an account?{' '}
            <span className="auth-link" onClick={() => navigate('/login')}>Log In</span>
          </p>
        </div>
      </div>

      <div className="auth-orb" />
    </div>
  )
}
