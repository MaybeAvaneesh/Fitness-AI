import { lazy, Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Target, Trash2 } from 'lucide-react'
import Header from '../../components/Header/Header'
import ActivityHeatmap from '../../components/ActivityHeatmap/ActivityHeatmap'
import DeleteAccountModal from '../../components/DeleteAccountModal/DeleteAccountModal'
import { useApp } from '../../context/AppContext'
import './Profile.css'

const BodyStatsCard = lazy(() => import('../../components/BodyStatsCard/BodyStatsCard'))

export default function Profile() {
  const navigate = useNavigate()
  const { user, deleteAccount } = useApp()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const monthsSince = () => {
    const now = new Date()
    return (now.getFullYear() - user.joinDate.getFullYear()) * 12
         + (now.getMonth() - user.joinDate.getMonth())
  }

  const joinFmt = user.joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const months  = monthsSince()

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-content">

        <div className="profile-top">
          <div className="profile-big-avatar">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-join">
              Member since {joinFmt} · <span>{months} month{months !== 1 ? 's' : ''}</span>
            </p>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        <div className="profile-section">
          <ActivityHeatmap />
        </div>

        <Suspense fallback={<div className="profile-section profile-section--skeleton" />}>
          <div className="profile-section">
            <BodyStatsCard />
          </div>
        </Suspense>

        <button className="profile-goals-btn" onClick={() => navigate('/goals')}>
          <Target size={18} strokeWidth={2} />
          View My Goals
        </button>

        <div className="profile-danger">
          <span className="profile-danger__title">Danger Zone</span>
          <p className="profile-danger__text">
            Permanently delete your account and all associated data.
          </p>
          <button
            className="profile-danger__btn"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete your account?')) {
                setShowDeleteModal(true)
              }
            }}
          >
            <Trash2 size={15} strokeWidth={2} />
            Delete Account
          </button>
        </div>

        {showDeleteModal && (
          <DeleteAccountModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => { deleteAccount(); navigate('/welcome') }}
          />
        )}

      </div>
    </div>
  )
}
