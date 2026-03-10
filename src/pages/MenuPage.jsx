import { useNavigate } from 'react-router-dom'
import YellowTile from '../components/YellowTile'

const menuItems = [
  { label: 'Lessons',             route: '/lessons' },
  { label: 'Layout & Organisation', route: '/layout-org' },
  { label: 'Inclusion',           sublabel: 'Supporting children with additional needs', route: '/inclusion' },
  { label: 'Alternative Activities', route: '/alt-activities' },
  { label: 'Resources for Parents', route: '/parents-resources' },
  { label: 'Committee',           route: '/committee' },
  { label: 'Fundamentals Calendar', route: '/calendar' },
  { label: 'Term Set Up & Events', route: '/setup' },
]

export default function MenuPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#007A3D] flex flex-col px-4 pt-safe">
      {/* Header */}
      <div className="flex items-center gap-3 pt-6 pb-4 px-2">
        <img src="/crest.JPG" alt="Club crest" className="w-10 h-auto" />
        <div className="min-w-0">
          <h1 className="text-white font-extrabold text-xl leading-tight">Fundamentals</h1>
          <p className="text-white/60 text-xs truncate">CLG Watty Graham An Gleann</p>
        </div>
      </div>

      {/* 2-column tile grid */}
      <div className="grid grid-cols-2 gap-3 flex-1 pb-8">
        {menuItems.map((item) => (
          <YellowTile
            key={item.route}
            label={item.label}
            sublabel={item.sublabel}
            onClick={() => navigate(item.route)}
            className="p-4 min-h-[90px]"
          />
        ))}
      </div>
    </div>
  )
}
