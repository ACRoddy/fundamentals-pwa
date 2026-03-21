import { useState, useEffect } from 'react'
import { getWeekData } from '../lib/api'
import { week1 } from '../data/week1'

export function useWeekData(weekId) {
  const [weekData, setWeekData] = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getWeekData(parseInt(weekId, 10))
      .then(data => {
        if (!cancelled) { setWeekData(data); setLoading(false) }
      })
      .catch(err => {
        if (!cancelled) {
          console.warn('Supabase unavailable, using local fallback:', err.message)
          setWeekData(parseInt(weekId, 10) === 1 ? week1 : null)
          setError(parseInt(weekId, 10) !== 1 ? err : null)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [weekId])

  return { weekData, loading, error }
}
