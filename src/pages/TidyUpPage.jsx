import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { staticContent } from '../data/week1'

export default function TidyUpPage() {
  const { weekId } = useParams()
  const { tidyup } = staticContent

  return (
    <div className="min-h-screen bg-[#007A3D] px-4 pt-safe pb-8">
      <div className="flex items-center gap-4 pt-5 pb-4">
        <BackButton to={`/lessons/${weekId}`} />
        <div>
          <p className="text-white/60 text-xs">Fixed · Every Week</p>
          <h2 className="text-white font-extrabold text-xl">{tidyup.title}</h2>
        </div>
      </div>

      <div className="bg-[#FFCC00] text-black rounded-2xl px-4 py-3 mb-5 text-sm font-semibold">
        💡 {tidyup.note}
      </div>

      <div className="flex flex-col gap-4">
        {tidyup.groups.map((group, gi) => (
          <div key={gi} className="bg-white/10 rounded-2xl p-4">
            <h3 className="text-[#FFCC00] font-bold text-sm mb-3">{group.heading}</h3>
            <ol className="space-y-2">
              {group.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="bg-[#FFCC00] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-white text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  )
}
