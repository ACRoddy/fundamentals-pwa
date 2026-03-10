import { useNavigate, useLocation } from 'react-router-dom'
import BackButton from '../components/BackButton'

const sectionNames = {
  '/inclusion':          'Inclusion',
  '/alt-activities':     'Alternative Activities',
  '/parents-resources':  'Resources for Parents',
  '/committee':          'Committee',
  '/calendar':           'Fundamentals Calendar',
  '/setup':              'Term Set Up & Events',
  '/layout-org':         'Layout & Organisation',
}

export default function ComingSoonPage() {
  const location = useLocation()
  const name = sectionNames[location.pathname] ?? 'This Section'

  return (
    <div className="min-h-screen bg-[#007A3D] flex flex-col px-4 pt-safe">
      <div className="pt-5 pb-4">
        <BackButton to="/menu" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 pb-16">
        <span className="text-6xl">🚧</span>
        <h2 className="text-white font-extrabold text-2xl">{name}</h2>
        <p className="text-white/60 text-sm max-w-xs">
          This section is being prepared. Check back soon!
        </p>
      </div>
    </div>
  )
}
