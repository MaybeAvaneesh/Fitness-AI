import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './BodyStatsCard.css'

const GENDERS = ['male', 'female', 'other']

export default function BodyStatsCard() {
  const { unit, setUnit, user, setUser } = useApp()

  const [weightDisplay, setWeightDisplay] = useState(() =>
    unit === 'kg' ? user.weightKg : Math.round(user.weightKg * 2.205)
  )
  const [stats, setStats] = useState({
    heightCm: user.heightCm ?? 178,
    age:      user.age      ?? 28,
    gender:   user.gender   ?? 'male',
  })
  const [saved, setSaved] = useState(false)

  const heightLabel   = unit === 'kg' ? 'cm' : 'in'
  const heightDisplay = unit === 'kg'
    ? stats.heightCm
    : Math.round(stats.heightCm / 2.54)

  const setHeight = val => {
    const cm = unit === 'kg' ? val : Math.round(val * 2.54)
    setStats(s => ({ ...s, heightCm: cm }))
  }

  const toggleUnit = () => {
    const next = unit === 'kg' ? 'lbs' : 'kg'
    setWeightDisplay(w => next === 'lbs' ? Math.round(w * 2.205) : Math.round(w / 2.205))
    setUnit(next)
  }

  const saveAll = () => {
    const kg = unit === 'kg' ? weightDisplay : Math.round(weightDisplay / 2.205)
    setUser(u => ({ ...u, ...stats, weightKg: kg }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="bsc">
      <div className="bsc__header">
        <span className="bsc__title">Body Stats</span>
        <div className="bsc__unit-toggle">
          {[['kg', 'Metric'], ['lbs', 'Imperial']].map(([val, label]) => (
            <button key={val}
              className={`bsc__unit-btn${unit === val ? ' bsc__unit-btn--active' : ''}`}
              onClick={() => unit !== val && toggleUnit()}
            >{label}</button>
          ))}
        </div>
      </div>

      <div className="bsc__grid">
        <div className="bsc__field">
          <label className="bsc__label">Height</label>
          <div className="bsc__stepper">
            <button className="bsc__step" onClick={() => setHeight(Math.max(100, heightDisplay - 1))}>−</button>
            <span className="bsc__val">{heightDisplay}<span className="bsc__unit">{heightLabel}</span></span>
            <button className="bsc__step" onClick={() => setHeight(Math.min(250, heightDisplay + 1))}>+</button>
          </div>
        </div>
        <div className="bsc__field">
          <label className="bsc__label">Age</label>
          <div className="bsc__stepper">
            <button className="bsc__step" onClick={() => setStats(s => ({ ...s, age: Math.max(10, s.age - 1) }))}>−</button>
            <span className="bsc__val">{stats.age}<span className="bsc__unit">yrs</span></span>
            <button className="bsc__step" onClick={() => setStats(s => ({ ...s, age: Math.min(100, s.age + 1) }))}>+</button>
          </div>
        </div>
      </div>

      <div className="bsc__divider" />

      <div className="bsc__field">
        <label className="bsc__label">Weight</label>
        <div className="bsc__weight">
          <button className="bsc__weight-btn" onClick={() => setWeightDisplay(w => Math.max(30, w - 1))}>−</button>
          <div className="bsc__weight-display">
            <span className="bsc__weight-num">{weightDisplay}</span>
            <span className="bsc__weight-unit">{unit}</span>
          </div>
          <button className="bsc__weight-btn" onClick={() => setWeightDisplay(w => Math.min(250, w + 1))}>+</button>
        </div>
      </div>

      <div className="bsc__divider" />

      <div className="bsc__field">
        <label className="bsc__label">Gender</label>
        <div className="bsc__gender">
          {GENDERS.map(g => (
            <button key={g}
              className={`bsc__gender-btn${stats.gender === g ? ' bsc__gender-btn--active' : ''}`}
              onClick={() => setStats(s => ({ ...s, gender: g }))}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <button className="bsc__save" onClick={saveAll}>
        {saved ? '✓ Saved' : 'Save Stats'}
      </button>
    </div>
  )
}
