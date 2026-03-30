import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import './DeleteAccountModal.css'

export default function DeleteAccountModal({ onClose, onConfirm }) {
  const [value, setValue] = useState('')
  const match = value.trim() === 'DELETE'

  return (
    <div className="dam__overlay" onClick={onClose}>
      <div className="dam__card" onClick={e => e.stopPropagation()}>
        <div className="dam__icon-wrap">
          <AlertTriangle size={32} strokeWidth={2} />
        </div>

        <h2 className="dam__title">Delete Account</h2>
        <p className="dam__text">
          This action is <strong>permanent</strong>. All your data, goals, and
          training history will be lost and cannot be recovered.
        </p>

        <label className="dam__label">
          Type <strong>DELETE</strong> to confirm
        </label>
        <input
          className="dam__input"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="DELETE"
          autoFocus
        />

        <div className="dam__actions">
          <button className="dam__btn dam__btn--cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="dam__btn dam__btn--danger"
            disabled={!match}
            onClick={onConfirm}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
