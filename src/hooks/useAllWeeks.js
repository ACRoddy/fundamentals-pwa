import { useState, useEffect } from 'react'
import { getAllWeeks } from '../lib/api'
import { allWeeks } from '../data/week1'

export function useAllWeeks() {
  const [weeks,   setWeeks]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllWeeks()
      .then(data => { setWeeks(data); setLoading(false) })
      .catch(() => { setWeeks(allWeeks); setLoading(false) })
  }, [])

  return { weeks, loading }
}
