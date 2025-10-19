import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

interface PlayerData {
  profile: any
  player: any
  trainingSessions: any[]
  payments: any[]
  videos: any[]
  performanceMetrics: any[]
  stats: {
    attendance: number
    sessionsAttended: number
    goalsScored: number
    assists: number
    performanceRating: number
  }
}

export function usePlayerData() {
  const [data, setData] = useState<PlayerData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchPlayerData()
  }, [])

  async function fetchPlayerData() {
    try {
      setLoading(true)

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) throw new Error('Not authenticated')

      // Get profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) throw profileError

      // Get player data
      const { data: player, error: playerError } = await supabase
        .from('players')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (playerError) throw playerError

      // Get training sessions
      const { data: sessions, error: sessionsError } = await supabase
        .from('training_sessions')
        .select(`
          *,
          coaches:coach_id (
            id,
            profiles:user_id (full_name)
          )
        `)
        .gte('session_date', new Date().toISOString().split('T')[0])
        .order('session_date', { ascending: true })
        .limit(10)

      // Get payments
      const { data: payments, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('player_id', player.id)
        .order('created_at', { ascending: false })
        .limit(10)

      // Get videos
      const { data: videos, error: videosError } = await supabase
        .from('videos')
        .select('*')
        .eq('player_id', player.id)
        .order('uploaded_at', { ascending: false })
        .limit(10)

      // Get performance metrics
      const { data: metrics, error: metricsError } = await supabase
        .from('performance_metrics')
        .select('*')
        .eq('player_id', player.id)
        .order('recorded_at', { ascending: false })
        .limit(20)

      // Get attendance stats
      const { data: attendance, error: attendanceError } = await supabase
        .from('session_attendance')
        .select('status')
        .eq('player_id', player.id)

      // Calculate stats
      const totalSessions = attendance?.length || 0
      const presentCount = attendance?.filter(a => a.status === 'present').length || 0
      const attendanceRate = totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 0

      const goalsScored = metrics?.filter(m => m.metric_type === 'goals').reduce((sum, m) => sum + Number(m.metric_value), 0) || 0
      const assists = metrics?.filter(m => m.metric_type === 'assists').reduce((sum, m) => sum + Number(m.metric_value), 0) || 0
      const ratings = metrics?.filter(m => m.metric_type === 'rating').map(m => Number(m.metric_value)) || []
      const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0

      setData({
        profile,
        player,
        trainingSessions: sessions || [],
        payments: payments || [],
        videos: videos || [],
        performanceMetrics: metrics || [],
        stats: {
          attendance: attendanceRate,
          sessionsAttended: presentCount,
          goalsScored,
          assists,
          performanceRating: Math.round(avgRating * 10) / 10
        }
      })
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching player data:', err)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch: fetchPlayerData }
}