import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import EquipmentBadge from '../components/EquipmentBadge'
import LoadingSpinner from '../components/LoadingSpinner'
import { useWeekData } from '../hooks/useWeekData'

export default function WarmUpPage() {
  const { weekId, slot } = useParams()
  const navigate = useNavigate()
  const { weekData, loading } = useWeekData(weekId)

  if (loading) return <LoadingSpinner />

  const activity      = weekData?.warmup?.[parseInt(slot, 10) - 1]
  const otherSlot     = slot === '1' ? '2' : '1'
  const otherActivity = weekData?.warmup?.[parseInt(otherSlot, 10) - 1]

  if (!activity) {
    return (
      <div className="min-h-screen bg-[#007A3D] flex items-center justify-center">
        <p className="text-white">Activity not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#007A3D] px-4 pt-safe pb-8">
      <div className="flex items-center gap-4 pt-5 pb-4">
        <BackButton to={`/lessons/${weekId}/warmup`} />
        <div>
          <p className="text-white/60 text-xs">Warm Up Game {slot}</p>
          <h2 className="text-white font-extrabold text-xl">{activity.name}</h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {activity.equipment.map((e) => <EquipmentBadge key={e} item={e} />)}
      </div>

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

      {(activity.easier || activity.harder) && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {activity.easier && (
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-[#FFCC00] text-xs font-bold mb-1">✅ Easier</p>
              <p className="text-white text-sm">{activity.easier}</p>
            </div>
          )}
          {activity.harder && (
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-[#FFCC00] text-xs font-bold mb-1">🔥 Harder</p>
              <p className="text-white text-sm">{activity.harder}</p>
            </div>
          )}
        </div>
      )}

      {otherActivity && (
        <button
          onClick={() => navigate(`/lessons/${weekId}/warmup/${otherSlot}`)}
          className="w-full bg-[#FFCC00] text-black font-bold rounded-2xl py-3 text-sm mt-2"
        >
          Switch to {otherActivity.name} →
        </button>
      )}
    </div>
  )
}
