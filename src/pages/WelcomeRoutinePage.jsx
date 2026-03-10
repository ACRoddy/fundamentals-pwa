import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { staticContent } from '../data/week1'

export default function WelcomeRoutinePage() {
  const { weekId } = useParams()
  const { welcome } = staticContent

  return (
    <div className="min-h-screen bg-[#007A3D] px-4 pt-safe pb-8">
      <div className="flex items-center gap-4 pt-5 pb-4">
        <BackButton to={`/lessons/${weekId}`} />
        <div>
          <p className="text-white/60 text-xs">Fixed · Every Week</p>
          <h2 className="text-white font-extrabold text-xl">{welcome.title}</h2>
        </div>
      </div>

      {/* Consistency note */}
      <div className="bg-[#FFCC00] text-black rounded-2xl px-4 py-3 mb-5 text-sm font-semibold">
        💡 {welcome.note}
      </div>

      <div className="flex flex-col gap-3">
        {welcome.steps.map((step, i) => (
          <div key={i} className="bg-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#FFCC00] text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <h3 className="text-[#FFCC00] font-bold text-sm">{step.heading}</h3>
            </div>
            <p className="text-white text-sm leading-relaxed pl-8">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
