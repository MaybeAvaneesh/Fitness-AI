import { useState, useCallback } from 'react'
import { X } from 'lucide-react'
import { MUSCLE_PAIN_TREE, JOINT_PAIN_TREE } from '../PainTree/painTreeData'
import PainTree from '../PainTree/PainTree'
import './PainSurveyModal.css'

export default function PainSurveyModal({ type, onClose, onSave }) {
  const tree = type === 'muscle' ? MUSCLE_PAIN_TREE : JOINT_PAIN_TREE
  // Map<nodeId, intensity (1–10)> — click cycles 1→2→...→10→deselect
  const [intensityMap, setIntensityMap] = useState(new Map())
  const [expandedIds, setExpandedIds] = useState(new Set())

  const onToggle = useCallback(id => {
    setIntensityMap(prev => {
      const next = new Map(prev)
      const current = next.get(id) ?? 0
      if (current >= 10) {
        next.delete(id)
      } else {
        next.set(id, current + 1)
      }
      return next
    })
  }, [])

  const onExpand = useCallback(id => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const handleDone = () => {
    onSave(Object.fromEntries(intensityMap))
    onClose()
  }

  return (
    <div className="psm__overlay" onClick={onClose}>
      <div className="psm__card" onClick={e => e.stopPropagation()}>
        <div className="psm__header">
          <h2 className="psm__title">{tree.label}</h2>
          <button className="psm__close" onClick={onClose}>
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <p className="psm__hint">
          Click to add pain — keep clicking to increase intensity (1–10)
        </p>

        <div className="psm__body">
          <PainTree
            tree={tree}
            intensityMap={intensityMap}
            expandedIds={expandedIds}
            onToggle={onToggle}
            onExpand={onExpand}
          />
        </div>

        <div className="psm__footer">
          <span className="psm__count">
            {intensityMap.size} area{intensityMap.size !== 1 ? 's' : ''} selected
          </span>
          <button className="psm__done" onClick={handleDone}>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
