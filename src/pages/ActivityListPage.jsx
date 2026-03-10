import { useNavigate, useParams, useLocation } from 'react-router-dom'
import BackButton from '../components/BackButton'
import SectionCard from '../components/SectionCard'
import { week1 } from '../data/week1'

const sectionLabels = {
  throwing: 'Throwing, Catching & Passing',
  kicking:  'Kicking, Striking & Scoring',
}

export default function ActivityListPage() {
  const { weekId }   = useParams()
  const navigate     = useNavigate()
  const location     = useLocation()
  const section      = location.pathname.split('/').pop()
  const activities   = week1[section]
  const label        = sectionLabels[section] || section

  return (
    <div className="min-h-screen bg-[#007A3D] px-4 pt-safe pb-8">
      <div className="flex items-center gap-4 pt-5 pb-6">
        <BackButton to={`/lessons/${weekId}`} />
        <h2 className="text-white font-extrabold text-xl">{label}</h2>
      </div>

      <div className="flex flex-col gap-3">
        {activities.map((activity, i) => (
          <SectionCard
            key={activity.id}
            label={activity.name}
            sublabel={`Activity ${i + 1} · ${activity.equipment.join(', ')}`}
            onClick={() => navigate(`/lessons/${weekId}/${section}/${i + 1}`)}
          />
        ))}
      </div>
    </div>
  )
}
