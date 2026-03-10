import { useParams, useLocation } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { week1 } from '../data/week1'

export default function AlternativePage() {
  const { weekId } = useParams()
  const location   = useLocation()
  // Path: /lessons/1/throwing/alternative → penultimate segment is 'throwing'
  const parts      = location.pathname.split('/')
  const section    = parts[parts.length - 2]
  const activity   = section === 'throwing' ? week1.throwing.alternative : null

  if (!activity) {
    return (
      <div className="min-h-screen bg-[#007A3D] flex items-center justify-center">
        <p className="text-white">No alternative available.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#007A3D] px-4 pt-safe pb-8">
      <div className="flex items-center gap-4 pt-5 pb-4">
        <BackButton to={`/lessons/${weekId}/${section}`} />
        <div>
          <p className="text-white/60 text-xs">Alternative Activity</p>
          <h2 className="text-white font-extrabold text-xl">{activity.name}</h2>
        </div>
      </div>

      <div className="bg-white/10 rounded-2xl p-4">
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
    </div>
  )
}
