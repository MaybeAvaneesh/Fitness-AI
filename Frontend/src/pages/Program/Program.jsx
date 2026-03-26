import { useNavigate } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Scale, Dumbbell, TrendingUp, Activity, Target } from 'lucide-react'
import Header from '../../components/Header/Header'
import { useApp } from '../../context/AppContext'
import './Program.css'

function makeData(start, end, points, seedBase) {
  let seed = seedBase
  const rng = () => {
    seed = (seed * 1664525 + 1013904223) & 0xFFFFFFFF
    return (seed >>> 0) / 0xFFFFFFFF
  }
  return Array.from({ length: points }, (_, i) => {
    const progress = i / (points - 1)
    const trend    = start + (end - start) * Math.pow(progress, 0.9)
    const noise    = (rng() - 0.45) * (end - start) * 0.12
    return { week: `W${(i + 1) * 2}`, value: Math.round(Math.max(start * 0.88, trend + noise)) }
  })
}

const CHART_DEFS = [
  { Icon: Scale,      title: 'Body Weight',        unit: 'kg', data: makeData(78,  88,  26, 101), gradId: 'gWeight',   orange: '#FF5722', yellow: '#F59E0B' },
  { Icon: Dumbbell,   title: 'Max Bench Press',    unit: 'kg', data: makeData(85,  112, 26, 202), gradId: 'gBench',    orange: '#FF7043', yellow: '#F6AD37' },
  { Icon: TrendingUp, title: 'Max Squat',          unit: 'kg', data: makeData(120, 158, 26, 303), gradId: 'gSquat',    orange: '#FF8A65', yellow: '#FBC055' },
  { Icon: Activity,   title: 'Max Shoulder Press', unit: 'kg', data: makeData(58,  82,  26, 404), gradId: 'gShoulder', orange: '#FFAB91', yellow: '#FDD17A' },
]

function ChartTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__label">{label}</div>
      <div className="chart-tooltip__value">
        {payload[0].value} <span className="chart-tooltip__unit">{unit}</span>
      </div>
    </div>
  )
}

export default function Program() {
  const navigate = useNavigate()
  const { user, theme }  = useApp()
  const CHARTS = CHART_DEFS.map(c => ({ ...c, color: theme === 'yellow' ? c.yellow : c.orange }))

  return (
    <div className="program-page">
      <Header />
      <div className="program-content">
        <div className="program-header">
          <div>
            <h1 className="program-heading">Your Program</h1>
            <p className="program-sub">Tracking {user.name.split(' ')[0]}'s progression over the last year.</p>
          </div>
          <button className="program-goals-btn" onClick={() => navigate('/goals')}>
            <Target size={15} strokeWidth={2} />
            Goals
          </button>
        </div>

        <div className="chart-grid">
          {CHARTS.map(({ Icon, title, unit, data, color, gradId }) => {
            const latest = data[data.length - 1].value
            const delta  = latest - data[0].value
            return (
              <div key={gradId} className="chart-card">
                <div className="chart-card__header">
                  <div>
                    <div className="chart-card__label">
                      <span className="chart-card__icon"><Icon size={15} strokeWidth={2} /></span>
                      <span className="chart-card__title">{title}</span>
                    </div>
                    <div className="chart-card__stats">
                      <span className="chart-card__current">
                        {latest} <span className="chart-card__current-unit">{unit}</span>
                      </span>
                      <span className="chart-card__delta">▲ {delta} {unit}</span>
                    </div>
                  </div>
                </div>
                <div style={{ height: 160, marginTop: 12 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
                      <defs>
                        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"   stopColor={color} stopOpacity={0.35} />
                          <stop offset="100%" stopColor={color} stopOpacity={0}    />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="week" tick={{ fill: '#555', fontSize: 10 }} tickLine={false} axisLine={false} interval={4} />
                      <YAxis tick={{ fill: '#555', fontSize: 10 }} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                      <Tooltip content={<ChartTooltip unit={unit} />} cursor={{ stroke: '#333', strokeWidth: 1 }} />
                      <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2}
                        fill={`url(#${gradId})`} dot={false}
                        activeDot={{ r: 4, fill: color, strokeWidth: 0 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
