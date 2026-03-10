import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import SectionCard from '../components/SectionCard'

const sections = [
  { label: 'Welcome Routine',            route: 'welcome',   accent: 'Fixed' },
  { label: 'Warm Up Games',              route: 'warmup',    sublabel: 'Cone Rescue · Tag Tails' },
  { label: 'Throwing, Catching & Passing', route: 'throwing', sublabel: 'Boulder Bowling' },
  { label: 'Kicking, Striking & Scoring', route: 'kicking',  sublabel: 'Find the Goal' },
  { label: 'Game',                       route: 'game',      sublabel: 'Over the River' },
  { label: 'Cool Down',                  route: 'cooldown',  sublabel: 'Parachute' },
  { label: 'Tidy Up Routine',            route: 'tidyup',    accent: 'Fixed' },
]

export default function SessionPage() {
  const { weekId } = useParams()
  const navigate   = useNavigate()
  const [activeTab, setActiveTab] = useState(null)

  function go(route) {
    navigate(`/lessons/${weekId}/${route}`)
  }

  return (
    <div className="min-h-screen bg-[#007A3D] flex flex-col px-4 pt-safe pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 pt-5 pb-2">
        <BackButton to="/lessons" />
        <div>
          <h2 className="text-white font-extrabold text-xl leading-tight">Week {weekId}</h2>
          <p className="text-white/60 text-xs">Rolling &amp; Kicking</p>
        </div>
      </div>

      {/* Hero photo */}
      <div className="rounded-2xl overflow-hidden my-3">
        <img
          src="/images/session-photo.png"
          alt="Children training"
          className="w-full h-36 object-cover"
        />
      </div>

      {/* Section cards */}
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

      {/* Bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#005c2e] border-t border-white/10 flex">
        <button
          onClick={() => go('parents')}
          className={`flex-1 py-3 text-sm font-bold transition-colors ${
            activeTab === 'parents' ? 'text-[#FFCC00]' : 'text-white/70'
          }`}
        >
          👨‍👩‍👧 Instruct Parents
        </button>
        <div className="w-px bg-white/10" />
        <button
          onClick={() => go('layout')}
          className={`flex-1 py-3 text-sm font-bold transition-colors ${
            activeTab === 'layout' ? 'text-[#FFCC00]' : 'text-white/70'
          }`}
        >
          📐 Organisation
        </button>
      </div>

      {/* Decorative nav indicator */}
      <div className="fixed bottom-4 left-4 opacity-40 pointer-events-none">
        <span className="text-[#FFCC00] text-3xl">↩</span>
      </div>
    </div>
  )
}
