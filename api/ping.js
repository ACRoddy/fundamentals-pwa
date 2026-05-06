// Vercel Cron Function — runs daily to keep Supabase from pausing on the free tier.
// Configured in vercel.json: "crons": [{ "path": "/api/ping", "schedule": "0 8 * * *" }]

export default async function handler(req, res) {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY

  if (!url || !key) {
    return res.status(500).json({ error: 'Supabase env vars not configured' })
  }

  const response = await fetch(
    `${url}/rest/v1/week_plans?select=week_number&limit=1`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    }
  )

  if (!response.ok) {
    return res.status(500).json({ error: 'Supabase ping failed', status: response.status })
  }

  res.status(200).json({ ok: true, pingedAt: new Date().toISOString() })
}
