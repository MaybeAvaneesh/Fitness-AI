import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Target } from 'lucide-react'
import Header from '../../components/Header/Header'
import ActivityHeatmap from '../../components/ActivityHeatmap/ActivityHeatmap'
import { useApp } from '../../context/AppContext'
import './Profile.css'

export default function Profile() {
  const navigate  = useNavigate()
  const { unit, setUnit, user, setUser } = useApp()

  const [weightDisplay, setWeightDisplay] = useState(() =>
    unit === 'kg' ? user.weightKg : Math.round(user.weightKg * 2.205)
  )

  const monthsSince = () => {
    const now = new Date()
    return (now.getFullYear() - user.joinDate.getFullYear()) * 12
         + (now.getMonth() - user.joinDate.getMonth())
  }

  const joinFmt = user.joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const months  = monthsSince()

  const toggleUnit = () => {
    const next = unit === 'kg' ? 'lbs' : 'kg'
    setWeightDisplay(w => next === 'lbs' ? Math.round(w * 2.205) : Math.round(w / 2.205))
    setUnit(next)
  }

  const saveWeight = () => {
    const kg = unit === 'kg' ? weightDisplay : Math.round(weightDisplay / 2.205)
    setUser(u => ({ ...u, weightKg: kg }))
  }

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-content">

        <div className="profile-top">
          <div className="profile-big-avatar">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-join">
              Member since {joinFmt} · <span>{months} month{months !== 1 ? 's' : ''}</span>
            </p>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        <div className="profile-section">
          <ActivityHeatmap />
        </div>

        <div className="profile-section">
          <div className="section-header">
            <span className="section-title">Body Weight</span>
            <div className="unit-toggle">
              {['kg', 'lbs'].map(u => (
                <button key={u}
                  className={`unit-btn${unit === u ? ' unit-btn--active' : ''}`}
                  onClick={() => unit !== u && toggleUnit()}
                >{u.toUpperCase()}</button>
              ))}
            </div>
          </div>
          <div className="weight-card">
            <button className="weight-btn" onClick={() => setWeightDisplay(w => Math.max(30, w - 1))}>−</button>
            <div className="weight-display">
              <span className="weight-num">{weightDisplay}</span>
              <span className="weight-unit">{unit}</span>
            </div>
            <button className="weight-btn" onClick={() => setWeightDisplay(w => Math.min(250, w + 1))}>+</button>
          </div>
          <button className="weight-update-btn" onClick={saveWeight}>Update Weight</button>
        </div>

        <button className="profile-goals-btn" onClick={() => navigate('/goals')}>
          <Target size={18} strokeWidth={2} />
          View My Goals
        </button>
      </div>
    </div>
  )
}
