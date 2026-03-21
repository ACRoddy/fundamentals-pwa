import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminGatePage() {
  const [pin, setPin]     = useState('')
  const [error, setError] = useState(false)
  const navigate          = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (pin === import.meta.env.VITE_ADMIN_PIN) {
      sessionStorage.setItem('adminAuth', 'true')
      navigate('/admin/home')
    } else {
      setError(true)
      setPin('')
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#007A3D] flex flex-col items-center justify-center px-6">
      <img src="/crest.JPG" alt="Club crest" className="w-16 h-16 object-contain rounded-full mb-4" />
      <h1 className="text-white font-extrabold text-2xl mb-1">Admin</h1>
      <p className="text-white/60 text-sm mb-8">Enter your PIN to continue</p>

      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4">
        <input
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={e => setPin(e.target.value)}
          placeholder="PIN"
          className="w-full text-center text-2xl tracking-widest bg-white/10 border-2 border-white/20 rounded-2xl py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#FFCC00]"
          autoFocus
        />
        {error && <p className="text-red-300 text-sm text-center">Incorrect PIN — try again</p>}
        <button
          type="submit"
          className="w-full bg-[#FFCC00] text-black font-bold rounded-2xl py-4 text-lg"
        >
          Enter
        </button>
      </form>
    </div>
  )
}
