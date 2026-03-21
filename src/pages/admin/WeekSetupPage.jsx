import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import { getAllActivities, saveWeekPlan } from '../../lib/api'

const SECTIONS = [
  { key: 'warmup',   label: 'Warm Up',                    slots: 2 },
  { key: 'throwing', label: 'Throwing, Catching & Passing', slots: 2 },
  { key: 'kicking',  label: 'Kicking, Striking & Scoring',  slots: 2 },
  { key: 'cooldown', label: 'Cool Down',                    slots: 1 },
]

export default function WeekSetupPage() {
  const navigate = useNavigate()

  const [weekNumber,   setWeekNumber]   = useState(2)
  const [focus,        setFocus]        = useState('')
  const [layoutNotes,  setLayoutNotes]  = useState(['', '', '', '', ''])
  const [activities,   setActivities]   = useState({})   // { warmup: [], throwing: [], ... }
  const [slots,        setSlots]        = useState({})   // { warmup_1: '', warmup_2: '', ... }
  const [saving,       setSaving]       = useState(false)
  const [saved,        setSaved]        = useState(false)
  const [error,        setError]        = useState(null)

  useEffect(() => {
    if (!sessionStorage.getItem('adminAuth')) { navigate('/admin', { replace: true }); return }

    // Load all activities grouped by type
    Promise.all([
      getAllActivities('warmup'),
      getAllActivities('throwing'),
      getAllActivities('kicking'),
      getAllActivities('cooldown'),
    ]).then(([warmup, throwing, kicking, cooldown]) => {
      setActivities({ warmup, throwing, kicking, cooldown })
    }).catch(err => setError(err.message))
  }, [navigate])

  function setSlot(section, slotOrder, value) {
    setSlots(prev => ({ ...prev, [`${section}_${slotOrder}`]: value }))
  }

  function setNote(i, value) {
    setLayoutNotes(prev => { const n = [...prev]; n[i] = value; return n })
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const slotRows = []
      for (const sec of SECTIONS) {
        for (let i = 1; i <= sec.slots; i++) {
          const id = slots[`${sec.key}_${i}`]
          if (id) slotRows.push({ section: sec.key, slot_order: i, activity_id: id })
        }
      }
      await saveWeekPlan({
        weekNumber,
        focus,
        layoutNotes: layoutNotes.filter(Boolean),
        slots: slotRows,
      })
      setSaved(true)
      setTimeout(() => { setSaved(false); navigate('/admin/home') }, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#007A3D] px-4 pt-safe pb-12">
      <div className="flex items-center gap-4 pt-5 pb-6">
        <BackButton to="/admin/home" />
        <h1 className="text-white font-extrabold text-xl">Set Up a Week</h1>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5">

        {/* Week number + focus */}
        <div className="bg-white/10 rounded-2xl p-4 flex flex-col gap-3">
          <div>
            <label className="text-[#FFCC00] text-xs font-bold uppercase tracking-wide block mb-1">
              Week Number
            </label>
            <select
              value={weekNumber}
              onChange={e => setWeekNumber(Number(e.target.value))}
              className="w-full bg-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFCC00]"
            >
              {Array.from({ length: 24 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n} className="bg-[#007A3D]">Week {n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[#FFCC00] text-xs font-bold uppercase tracking-wide block mb-1">
              Focus / Theme
            </label>
            <input
              value={focus}
              onChange={e => setFocus(e.target.value)}
              placeholder="e.g. Catching & Striking"
              className="w-full bg-white/10 text-white rounded-xl px-3 py-2.5 text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFCC00]"
            />
          </div>
        </div>

        {/* Activity slots per section */}
        {SECTIONS.map(sec => (
          <div key={sec.key} className="bg-white/10 rounded-2xl p-4 flex flex-col gap-3">
            <h3 className="text-[#FFCC00] font-bold text-sm uppercase tracking-wide">{sec.label}</h3>
            {Array.from({ length: sec.slots }, (_, i) => i + 1).map(slotOrder => (
              <div key={slotOrder}>
                <label className="text-white/60 text-xs block mb-1">
                  {sec.slots > 1 ? `Activity ${slotOrder}` : 'Activity'}
                </label>
                <select
                  value={slots[`${sec.key}_${slotOrder}`] || ''}
                  onChange={e => setSlot(sec.key, slotOrder, e.target.value)}
                  className="w-full bg-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFCC00]"
                >
                  <option value="" className="bg-[#007A3D]">— pick activity —</option>
                  {(activities[sec.key] || []).map(a => (
                    <option key={a.id} value={a.id} className="bg-[#007A3D]">{a.name}</option>
                  ))}
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={() => navigate('/admin/activity/new')}
              className="text-[#FFCC00] text-xs underline text-left mt-1"
            >
              + Add new activity to bank first
            </button>
          </div>
        ))}

        {/* Layout / Organisation notes */}
        <div className="bg-white/10 rounded-2xl p-4 flex flex-col gap-3">
          <h3 className="text-[#FFCC00] font-bold text-sm uppercase tracking-wide">
            Organisation Notes
          </h3>
          <p className="text-white/50 text-xs">Pitch setup tips shown on the Organisation screen</p>
          {layoutNotes.map((note, i) => (
            <textarea
              key={i}
              value={note}
              onChange={e => setNote(i, e.target.value)}
              placeholder={`Note ${i + 1}…`}
              rows={2}
              className="w-full bg-white/10 text-white rounded-xl px-3 py-2.5 text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] resize-none"
            />
          ))}
        </div>

        {error && <p className="text-red-300 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-[#FFCC00] text-black font-extrabold rounded-2xl py-4 text-lg disabled:opacity-50"
        >
          {saved ? '✓ Saved!' : saving ? 'Saving…' : 'Save Week'}
        </button>
      </form>
    </div>
  )
}
