import { useNavigate } from 'react-router-dom'

export default function BackButton({ to }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="flex items-center gap-1 bg-[#FFCC00] text-black font-bold px-4 py-3 rounded-full text-sm active:scale-95 transition-transform touch-manipulation"
    >
      <span className="text-lg leading-none">‹</span>
      <span>Back</span>
    </button>
  )
}
