import { useState } from 'react'
import { Dumbbell } from 'lucide-react'
import Header from '../../components/Header/Header'
import { useApp } from '../../context/AppContext'
import './Goals.css'

const lifts = [
  { key: 'squat',    label: 'Squat'       },
  { key: 'bench',    label: 'Bench Press' },
  { key: 'deadlift', label: 'Deadlift'    },
]

export default function Goals() {
  const { unit, setUnit, user, setUser, toDisplay } = useApp()

  const [values, setValues] = useState(() => ({
    squat:    { current: toDisplay(user.goals.squat.current),    target: toDisplay(user.goals.squat.target)    },
    bench:    { current: toDisplay(user.goals.bench.current),    target: toDisplay(user.goals.bench.target)    },
    deadlift: { current: toDisplay(user.goals.deadlift.current), target: toDisplay(user.goals.deadlift.target) },
  }))
  const [saved, setSaved] = useState(false)

  const toggleUnit = () => {
    const factor = unit === 'kg' ? 2.205 : (1 / 2.205)
    setValues(v => ({
      squat:    { current: Math.round(v.squat.current * factor),    target: Math.round(v.squat.target * factor)    },
      bench:    { current: Math.round(v.bench.current * factor),    target: Math.round(v.bench.target * factor)    },
      deadlift: { current: Math.round(v.deadlift.current * factor), target: Math.round(v.deadlift.target * factor) },
    }))
    setUnit(unit === 'kg' ? 'lbs' : 'kg')
  }

  const set = (lift, field) => (e) => {
    const num = parseInt(e.target.value) || 0
    setValues(v => ({ ...v, [lift]: { ...v[lift], [field]: num } }))
  }

  const handleSave = () => {
    const factor = unit === 'lbs' ? (1 / 2.205) : 1
    setUser(u => ({
      ...u,
      goals: {
        squat:    { current: Math.round(values.squat.current * factor),    target: Math.round(values.squat.target * factor)    },
        bench:    { current: Math.round(values.bench.current * factor),    target: Math.round(values.bench.target * factor)    },
        deadlift: { current: Math.round(values.deadlift.current * factor), target: Math.round(values.deadlift.target * factor) },
      },
    }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="goals-page">
      <Header />
      <div className="goals-content">
        <div className="goals-header">
          <div>
            <h1 className="goals-heading">My Goals</h1>
            <p className="goals-sub">Set your targets for the big three lifts.</p>
          </div>
          <div className="unit-toggle">
            {['kg', 'lbs'].map(u => (
              <button key={u}
                className={`unit-btn${unit === u ? ' unit-btn--active' : ''}`}
                onClick={() => unit !== u && toggleUnit()}
              >{u.toUpperCase()}</button>
            ))}
          </div>
        </div>

        <div className="lift-cards">
          {lifts.map(lift => (
            <LiftCard key={lift.key} label={lift.label}
              current={values[lift.key].current} target={values[lift.key].target}
              unit={unit} onCurrent={set(lift.key, 'current')} onTarget={set(lift.key, 'target')} />
          ))}
        </div>

        <div className="goals-save-row">
          {saved && <span className="saved-badge">✓ Goals saved</span>}
          <button className="save-btn" onClick={handleSave}>Save Goals</button>
        </div>
      </div>
    </div>
  )
}

function LiftCard({ label, current, target, unit, onCurrent, onTarget }) {
  const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0
  return (
    <div className="lift-card">
      <div className="lift-card__header">
        <div className="lift-card__label">
          <div className="lift-card__icon"><Dumbbell size={16} strokeWidth={2.2} /></div>
          <span className="lift-card__name">{label}</span>
        </div>
        <span className="pct-badge">{pct}%</span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="lift-input-row">
        <InputGroup label="Current" value={current} unit={unit} onChange={onCurrent} />
        <span className="lift-arrow">→</span>
        <InputGroup label="Target" value={target} unit={unit} onChange={onTarget} isTarget />
      </div>
    </div>
  )
}

function InputGroup({ label, value, unit, onChange, isTarget }) {
  return (
    <div className="input-group">
      <label className="input-group__label">{label}</label>
      <div className="input-group__wrap">
        <input type="number" value={value || ''} onChange={onChange}
          className={`num-input${isTarget ? ' num-input--target' : ''}`} min={0} max={999} />
        <span className="input-unit-tag">{unit}</span>
      </div>
    </div>
  )
}
