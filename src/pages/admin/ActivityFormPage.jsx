import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import { saveActivity } from '../../lib/api'

const TYPES = [
  { value: 'warmup',   label: 'Warm Up' },
  { value: 'throwing', label: 'Throwing, Catching & Passing' },
  { value: 'kicking',  label: 'Kicking, Striking & Scoring' },
  { value: 'cooldown', label: 'Cool Down' },
]

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ActivityFormPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    id:           '',
    name:         '',
    type:         'warmup',
    skill_cue:    '',
    equipment:    '',         // comma-separated string, converted on save
    images:       '',         // comma-separated filenames
    coaching_note: '',
    p1_note:      '',
    easier:       '',
    harder:       '',
  })
  const [instructions, setInstructions] = useState([''])
  const [extension,    setExtension]    = useState([''])
  const [saving,       setSaving]       = useState(false)
  const [saved,        setSaved]        = useState(false)
  const [error,        setError]        = useState(null)
  const [idEdited,     setIdEdited]     = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('adminAuth')) navigate('/admin', { replace: true })
  }, [navigate])

  function setField(field, value) {
    setForm(prev => {
      const next = { ...prev, [field]: value }
      // Auto-generate id slug from name unless coach has manually edited it
      if (field === 'name' && !idEdited) next.id = slugify(value)
      return next
    })
  }

  function addStep(setter)  { setter(prev => [...prev, '']) }
  function removeStep(setter, i) { setter(prev => prev.filter((_, j) => j !== i)) }
  function setStep(setter, i, value) { setter(prev => { const n = [...prev]; n[i] = value; return n }) }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await saveActivity({
        id:            form.id || slugify(form.name),
        name:          form.name,
        type:          form.type,
        skill_cue:     form.skill_cue || null,
        equipment:     form.equipment.split(',').map(s => s.trim()).filter(Boolean),
        images:        form.images.split(',').map(s => s.trim()).filter(Boolean),
        instructions:  instructions.filter(Boolean),
        coaching_note: form.coaching_note || null,
        p1_note:       form.p1_note       || null,
        extension:     extension.filter(Boolean),
        easier:        form.easier || null,
        harder:        form.harder || null,
      })
      setSaved(true)
      setTimeout(() => { setSaved(false); navigate('/admin/home') }, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full bg-white/10 text-white rounded-xl px-3 py-2.5 text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFCC00]"
  const labelClass = "text-[#FFCC00] text-xs font-bold uppercase tracking-wide block mb-1"

  return (
    <div className="min-h-screen bg-[#007A3D] px-4 pt-safe pb-12">
      <div className="flex items-center gap-4 pt-5 pb-6">
        <BackButton to="/admin/home" />
        <h1 className="text-white font-extrabold text-xl">Add Activity</h1>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5">

        {/* Core info */}
        <div className="bg-white/10 rounded-2xl p-4 flex flex-col gap-3">
          <div>
            <label className={labelClass}>Activity Name *</label>
            <input required value={form.name} onChange={e => setField('name', e.target.value)}
              placeholder="e.g. Tag Tails" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Type *</label>
            <select value={form.type} onChange={e => setField('type', e.target.value)}
              className={inputClass}>
              {TYPES.map(t => <option key={t.value} value={t.value} className="bg-[#007A3D]">{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>ID (auto-generated, can edit)</label>
            <input value={form.id} onChange={e => { setIdEdited(true); setField('id', e.target.value) }}
              placeholder="e.g. tag-tails" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Skill Cue</label>
            <input value={form.skill_cue} onChange={e => setField('skill_cue', e.target.value)}
              placeholder='e.g. I can kick (swingy leg action)' className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Equipment (comma-separated)</label>
            <input value={form.equipment} onChange={e => setField('equipment', e.target.value)}
              placeholder="Cones, Football, Markers" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Image filenames (comma-separated)</label>
            <input value={form.images} onChange={e => setField('images', e.target.value)}
              placeholder="tag-tails-diagram.png, tag-tails-image.png" className={inputClass} />
            <p className="text-white/40 text-xs mt-1">Drop image files in public/images/ first</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/10 rounded-2xl p-4 flex flex-col gap-2">
          <h3 className={labelClass}>Instructions *</h3>
          {instructions.map((step, i) => (
            <div key={i} className="flex gap-2">
              <span className="bg-[#FFCC00] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-2.5">
                {i + 1}
              </span>
              <textarea
                value={step}
                onChange={e => setStep(setInstructions, i, e.target.value)}
                placeholder={`Step ${i + 1}…`}
                rows={2}
                className={`${inputClass} flex-1 resize-none`}
              />
              {instructions.length > 1 && (
                <button type="button" onClick={() => removeStep(setInstructions, i)}
                  className="text-white/40 text-lg mt-1 shrink-0">✕</button>
              )}
            </div>
          ))}
          {instructions.length < 6 && (
            <button type="button" onClick={() => addStep(setInstructions)}
              className="text-[#FFCC00] text-xs underline text-left mt-1">
              + Add step
            </button>
          )}
        </div>

        {/* Coaching notes */}
        <div className="bg-white/10 rounded-2xl p-4 flex flex-col gap-3">
          <h3 className={labelClass}>Coaching Notes</h3>
          <div>
            <label className="text-white/60 text-xs block mb-1">Encourage / Demo note</label>
            <textarea value={form.coaching_note} onChange={e => setField('coaching_note', e.target.value)}
              placeholder="Show the rolling action and…" rows={2}
              className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="text-white/60 text-xs block mb-1">P1 Note</label>
            <input value={form.p1_note} onChange={e => setField('p1_note', e.target.value)}
              placeholder="Introduce correct pick-up technique." className={inputClass} />
          </div>
        </div>

        {/* Extension steps */}
        <div className="bg-white/10 rounded-2xl p-4 flex flex-col gap-2">
          <h3 className={labelClass}>Extension / P1 Steps <span className="text-white/40 normal-case font-normal">(optional)</span></h3>
          {extension.map((step, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                value={step}
                onChange={e => setStep(setExtension, i, e.target.value)}
                placeholder={`Step ${i + 1}…`}
                rows={2}
                className={`${inputClass} flex-1 resize-none`}
              />
              {extension.length > 1 && (
                <button type="button" onClick={() => removeStep(setExtension, i)}
                  className="text-white/40 text-lg mt-1 shrink-0">✕</button>
              )}
            </div>
          ))}
          {extension.length < 5 && (
            <button type="button" onClick={() => addStep(setExtension)}
              className="text-[#FFCC00] text-xs underline text-left mt-1">
              + Add step
            </button>
          )}
        </div>

        {/* Easier / Harder (warm-ups) */}
        {form.type === 'warmup' && (
          <div className="bg-white/10 rounded-2xl p-4 flex flex-col gap-3">
            <h3 className={labelClass}>Adaptations</h3>
            <div>
              <label className="text-white/60 text-xs block mb-1">✅ Easier</label>
              <input value={form.easier} onChange={e => setField('easier', e.target.value)}
                placeholder="Use a larger area" className={inputClass} />
            </div>
            <div>
              <label className="text-white/60 text-xs block mb-1">🔥 Harder</label>
              <input value={form.harder} onChange={e => setField('harder', e.target.value)}
                placeholder="Use a smaller area or add a time limit" className={inputClass} />
            </div>
          </div>
        )}

        {error && <p className="text-red-300 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-[#FFCC00] text-black font-extrabold rounded-2xl py-4 text-lg disabled:opacity-50"
        >
          {saved ? '✓ Saved to bank!' : saving ? 'Saving…' : 'Save Activity'}
        </button>
      </form>
    </div>
  )
}
