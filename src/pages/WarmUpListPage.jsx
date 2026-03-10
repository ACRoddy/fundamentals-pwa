import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import SectionCard from '../components/SectionCard'
import { week1 } from '../data/week1'

export default function WarmUpListPage() {
  const { weekId } = useParams()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#007A3D] px-4 pt-safe pb-8">
      <div className="flex items-center gap-4 pt-5 pb-6">
        <BackButton to={`/lessons/${weekId}`} />
        <h2 className="text-white font-extrabold text-xl">Warm Up Games</h2>
      </div>
      <div className="flex flex-col gap-3">
        {week1.warmup.map((activity, i) => (
          <SectionCard
            key={activity.id}
            label={activity.name}
            sublabel={`Warm Up Game ${i + 1} · ${activity.equipment.join(', ')}`}
            onClick={() => navigate(`/lessons/${weekId}/warmup/${i + 1}`)}
          />
        ))}
      </div>
    </div>
  )
}
