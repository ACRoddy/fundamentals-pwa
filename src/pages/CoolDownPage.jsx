import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import EquipmentBadge from '../components/EquipmentBadge'
import { week1 } from '../data/week1'

export default function CoolDownPage() {
  const { weekId } = useParams()
  const { cooldown } = week1

  return (
    <div className="min-h-screen bg-[#007A3D] px-4 pt-safe pb-8">
      <div className="flex items-center gap-4 pt-5 pb-4">
        <BackButton to={`/lessons/${weekId}`} />
        <div>
          <p className="text-white/60 text-xs">{cooldown.slot}</p>
          <h2 className="text-white font-extrabold text-xl">{cooldown.name}</h2>
        </div>
      </div>

      {/* Equipment */}
      <div className="flex flex-wrap gap-2 mb-4">
        {cooldown.equipment.map((e) => <EquipmentBadge key={e} item={e} />)}
      </div>

      {/* Image */}
      {cooldown.image && (
        <div className="rounded-2xl overflow-hidden mb-5 bg-white/10">
          <img src={cooldown.image} alt="Parachute" className="w-full object-contain max-h-48" />
        </div>
      )}

      {/* Games */}
      <div className="flex flex-col gap-4">
        {cooldown.games.map((game, gi) => (
          <div key={gi} className="bg-white/10 rounded-2xl p-4">
            <h3 className="text-[#FFCC00] font-bold text-sm mb-3">🎮 {game.name}</h3>
            <ol className="space-y-2.5">
              {game.steps.map((step, i) => (
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
