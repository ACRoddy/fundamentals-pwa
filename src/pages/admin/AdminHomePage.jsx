import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { syncAllData, getLastSyncTime } from '../../lib/api'

function AdminCard({ icon, title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#FFCC00] text-black rounded-2xl p-5 text-left flex items-center gap-4 active:scale-95 transition-transform"
    >
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="font-extrabold text-lg leading-tight">{title}</p>
        <p className="text-black/60 text-sm">{subtitle}</p>
      </div>
      <span className="ml-auto text-black/40 text-xl">›</span>
    </button>
  )
}

export default function AdminHomePage() {
  const navigate = useNavigate()

  const [syncState, setSyncState] = useState('idle') // 'idle' | 'syncing' | 'done' | 'error'
  const [progress,  setProgress]  = useState({ done: 0, total: 0 })
  const [lastSync,  setLastSync]  = useState(() => getLastSyncTime())

  useEffect(() => {
    if (!sessionStorage.getItem('adminAuth')) navigate('/admin', { replace: true })
  }, [navigate])

  async function handleSync() {
    setSyncState('syncing')
    try {
      await syncAllData((done, total) => setProgress({ done, total }))
      setLastSync(new Date())
      setSyncState('done')
      setTimeout(() => setSyncState('idle'), 3000)
    } catch {
      setSyncState('error')
      setTimeout(() => setSyncState('idle'), 4000)
    }
  }

  const syncIcon     = syncState === 'done' ? '✅' : syncState === 'error' ? '⚠️' : '⬇️'
  const syncSubtitle = syncState === 'syncing'
    ? `Downloading week ${progress.done} of ${progress.total}…`
    : syncState === 'done'
    ? 'All sessions saved for offline use'
    : syncState === 'error'
    ? 'Sync failed — check your connection'
    : lastSync
    ? `Last synced ${lastSync.toLocaleDateString('en-IE')}`
    : 'Download all weeks to use offline'

  return (
    <div className="min-h-screen bg-[#007A3D] px-4 pt-safe pb-8">
      <div className="flex items-center justify-between pt-5 pb-6">
        <div>
          <h1 className="text-white font-extrabold text-2xl">Admin</h1>
          <p className="text-white/60 text-sm">CLG Watty Graham An Gleann</p>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem('adminAuth'); navigate('/menu') }}
          className="text-white/60 text-sm underline"
        >
          Sign out
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <AdminCard
          icon="📅"
          title="Set Up a Week"
          subtitle="Add activities for the next session"
          onClick={() => navigate('/admin/week')}
        />
        <AdminCard
          icon="🗂️"
          title="Activity Bank"
          subtitle="Add a new activity to the library"
          onClick={() => navigate('/admin/activity/new')}
        />

        {/* Sync for Offline — stateful, so built inline rather than via AdminCard */}
        <button
          onClick={handleSync}
          disabled={syncState === 'syncing'}
          className="w-full bg-[#FFCC00] text-black rounded-2xl p-5 text-left flex items-center gap-4 active:scale-95 transition-transform disabled:opacity-60"
        >
          <span className="text-3xl">{syncIcon}</span>
          <div>
            <p className="font-extrabold text-lg leading-tight">Sync for Offline</p>
            <p className="text-black/60 text-sm">{syncSubtitle}</p>
          </div>
          {syncState !== 'syncing' && <span className="ml-auto text-black/40 text-xl">›</span>}
        </button>
      </div>

      <button
        onClick={() => navigate('/menu')}
        className="mt-8 w-full text-white/50 text-sm text-center underline"
      >
        ← Back to app
      </button>
    </div>
  )
}
