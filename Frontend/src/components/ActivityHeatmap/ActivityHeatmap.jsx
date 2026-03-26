import { useApp } from '../../context/AppContext'
import './ActivityHeatmap.css'

/* ── Data generation (seeded RNG so it's stable across renders) ── */
const activityData = (() => {
  let seed = 7341
  const rng = () => {
    seed = (seed * 1664525 + 1013904223) & 0xFFFFFFFF
    return (seed >>> 0) / 0xFFFFFFFF
  }
  return Array.from({ length: 52 }, (_, w) =>
    Array.from({ length: 7 }, () => {
      const r = rng(), recency = w / 52
      if (r > 0.92 - recency * 0.1) return 4
      if (r > 0.78 - recency * 0.08) return 3
      if (r > 0.62 - recency * 0.06) return 2
      if (r > 0.45) return 1
      return 0
    })
  )
})()

const PALETTES = {
  orange: ['#1A1A1A', '#6B2410', '#A63A1A', '#D45020', '#FF6B35'],
  yellow: ['#DCDCDC', '#FDE68A', '#FBBF24', '#F59E0B', '#D97706'],
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS   = ['', 'Mon', '', 'Wed', '', 'Fri', '']

function getMonthLabels() {
  const now = new Date()
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now)
    d.setMonth(now.getMonth() - 11 + i)
    return { label: MONTHS[d.getMonth()], weekIdx: Math.round(i * 4.33) }
  })
}

const totalSessions = activityData.flat().filter(v => v > 0).length
const monthLabels   = getMonthLabels()

export default function ActivityHeatmap() {
  const { theme } = useApp()
  const colors = PALETTES[theme] ?? PALETTES.orange

  return (
    <div className="ah">
      <div className="ah__header">
        <span className="ah__title">Training Activity</span>
        <span className="ah__count">{totalSessions} sessions in the last year</span>
      </div>

      <div className="ah__wrap">
        {/* Month labels row */}
        <div className="ah__month-row">
          <div className="ah__spacer" />
          <div className="ah__months">
            {monthLabels.map(ml => (
              <div key={ml.label} className="ah__month">{ml.label}</div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="ah__grid">
          <div className="ah__days">
            {DAYS.map((d, i) => <div key={i} className="ah__day">{d}</div>)}
          </div>
          <div className="ah__weeks">
            {activityData.map((week, wi) => (
              <div key={wi} className="ah__week">
                {week.map((level, di) => (
                  <div
                    key={di}
                    className="ah__cell"
                    style={{
                      background: colors[level],
                      boxShadow: level >= 3 ? `0 0 4px ${colors[level]}99` : 'none',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="ah__legend">
          <span className="ah__legend-text">Less</span>
          {colors.map((c, i) => (
            <div key={i} className="ah__cell" style={{ background: c }} />
          ))}
          <span className="ah__legend-text">More</span>
        </div>
      </div>
    </div>
  )
}
