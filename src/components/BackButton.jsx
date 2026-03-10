import { useNavigate } from 'react-router-dom'

export default function BackButton({ to }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="flex items-center gap-1 bg-[#FFCC00] text-black font-bold px-4 py-2 rounded-full text-sm active:opacity-80"
    >
      <span className="text-lg leading-none">‹</span>
      <span>Back</span>
    </button>
  )
}
