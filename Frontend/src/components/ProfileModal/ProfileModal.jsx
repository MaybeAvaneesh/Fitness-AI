import { useNavigate } from 'react-router-dom'
import { BarChart2, Target, User, LogOut } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import './ProfileModal.css'

const items = [
  { Icon: BarChart2, label: 'My Program', path: '/program/1' },
  { Icon: Target,    label: 'Goals',      path: '/goals'     },
  { Icon: User,      label: 'Profile',    path: '/profile'   },
]

export default function ProfileModal({ onClose }) {
  const navigate = useNavigate()
  const { user, logout } = useApp()
  const initials = user.name.split(' ').map(n => n[0]).join('')
  const go = (path) => { onClose(); navigate(path) }

  return (
    <div className="pm">
      <div className="pm__user-row">
        <div className="pm__avatar">{initials}</div>
        <div>
          <div className="pm__name">{user.name}</div>
          <div className="pm__email">{user.email}</div>
        </div>
      </div>

      <div className="pm__divider" />

      {items.map(({ Icon, label, path }) => (
        <button key={path} className="pm__item" onClick={() => go(path)}>
          <span className="pm__item-icon"><Icon size={15} strokeWidth={2} /></span>
          {label}
        </button>
      ))}

      <div className="pm__divider" />

      <button className="pm__item pm__item--danger" onClick={() => { logout(); go('/welcome') }}>
        <span className="pm__item-icon"><LogOut size={15} strokeWidth={2} /></span>
        Sign Out
      </button>
    </div>
  )
}
