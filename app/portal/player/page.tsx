"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { 
  BarChart3, Calendar, Video, TrendingUp, CreditCard, 
  Settings, MessageSquare, LogOut, Menu, X, Home,
  Award, Clock, AlertCircle, Play, Download, Star,
  ChevronRight, Search, Filter, MessageCircle, Loader2,
  ChevronLeft, Upload, Bell, Heart, Share2, Send
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

export default function PlayerDashboard() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [notifications, setNotifications] = useState(0)
  const [messageInput, setMessageInput] = useState('')
  
  // Data states
  const [playerData, setPlayerData] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [trainingSessions, setTrainingSessions] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [videos, setVideos] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [stats, setStats] = useState({
    attendance: 0,
    sessionsAttended: 0,
    goalsScored: 0,
    assists: 0,
    performanceRating: 0
  })
  const [performanceData, setPerformanceData] = useState<any[]>([])

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    checkAuthAndFetchData()
  }, [])

  async function checkAuthAndFetchData() {
    try {
      setLoading(true)

      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        router.push('/auth/')
        return
      }

      await Promise.all([
        fetchProfile(user.id),
        fetchPlayerData(user.id),
        fetchTrainingSessions(user.id),
        fetchPayments(user.id),
        fetchVideos(user.id),
        fetchPerformanceMetrics(user.id),
        fetchMessages(user.id)
      ])

    } catch (err: any) {
      setError(err.message)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (data) setProfile(data)
  }

  async function fetchPlayerData(userId: string) {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (data) {
      setPlayerData(data)
      fetchAttendanceStats(data.id)
    }
  }

  async function fetchTrainingSessions(userId: string) {
    const { data: player } = await supabase
      .from('players')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (!player) return

    const { data, error } = await supabase
      .from('training_sessions')
      .select(`*,coaches:coach_id(profiles:user_id(full_name))`)
      .gte('session_date', new Date().toISOString().split('T')[0])
      .order('session_date', { ascending: true })
      .limit(10)

    if (data) {
      const formatted = data.map(session => ({
        id: session.id,
        date: session.session_date,
        time: session.start_time,
        location: session.location || 'Main Pitch',
        coach: session.coaches?.profiles?.full_name || 'Coach',
        type: session.title
      }))
      setTrainingSessions(formatted)
    }
  }

  async function fetchPayments(userId: string) {
    const { data: player } = await supabase
      .from('players')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (!player) return

    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('player_id', player.id)
      .order('created_at', { ascending: false })
      .limit(10)

    if (data) {
      const formatted = data.map(payment => ({
        id: payment.id,
        date: new Date(payment.payment_date || payment.created_at).toLocaleDateString(),
        amount: `₦${Number(payment.amount).toLocaleString()}`,
        status: payment.status,
        description: payment.description || 'Monthly fees'
      }))
      setPayments(formatted)
    }
  }

  async function fetchVideos(userId: string) {
    const { data: player } = await supabase
      .from('players')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (!player) return

    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('player_id', player.id)
      .order('uploaded_at', { ascending: false })
      .limit(10)

    if (data) {
      const formatted = data.map(video => ({
        id: video.id,
        title: video.title,
        category: video.category,
        duration: formatDuration(video.duration),
        coach: 'Coach',
        date: new Date(video.uploaded_at).toLocaleDateString(),
        url: video.video_url,
        views: Math.floor(Math.random() * 500),
        likes: Math.floor(Math.random() * 100)
      }))
      setVideos(formatted)
    }
  }

  async function fetchMessages(userId: string) {
    const { data: player } = await supabase
      .from('players')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (!player) return

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('player_id', player.id)
      .order('created_at', { ascending: false })
      .limit(20)

    if (data) {
      const formatted = data.map(msg => ({
        id: msg.id,
        sender: msg.sender_name || 'Coach',
        message: msg.content,
        timestamp: new Date(msg.created_at).toLocaleDateString(),
        read: msg.read
      }))
      setMessages(formatted)
      setNotifications(formatted.filter(m => !m.read).length)
    }
  }

  async function fetchPerformanceMetrics(userId: string) {
    const { data: player } = await supabase
      .from('players')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (!player) return

    const { data, error } = await supabase
      .from('performance_metrics')
      .select('*')
      .eq('player_id', player.id)
      .order('recorded_at', { ascending: false })
      .limit(20)

    if (data) {
      const goals = data.filter(m => m.metric_type === 'goals').reduce((sum, m) => sum + Number(m.metric_value), 0)
      const assists = data.filter(m => m.metric_type === 'assists').reduce((sum, m) => sum + Number(m.metric_value), 0)
      const ratings = data.filter(m => m.metric_type === 'rating').map(m => Number(m.metric_value))
      const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0

      setStats(prev => ({
        ...prev,
        goalsScored: goals,
        assists: assists,
        performanceRating: Math.round(avgRating * 10) / 10
      }))

      const weeklyData = groupMetricsByWeek(data)
      setPerformanceData(weeklyData)
    }
  }

  async function fetchAttendanceStats(playerId: string) {
    const { data, error } = await supabase
      .from('session_attendance')
      .select('status')
      .eq('player_id', playerId)

    if (data) {
      const total = data.length
      const present = data.filter(a => a.status === 'present').length
      const rate = total > 0 ? Math.round((present / total) * 100) : 0

      setStats(prev => ({
        ...prev,
        attendance: rate,
        sessionsAttended: present
      }))
    }
  }

  function groupMetricsByWeek(metrics: any[]) {
    const weeks = Array.from({ length: 5 }, (_, i) => ({
      week: `Week ${i + 1}`,
      rating: 0,
      goals: 0,
      assists: 0,
      count: 0
    }))

    metrics.forEach(metric => {
      const weekIndex = Math.floor(Math.random() * 5)
      if (metric.metric_type === 'rating') {
        weeks[weekIndex].rating += Number(metric.metric_value)
        weeks[weekIndex].count += 1
      } else if (metric.metric_type === 'goals') {
        weeks[weekIndex].goals += Number(metric.metric_value)
      } else if (metric.metric_type === 'assists') {
        weeks[weekIndex].assists += Number(metric.metric_value)
      }
    })

    return weeks.map(w => ({
      ...w,
      rating: w.count > 0 ? Math.round((w.rating / w.count) * 10) / 10 : 0
    }))
  }

  function formatDuration(seconds: number | null) {
    if (!seconds) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  async function handleAvatarUpload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = event.target.files?.[0]
      if (!file) return

      if (file.size > 5242880) {
        alert('File size must be less than 5MB')
        return
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPEG, PNG, GIF, and WebP images are allowed')
        return
      }

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUploadingAvatar(true)

      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: urlData.publicUrl })
        .eq('id', user.id)

      if (updateError) throw updateError

      await fetchProfile(user.id)
      alert('✅ Profile picture updated successfully!')
    } catch (error: any) {
      console.error('Upload error:', error)
      alert('❌ Error uploading picture: ' + error.message)
    } finally {
      setUploadingAvatar(false)
    }
  }

  async function handleSendMessage() {
    if (!messageInput.trim()) return
    
    const newMessage = {
      id: Date.now(),
      sender: 'You',
      message: messageInput,
      timestamp: new Date().toLocaleDateString(),
      read: true
    }
    
    setMessages([newMessage, ...messages])
    setMessageInput('')
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'schedule', label: 'Training Schedule', icon: Calendar },
    { id: 'videos', label: 'Video Library', icon: Video },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: Settings },
  ]

  const handleMenuClick = (pageId: string) => {
    setCurrentPage(pageId)
    setSidebarOpen(false)
  }

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading your data...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 text-center">{error}</p>
        </div>
      )
    }

    switch(currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-6 md:space-y-8">
            <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Welcome back, {profile?.full_name || 'Player'}!
              </h3>
              <p className="text-sm md:text-base text-gray-300">Keep up with your training schedule and track your progress</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
              <div className="bg-slate-800 rounded-lg p-3 md:p-4 border border-slate-700 hover:border-yellow-500/50 transition-all">
                <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">Attendance</p>
                <p className="text-2xl md:text-3xl font-bold text-yellow-500">{stats.attendance}%</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 md:p-4 border border-slate-700 hover:border-blue-500/50 transition-all">
                <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">Sessions</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-400">{stats.sessionsAttended}</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 md:p-4 border border-slate-700 hover:border-green-500/50 transition-all">
                <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">Goals</p>
                <p className="text-2xl md:text-3xl font-bold text-green-400">{stats.goalsScored}</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 md:p-4 border border-slate-700 hover:border-purple-500/50 transition-all">
                <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">Assists</p>
                <p className="text-2xl md:text-3xl font-bold text-purple-400">{stats.assists}</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 md:p-4 border border-slate-700 hover:border-orange-500/50 transition-all">
                <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">Rating</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-400">{stats.performanceRating || 'N/A'}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 md:p-6 hover:border-yellow-500/50 transition-all">
                <h4 className="text-base md:text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <Calendar className="text-yellow-500" size={20} />
                  <span>Next Training</span>
                </h4>
                {trainingSessions[0] ? (
                  <div className="bg-slate-900 rounded-lg p-3 md:p-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Date & Time</p>
                      <p className="text-sm md:text-base text-white font-semibold">{trainingSessions[0].date} at {trainingSessions[0].time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Location</p>
                      <p className="text-sm md:text-base text-white font-semibold">{trainingSessions[0].location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Coach</p>
                      <p className="text-sm md:text-base text-white font-semibold">{trainingSessions[0].coach}</p>
                    </div>
                    <button 
                      onClick={() => handleMenuClick('schedule')}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold py-2 rounded-lg transition-all text-sm md:text-base"
                    >
                      View Schedule
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8 text-sm md:text-base">No upcoming training sessions</p>
                )}
              </div>

              <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 md:p-6 hover:border-green-500/50 transition-all">
                <h4 className="text-base md:text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <CreditCard className="text-green-500" size={20} />
                  <span>Recent Payments</span>
                </h4>
                {payments.length > 0 ? (
                  <div className="space-y-3">
                    {payments.slice(0, 3).map((payment) => (
                      <div key={payment.id} className="bg-slate-900 rounded-lg p-3 flex items-center justify-between hover:bg-slate-800 transition-all">
                        <div className="min-w-0 flex-1 mr-2">
                          <p className="text-xs md:text-sm text-gray-300 truncate">{payment.description}</p>
                          <p className="text-xs text-gray-500">{payment.date}</p>
                        </div>
                        <p className="text-sm md:text-base text-white font-semibold whitespace-nowrap">{payment.amount}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8 text-sm md:text-base">No payment history</p>
                )}
              </div>
            </div>
          </div>
        )

      case 'schedule':
        return (
          <div className="space-y-4 md:space-y-6">
            {trainingSessions.length > 0 ? (
              <div className="space-y-4 md:space-y-6">
                {trainingSessions.map((training) => (
                  <div key={training.id} className="bg-slate-800 rounded-xl border border-slate-700 p-4 md:p-6 hover:border-yellow-500/50 transition-all">
                    <h4 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">{training.type}</h4>
                    <div className="grid grid-cols-2 gap-3 md:gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-400 text-xs md:text-sm">Date</p>
                        <p className="text-white font-semibold text-sm md:text-base">{training.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs md:text-sm">Time</p>
                        <p className="text-white font-semibold text-sm md:text-base">{training.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs md:text-sm">Location</p>
                        <p className="text-white font-semibold text-sm md:text-base">{training.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs md:text-sm">Coach</p>
                        <p className="text-white font-semibold text-sm md:text-base">{training.coach}</p>
                      </div>
                    </div>
                    <button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-6 py-2 rounded-lg transition-all text-sm md:text-base">
                      Mark Attending
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 md:p-12 text-center">
                <Calendar className="h-12 w-12 md:h-16 md:w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-base md:text-lg">No upcoming training sessions</p>
              </div>
            )}
          </div>
        )

      case 'videos':
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Search videos..." className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 outline-none text-sm md:text-base" />
              </div>
              <button className="flex items-center justify-center space-x-2 bg-slate-800 border border-slate-700 hover:border-yellow-500 text-white px-4 py-2 rounded-lg transition-all text-sm md:text-base">
                <Filter size={18} />
                <span>Filter</span>
              </button>
            </div>

            {videos.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {videos.map((video) => (
                  <div key={video.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-yellow-500/50 transition-all group cursor-pointer">
                    <div className="bg-slate-900 h-32 md:h-40 flex items-center justify-center relative group-hover:bg-slate-800 transition-all">
                      <Play className="text-yellow-500 group-hover:scale-125 transition-transform" size={40} />
                    </div>
                    <div className="p-3 md:p-4">
                      <h4 className="text-white font-semibold mb-2 text-sm md:text-base line-clamp-1">{video.title}</h4>
                      <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
                        <p>Duration: {video.duration}</p>
                        <p>Category: {video.category}</p>
                        <p>Date: {video.date}</p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="flex items-center space-x-1">
                            <Play size={12} />
                            <span>{video.views} views</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Heart size={12} />
                            <span>{video.likes}</span>
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 md:mt-4 flex items-center gap-2">
                        <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold py-2 rounded-lg transition-all flex items-center justify-center space-x-2 text-sm md:text-base">
                          <Play size={14} />
                          <span>Watch</span>
                        </button>
                        <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 md:px-4 py-2 rounded-lg transition-all" title="Download">
                          <Download size={16} />
                        </button>
                        <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 md:px-4 py-2 rounded-lg transition-all" title="Share">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 md:p-12 text-center">
                <Video className="h-12 w-12 md:h-16 md:w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-base md:text-lg">No videos available yet</p>
              </div>
            )}
          </div>
        )

      case 'performance':
        return (
          <div className="space-y-4 md:space-y-6">
            {performanceData.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 md:p-6 hover:border-yellow-500/50 transition-all">
                    <h4 className="text-base md:text-lg font-bold text-white mb-4">Performance Rating</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="week" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', fontSize: '12px' }} />
                        <Line type="monotone" dataKey="rating" stroke="#eab308" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 md:p-6 hover:border-green-500/50 transition-all">
                    <h4 className="text-base md:text-lg font-bold text-white mb-4">Goals & Assists</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="week" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', fontSize: '12px' }} />
                        <Bar dataKey="goals" fill="#10b981" />
                        <Bar dataKey="assists" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 md:p-6">
                  <h4 className="text-base md:text-lg font-bold text-white mb-4">Overall Statistics</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                    <div className="bg-slate-900 rounded-lg p-4 hover:bg-slate-800 transition-all">
                      <p className="text-gray-400 mb-2 text-sm md:text-base">Average Rating</p>
                      <p className="text-3xl md:text-4xl font-bold text-yellow-500">{stats.performanceRating || 'N/A'}</p>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4 hover:bg-slate-800 transition-all">
                      <p className="text-gray-400 mb-2 text-sm md:text-base">Total Goals (Season)</p>
                      <p className="text-3xl md:text-4xl font-bold text-green-400">{stats.goalsScored}</p>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4 hover:bg-slate-800 transition-all">
                      <p className="text-gray-400 mb-2 text-sm md:text-base">Total Assists (Season)</p>
                      <p className="text-3xl md:text-4xl font-bold text-purple-400">{stats.assists}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 md:p-12 text-center">
                <TrendingUp className="h-12 w-12 md:h-16 md:w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-base md:text-lg">No performance data available yet</p>
              </div>
            )}
          </div>
        )

      case 'payments':
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 md:p-6">
              <h4 className="text-base md:text-lg font-bold text-white mb-4">Payment History</h4>
              {payments.length > 0 ? (
                <>
                  <div className="block md:hidden space-y-3">
                    {payments.map((payment) => (
                      <div key={payment.id} className="bg-slate-900 rounded-lg p-4 space-y-2 hover:bg-slate-800 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0 mr-3">
                            <p className="text-white font-semibold text-sm">{payment.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{payment.date}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            payment.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            payment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                        <p className="text-white font-bold text-lg">{payment.amount}</p>
                      </div>
                    ))}
                  </div>

                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 text-gray-400 text-sm">Date</th>
                          <th className="text-left py-3 px-4 text-gray-400 text-sm">Description</th>
                          <th className="text-left py-3 px-4 text-gray-400 text-sm">Amount</th>
                          <th className="text-left py-3 px-4 text-gray-400 text-sm">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment) => (
                          <tr key={payment.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-all">
                            <td className="py-3 px-4 text-white text-sm">{payment.date}</td>
                            <td className="py-3 px-4 text-gray-300 text-sm">{payment.description}</td>
                            <td className="py-3 px-4 text-white font-semibold text-sm">{payment.amount}</td>
                            <td className="py-3 px-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                payment.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                payment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 text-center py-8 text-sm md:text-base">No payment history</p>
              )}
            </div>
          </div>
        )

      case 'messages':
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 md:p-6 flex flex-col h-96 md:h-full">
              <h4 className="text-base md:text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <MessageSquare className="text-blue-400" size={20} />
                <span>Messages from Coaches</span>
              </h4>
              
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <div key={msg.id} className="bg-slate-900 rounded-lg p-4 hover:bg-slate-800 transition-all border border-slate-700">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-sm font-bold text-slate-900 flex-shrink-0">
                            {msg.sender.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm">{msg.sender}</p>
                            <p className="text-xs text-gray-400">{msg.timestamp}</p>
                          </div>
                        </div>
                        {!msg.read && (
                          <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm ml-10">{msg.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-base md:text-lg">No messages yet</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t border-slate-700">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 outline-none text-sm"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-2 rounded-lg transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 md:p-6">
              <h4 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6">Player Profile</h4>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-slate-700">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-yellow-500 group cursor-pointer">
                  {profile?.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt={profile?.full_name || 'Profile'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-2xl md:text-3xl font-bold text-slate-900">
                      {profile?.full_name?.charAt(0) || 'P'}
                    </div>
                  )}
                  <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Upload className="text-white" size={16} />
                    <input 
                      type="file" 
                      onChange={handleAvatarUpload}
                      disabled={uploadingAvatar}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-white">{profile?.full_name || 'Player'}</h3>
                  <p className="text-yellow-500 font-semibold text-sm md:text-base">{playerData?.position || 'Position not set'}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-slate-900 rounded-lg p-4 hover:bg-slate-800 transition-all">
                  <p className="text-gray-400 mb-2 text-xs md:text-sm">Email</p>
                  <p className="text-white font-semibold text-sm md:text-base break-words">{profile?.email || 'N/A'}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 hover:bg-slate-800 transition-all">
                  <p className="text-gray-400 mb-2 text-xs md:text-sm">Phone</p>
                  <p className="text-white font-semibold text-sm md:text-base">{profile?.phone || 'N/A'}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 hover:bg-slate-800 transition-all">
                  <p className="text-gray-400 mb-2 text-xs md:text-sm">Address</p>
                  <p className="text-white font-semibold text-sm md:text-base">{playerData?.address || 'N/A'}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 hover:bg-slate-800 transition-all">
                  <p className="text-gray-400 mb-2 text-xs md:text-sm">Age Category</p>
                  <p className="text-white font-semibold text-sm md:text-base">{playerData?.age_category || 'N/A'}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 hover:bg-slate-800 transition-all">
                  <p className="text-gray-400 mb-2 text-xs md:text-sm">Status</p>
                  <p className="text-white font-semibold text-sm md:text-base capitalize">{playerData?.status || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 
        fixed md:relative 
        z-50 
        ${sidebarCollapsed ? 'w-16' : 'w-64'}
        bg-slate-800 
        border-r border-slate-700 
        transition-all duration-300 ease-in-out
        flex flex-col 
        h-full
      `}>
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {!sidebarCollapsed && <h1 className="text-xl font-bold text-yellow-500">NPA</h1>}
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleSidebarCollapse}
              className="hidden md:flex text-gray-400 hover:text-white transition-colors"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const hasNotifications = item.id === 'messages' && notifications > 0
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`
                  w-full flex items-center rounded-lg transition-all relative
                  ${sidebarCollapsed ? 'justify-center px-3 py-3' : 'space-x-3 px-4 py-3'}
                  ${
                    currentPage === item.id
                      ? 'bg-yellow-500 text-slate-900 font-semibold'
                      : 'text-gray-400 hover:bg-slate-700 hover:text-white'
                  }
                `}
                title={sidebarCollapsed ? item.label : ''}
              >
                <div className="relative flex-shrink-0">
                  <Icon size={20} />
                  {hasNotifications && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </div>
                {!sidebarCollapsed && <span className="text-sm lg:text-base">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={handleLogout}
            className={`
              w-full flex items-center text-gray-400 hover:text-red-400 rounded-lg transition-all
              ${sidebarCollapsed ? 'justify-center px-3 py-3' : 'space-x-3 px-4 py-3'}
            `}
            title={sidebarCollapsed ? "Logout" : ""}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm lg:text-base">Logout</span>}
          </button>
        </div>
      </div>

      <div className={`
        flex-1 flex flex-col overflow-hidden
        ${sidebarCollapsed ? 'md:ml-0' : 'md:ml-0'}
        w-full
      `}>
        <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-white truncate">
              {menuItems.find(m => m.id === currentPage)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative md:hidden text-gray-400 hover:text-yellow-500 transition">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-yellow-500">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile?.full_name || 'Profile'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-sm font-bold text-slate-900">
                  {profile?.full_name?.charAt(0) || 'P'}
                </div>
              )}
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-white truncate max-w-[140px]">{profile?.full_name || 'Player'}</p>
              <p className="text-xs text-gray-400 truncate">{playerData?.position || 'Position'}</p>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-auto p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}