import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import ProfileModal from '../ProfileModal/ProfileModal'
import './Header.css'

export default function Header() {
  const navigate = useNavigate()
  const { user, profileOpen, setProfileOpen, toggleTheme } = useApp()
  const ref = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setProfileOpen(false)
    }
    if (profileOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [profileOpen, setProfileOpen])

  const initials = user.name.split(' ').map(n => n[0]).join('')

  return (
    <header className="header">
      <div className="header__logo" onClick={() => navigate('/welcome')}>
        Power<span>ML</span>
      </div>

      <div className="header__right">
        <button
          className="header__theme-btn"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          <span className="header__theme-swatch" />
        </button>

        <div className="header__modal-wrap" ref={ref}>
          <button
            className="header__avatar"
            onClick={() => setProfileOpen(p => !p)}
          >
            {initials}
          </button>
          {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}
        </div>
      </div>
    </header>
  )
}
