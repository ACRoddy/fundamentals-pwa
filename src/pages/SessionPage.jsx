import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import SectionCard from '../components/SectionCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { useWeekData } from '../hooks/useWeekData'

const FIXED_SECTIONS = [
  { label: 'Welcome Routine', route: 'welcome', accent: 'Fixed' },
  { label: 'Tidy Up Routine', route: 'tidyup',  accent: 'Fixed' },
]

export default function SessionPage() {
  const { weekId }  = useParams()
  const navigate    = useNavigate()
  const [activeTab, setActiveTab] = useState(null)
  const { weekData, loading }     = useWeekData(weekId)

  function go(route) { navigate(`/lessons/${weekId}/${route}`) }

  if (loading) return <LoadingSpinner />

  const sections = [
    { label: 'Welcome Routine',              route: 'welcome',   accent: 'Fixed' },
    { label: 'Warm Up Games',                route: 'warmup',
      sublabel: weekData?.warmup?.map(a => a.name).join(' · ') || '' },
    { label: 'Throwing, Catching & Passing', route: 'throwing',
      sublabel: weekData?.throwing?.map(a => a.name).join(' · ') || '' },
    { label: 'Kicking, Striking & Scoring',  route: 'kicking',
      sublabel: weekData?.kicking?.map(a => a.name).join(' · ') || '' },
    { label: 'Cool Down',                    route: 'cooldown',
      sublabel: weekData?.cooldown?.name || 'Parachute' },
    { label: 'Tidy Up Routine',              route: 'tidyup',    accent: 'Fixed' },
  ]

  return (
    <div className="min-h-screen bg-[#007A3D] flex flex-col px-4 pt-safe pb-24">
      <div className="flex items-center gap-4 pt-5 pb-2">
        <BackButton to="/lessons" />
        <div>
          <h2 className="text-white font-extrabold text-xl leading-tight">Week {weekId}</h2>
          <p className="text-white/60 text-xs">{weekData?.focus || ''}</p>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden my-3">
        <img src="/images/session-photo.png" alt="Children training" className="w-full h-36 object-cover" />
      </div>

      <div className="flex flex-col gap-2.5 flex-1">
        {sections.map((s) => (
          <SectionCard
            key={s.route}
            label={s.label}
            sublabel={s.sublabel}
            accent={s.accent}
            onClick={() => go(s.route)}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#005c2e] border-t border-white/10 flex">
        <button
          onClick={() => go('parents')}
          className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'parents' ? 'text-[#FFCC00]' : 'text-white/70'}`}
        >
          👨‍👩‍👧 Instruct Parents
        </button>
        <div className="w-px bg-white/10" />
        <button
          onClick={() => go('layout')}
          className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'layout' ? 'text-[#FFCC00]' : 'text-white/70'}`}
        >
          📐 Organisation
        </button>
      </div>
    </div>
  )
}
