import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import YellowTile from '../components/YellowTile'
import { useAllWeeks } from '../hooks/useAllWeeks'

export default function WeekGridPage() {
  const navigate = useNavigate()
  const [toast, setToast] = useState(false)
  const { weeks, loading } = useAllWeeks()

  function handleWeekTap(week) {
    if (week.active) {
      navigate(`/lessons/${week.id}`)
    } else {
      setToast(true)
      setTimeout(() => setToast(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#007A3D] flex flex-col px-4 pt-safe">
      <div className="flex items-center gap-4 pt-5 pb-4">
        <BackButton to="/menu" />
        <h2 className="text-white font-extrabold text-xl">Lessons</h2>
      </div>

      <div className="grid grid-cols-4 gap-2.5 pb-8">
        {(weeks ?? Array.from({ length: 24 }, (_, i) => ({ id: i+1, title: `Week ${i+1}`, active: false }))).map((week) => (
          <YellowTile
            key={week.id}
            label={week.title}
            onClick={() => handleWeekTap(week)}
            disabled={!week.active || loading}
            className="aspect-square text-sm"
          />
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-5 py-2.5 rounded-full shadow-lg">
          Coming soon
        </div>
      )}

      <div className="fixed bottom-4 left-4 opacity-40 pointer-events-none">
        <span className="text-[#FFCC00] text-3xl">↩</span>
      </div>
    </div>
  )
}
