import { supabase } from './supabase'

// Throws a clear error if Supabase isn't configured (env vars missing on Vercel)
function requireSupabase() {
  if (!supabase) throw new Error('Supabase not configured — add environment variables to Vercel.')
}

// ─── Cache helpers (localStorage, 10-min TTL) ─────────────────────────────────
const TTL = 10 * 60 * 1000

function cacheGet(key) {
  try {
    const raw = localStorage.getItem(`fnd_${key}`)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw)
    return Date.now() - ts < TTL ? data : null
  } catch { return null }
}

function cacheSet(key, data) {
  try { localStorage.setItem(`fnd_${key}`, JSON.stringify({ data, ts: Date.now() })) } catch {}
}

export function cacheClear(key) {
  localStorage.removeItem(`fnd_${key}`)
}

// ─── Shape a DB activities row → app format ────────────────────────────────────
function shapeActivity(row) {
  if (!row) return null
  const imgs = (row.images || []).map(f => {
    const name = /\.[a-z]{2,4}$/i.test(f) ? f : `${f}.png`
    return `/images/${name}`
  })
  return {
    id:          row.id,
    name:        row.name,
    type:        row.type,
    skillCue:    row.skill_cue    || null,
    equipment:   row.equipment    || [],
    image:       imgs[0]          || null,
    images:      imgs.length > 1  ? imgs : null,
    instructions: row.instructions || [],
    encourage:   row.coaching_note || null,
    p1:          row.p1_note       || null,
    extension:   row.extension?.length ? row.extension : null,
    easier:      row.easier        || null,
    harder:      row.harder        || null,
    games:       row.games_data    || null,
  }
}

// ─── Public reads ──────────────────────────────────────────────────────────────

export async function getAllWeeks() {
  requireSupabase()
  const cached = cacheGet('all_weeks')
  if (cached) return cached

  const { data, error } = await supabase
    .from('week_plans')
    .select('week_number, is_active')
  if (error) throw error

  const active = new Set(data.filter(w => w.is_active).map(w => w.week_number))
  const weeks  = Array.from({ length: 24 }, (_, i) => ({
    id:     i + 1,
    title:  `Week ${i + 1}`,
    active: active.has(i + 1),
  }))

  cacheSet('all_weeks', weeks)
  return weeks
}

export async function getWeekData(weekId) {
  requireSupabase()
  const cached = cacheGet(`week_${weekId}`)
  if (cached) return cached

  const [planRes, slotsRes] = await Promise.all([
    supabase.from('week_plans').select('*').eq('week_number', weekId).single(),
    supabase.from('session_slots')
      .select('section, slot_order, activities(*)')
      .eq('week_number', weekId)
      .order('slot_order'),
  ])

  if (planRes.error) throw planRes.error
  if (slotsRes.error) throw slotsRes.error

  const plan  = planRes.data
  const slots = slotsRes.data

  const bySection = {}
  for (const slot of slots) {
    if (!bySection[slot.section]) bySection[slot.section] = []
    bySection[slot.section].push(shapeActivity(slot.activities))
  }

  const weekData = {
    id:       weekId,
    title:    `Week ${weekId}`,
    focus:    plan.focus,
    layout:   { notes: plan.layout_notes || [], image: null },
    warmup:   bySection.warmup    || [],
    throwing: bySection.throwing  || [],
    kicking:  bySection.kicking   || [],
    cooldown: bySection.cooldown?.[0] || null,
  }

  cacheSet(`week_${weekId}`, weekData)
  return weekData
}

export async function getAllActivities(type = null) {
  requireSupabase()
  const cacheKey = type ? `activities_${type}` : 'activities_all'
  const cached   = cacheGet(cacheKey)
  if (cached) return cached

  let q = supabase.from('activities').select('*').order('name')
  if (type) q = q.eq('type', type)
  const { data, error } = await q
  if (error) throw error

  cacheSet(cacheKey, data)
  return data
}

// ─── Admin writes ──────────────────────────────────────────────────────────────

export async function saveActivity(activity) {
  requireSupabase()
  const { data, error } = await supabase
    .from('activities')
    .upsert(activity, { onConflict: 'id' })
    .select()
  if (error) throw error

  // Bust activity caches
  ;['activities_all', 'activities_warmup', 'activities_throwing',
    'activities_kicking', 'activities_cooldown'].forEach(k => cacheClear(k))

  return data[0]
}

export async function saveWeekPlan({ weekNumber, focus, layoutNotes, slots }) {
  requireSupabase()
  const { error: planErr } = await supabase
    .from('week_plans')
    .upsert({ week_number: weekNumber, focus, layout_notes: layoutNotes, is_active: true },
             { onConflict: 'week_number' })
  if (planErr) throw planErr

  // Replace all slots for this week
  const { error: delErr } = await supabase
    .from('session_slots').delete().eq('week_number', weekNumber)
  if (delErr) throw delErr

  const rows = slots.filter(s => s.activity_id).map(s => ({
    week_number:  weekNumber,
    section:      s.section,
    slot_order:   s.slot_order,
    activity_id:  s.activity_id,
  }))

  if (rows.length) {
    const { error: insErr } = await supabase.from('session_slots').insert(rows)
    if (insErr) throw insErr
  }

  cacheClear(`week_${weekNumber}`)
  cacheClear('all_weeks')
}
