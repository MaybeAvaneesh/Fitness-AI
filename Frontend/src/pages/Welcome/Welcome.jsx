import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import TickerStrip from '../../components/TickerStrip/TickerStrip'
import './Welcome.css'

const stats = [
  { num: '10K+', label: 'Athletes'        },
  { num: '2.1M', label: 'Sessions Logged' },
  { num: '98%',  label: 'PR Rate'         },
  { num: '#1',   label: 'Power App'       },
]

export default function Welcome() {
  const navigate = useNavigate()
  const { toggleTheme } = useApp()

  return (
    <div className="welcome">
      <nav className="welcome__nav">
        <span className="welcome__logo">Power<span>ML</span></span>
        <div className="welcome__nav-actions">
          <button className="welcome__theme-btn" onClick={toggleTheme} title="Toggle theme">
            <span className="welcome__theme-swatch" />
          </button>
          <button className="btn-ghost" onClick={() => navigate('/login')}>Log In</button>
          <button className="btn-orange" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </nav>

      <main className="welcome__hero">
        <div className="welcome__badge">⚡ AI-Powered Powerlifting</div>

        <h1 className="welcome__title">
          Train Smarter.<br />
          <span className="welcome__accent">Lift Heavier.</span>
        </h1>

        <p className="welcome__sub">
          PowerML uses machine learning to analyze your lifts, track<br />
          progression, and build programs that move the needle.
        </p>

        <div className="welcome__cta">
          <button className="btn-primary-lg" onClick={() => navigate('/signup')}>
            Start Training Free →
          </button>
          <button className="btn-text-lg" onClick={() => navigate('/login')}>
            I already have an account
          </button>
        </div>

        <div className="welcome__stats">
          {stats.map((st, i) => (
            <div key={st.label} className="welcome__stat">
              <span className="welcome__stat-num">{st.num}</span>
              <span className="welcome__stat-label">{st.label}</span>
              {i < stats.length - 1 && <div className="welcome__stat-divider" />}
            </div>
          ))}
        </div>
      </main>

      <div className="welcome__orb" />

      <TickerStrip />
    </div>
  )
}
