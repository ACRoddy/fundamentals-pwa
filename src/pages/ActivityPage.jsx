import { useParams, useNavigate, useLocation } from 'react-router-dom'
import BackButton from '../components/BackButton'
import EquipmentBadge from '../components/EquipmentBadge'
import LoadingSpinner from '../components/LoadingSpinner'
import { useWeekData } from '../hooks/useWeekData'

export default function ActivityPage() {
  const { weekId, slot } = useParams()
  const navigate  = useNavigate()
  const location  = useLocation()
  const parts     = location.pathname.split('/')
  const section   = parts[parts.length - 2]
  const { weekData, loading } = useWeekData(weekId)

  if (loading) return <LoadingSpinner />

  const activities = weekData?.[section] || []
  const activity   = activities[parseInt(slot, 10) - 1]

  const otherSlot     = slot === '1' ? '2' : '1'
  const otherActivity = activities?.[parseInt(otherSlot, 10) - 1]

  if (!activity) {
    return (
      <div className="min-h-screen bg-[#007A3D] flex items-center justify-center">
        <p className="text-white">Activity not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#007A3D] px-4 pt-safe pb-8">

      {/* Header */}
      <div className="flex items-center gap-4 pt-5 pb-4">
        <BackButton to={`/lessons/${weekId}/${section}`} />
        <div>
          <p className="text-white/60 text-xs">{activity.slot}</p>
          <h2 className="text-white font-extrabold text-xl">{activity.name}</h2>
        </div>
      </div>

      {/* Skill cue banner */}
      {activity.skillCue && (
        <div className="bg-[#FFCC00] text-black font-bold rounded-2xl px-4 py-3 mb-4 text-sm">
          🎯 {activity.skillCue}
        </div>
      )}

      {/* Equipment */}
      {activity.equipment?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activity.equipment.map((e) => <EquipmentBadge key={e} item={e} />)}
        </div>
      )}

      {/* Diagram / image(s) */}
      {activity.images?.length > 0 ? (
        <div className="flex flex-col gap-3 mb-5">
          {activity.images.map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white/10">
              <img src={src} alt={`${activity.name} ${i + 1}`} className="w-full object-contain max-h-52" />
            </div>
          ))}
        </div>
      ) : activity.image ? (
        <div className="rounded-2xl overflow-hidden mb-5 bg-white/10">
          <img src={activity.image} alt={activity.name} className="w-full object-contain max-h-52" />
        </div>
      ) : null}

      {/* Instructions */}
      <div className="bg-white/10 rounded-2xl p-4 mb-4">
        <h3 className="text-[#FFCC00] font-bold text-sm uppercase tracking-wide mb-3">Instructions</h3>
        <ol className="space-y-2.5">
          {activity.instructions.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="bg-[#FFCC00] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-white text-sm leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Coaching notes */}
      {(activity.encourage || activity.p1) && (
        <div className="bg-white/10 rounded-2xl p-4 mb-4">
          <h3 className="text-[#FFCC00] font-bold text-sm uppercase tracking-wide mb-2">Coaching Notes</h3>
          {activity.encourage && (
            <p className="text-white text-sm mb-1">💬 {activity.encourage}</p>
          )}
          {activity.p1 && (
            <p className="text-white text-sm">📌 P1: {activity.p1}</p>
          )}
        </div>
      )}

      {/* Extension / P1 steps */}
      {activity.extension?.length > 0 && (
        <div className="bg-white/10 rounded-2xl p-4 mb-4">
          <h3 className="text-[#FFCC00] font-bold text-sm uppercase tracking-wide mb-3">Extension / P1</h3>
          <ol className="space-y-2">
            {activity.extension.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="bg-white/30 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-white text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Switch to other activity in same section */}
      {otherActivity && (
        <button
          onClick={() => navigate(`/lessons/${weekId}/${section}/${otherSlot}`)}
          className="w-full bg-[#FFCC00] text-black font-bold rounded-2xl py-3 text-sm mt-2"
        >
          Switch to {otherActivity.name} →
        </button>
      )}

    </div>
  )
}
