import { useState } from 'react'
import { Activity, Bone } from 'lucide-react'
import { MUSCLE_PAIN_TREE, JOINT_PAIN_TREE } from '../PainTree/painTreeData'
import PainSurveyModal from '../PainSurveyModal/PainSurveyModal'
import './PainSurveyCards.css'

const CARDS = [
  { type: 'muscle', Icon: Activity, label: 'Muscle Pain', tree: MUSCLE_PAIN_TREE },
  { type: 'joint',  Icon: Bone,     label: 'Joint Pain',  tree: JOINT_PAIN_TREE },
]

export default function PainSurveyCards() {
  const [modal, setModal] = useState(null)

  return (
    <>
      <div className="psc">
        <div className="psc__header">
          <span className="psc__title">Pain Assessment</span>
        </div>
        <div className="psc__row">
          {CARDS.map(({ type, Icon, label, tree }) => (
            <button
              key={type}
              className="psc__card"
              onClick={() => setModal(type)}
            >
              {/* Mini tree silhouette (blurred background) */}
              <div className="psc__preview">
                <div className="psc__preview-root" />
                <div className="psc__preview-nodes">
                  {tree.children.slice(0, 8).map((_, i) => (
                    <div key={i} className="psc__preview-dot" />
                  ))}
                </div>
              </div>
              <div className="psc__blur" />
              {/* Foreground */}
              <div className="psc__fg">
                <div className="psc__icon">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <span className="psc__label">{label}</span>
                <span className="psc__cta">Tap to assess</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {modal && (
        <PainSurveyModal
          type={modal}
          onClose={() => setModal(null)}
          onSave={(ids) => { /* future: persist selections */ }}
        />
      )}
    </>
  )
}
