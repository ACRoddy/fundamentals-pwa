import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SplashPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/menu', { replace: true }), 2200)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="min-h-screen bg-[#007A3D] flex flex-col items-center justify-center gap-6 px-8">
      <img
        src="/crest.JPG"
        alt="CLG Watty Graham An Gleann crest"
        className="w-48 h-auto drop-shadow-lg"
      />
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[#FFCC00] tracking-tight">Fundamentals</h1>
        <p className="text-white/80 text-sm mt-1">CLG Watty Graham An Gleann</p>
      </div>
    </div>
  )
}
