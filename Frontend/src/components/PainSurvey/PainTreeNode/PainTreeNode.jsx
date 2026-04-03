import { useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import './PainTreeNode.css'

export default function PainTreeNode({
  id, label, intensity, selected, expanded, hasChildren, isRoot, onClick, registerRef,
}) {
  const ref = useCallback(
    el => { if (el && registerRef) registerRef(id, el) },
    [id, registerRef],
  )

  if (isRoot) {
    return (
      <div className="ptn ptn--root" ref={ref}>
        {label}
      </div>
    )
  }

  const cls = [
    'ptn',
    selected && 'ptn--selected',
    hasChildren && 'ptn--parent',
    expanded && 'ptn--expanded',
  ].filter(Boolean).join(' ')

  // Intensity drives opacity of the accent color (0.1 at 1, 1.0 at 10)
  const intensityStyle = selected && intensity
    ? { '--ptn-intensity': intensity / 10 }
    : undefined

  return (
    <button className={cls} ref={ref} onClick={() => onClick(id)} style={intensityStyle}>
      <span className="ptn__label">{label}</span>
      {selected && intensity > 0 && (
        <span className="ptn__intensity">{intensity}</span>
      )}
      {hasChildren && (
        <ChevronDown size={14} strokeWidth={2} className="ptn__chevron" />
      )}
    </button>
  )
}
