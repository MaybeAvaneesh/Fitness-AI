import './TickerStrip.css'

const ITEMS = [
  'SQUAT',
  'BENCH PRESS',
  'DEADLIFT',
  'OVERHEAD PRESS',
  'RDL',
  'BARBELL ROW',
  'FRONT SQUAT',
  'CLOSE-GRIP BENCH',
  'PULL-UP',
  'DIP',
  'LUNGE',
]

// Duplicate the list so the loop is seamless
const TRACK = [...ITEMS, ...ITEMS]

export default function TickerStrip() {
  return (
    <div className="ticker">
      <div className="ticker__track">
        {TRACK.map((item, i) => (
          <span key={i} className="ticker__item">
            {item}
            <span className="ticker__dot" aria-hidden="true">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
