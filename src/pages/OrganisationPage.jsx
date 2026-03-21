import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import LoadingSpinner from '../components/LoadingSpinner'
import { useWeekData } from '../hooks/useWeekData'

export default function OrganisationPage() {
  const { weekId } = useParams()
  const { weekData, loading } = useWeekData(weekId)

  if (loading) return <LoadingSpinner />

  const layout = weekData?.layout || { notes: [], image: null }

  return (
    <div className="min-h-screen bg-[#007A3D] px-4 pt-safe pb-8">
      <div className="flex items-center gap-4 pt-5 pb-4">
        <BackButton to={`/lessons/${weekId}`} />
        <div>
          <p className="text-white/60 text-xs">Week {weekId}</p>
          <h2 className="text-white font-extrabold text-xl">Organisation / Layout</h2>
        </div>
      </div>

      {layout.image && (
        <div className="rounded-2xl overflow-hidden mb-5 bg-white/10">
          <img src={layout.image} alt="Layout diagram" className="w-full object-contain" />
        </div>
      )}

      <div className="bg-white/10 rounded-2xl p-4">
        <h3 className="text-[#FFCC00] font-bold text-sm uppercase tracking-wide mb-3">Session Layout Notes</h3>
        <ul className="space-y-2.5">
          {layout.notes.map((note, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="text-[#FFCC00] shrink-0 mt-0.5">→</span>
              <span className="text-white text-sm leading-relaxed">{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
