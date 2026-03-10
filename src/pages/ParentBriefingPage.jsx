import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { staticContent } from '../data/week1'

export default function ParentBriefingPage() {
  const { weekId } = useParams()
  const { parentBriefing } = staticContent

  return (
    <div className="min-h-screen bg-[#007A3D] px-4 pt-safe pb-8">
      <div className="flex items-center gap-4 pt-5 pb-4">
        <BackButton to={`/lessons/${weekId}`} />
        <h2 className="text-white font-extrabold text-xl">{parentBriefing.title}</h2>
      </div>

      <p className="text-white/70 text-sm mb-5 px-1">{parentBriefing.intro}</p>

      <div className="bg-white/10 rounded-2xl p-4">
        <ul className="space-y-3">
          {parentBriefing.points.map((point, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="text-[#FFCC00] text-lg leading-none mt-0.5">✓</span>
              <span className="text-white text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
