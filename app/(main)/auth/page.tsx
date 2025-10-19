"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { 
  Eye, EyeOff, Mail, Lock, AlertCircle, ArrowRight, CheckCircle
} from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const formRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError(null)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (signInError) throw signInError

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profileError) throw profileError

      if (profile.role !== 'player') {
        await supabase.auth.signOut()
        throw new Error('Access denied. This portal is for players only.')
      }

      router.push('/portal/player')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const switchMode = (newMode: 'login' | 'signup') => {
    setMode(newMode)
    setError(null)
    setFormData({ email: '', password: '' })
    // Scroll to form content on mobile
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const goToSignup = () => {
    router.push('/auth/signup')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Left Side - Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900/50 backdrop-blur-xl p-12 pt-27 items-center justify-center relative overflow-hidden border-r border-slate-700/50">
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <img 
            src="/NPA.jpg" 
            alt="Nextpro Africa FA" 
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex flex-col lg:items-center lg:justify-center relative">
        {/* Mobile Logo */}
     {/* Mobile Logo */}
<div className="lg:hidden w-full h-48 mb-20">
          <img 
            src="/NPA.jpg" 
            alt="Nextpro Africa FA" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full max-w-md px-8 lg:p-12 relative z-10">
          {/* Mode Tabs */}
          <div className="flex gap-1 p-1 bg-slate-700/50 backdrop-blur-sm rounded-lg mb-8 border border-slate-600/50">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => switchMode('signup')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-400">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)} 
                className="text-gray-400 hover:text-white text-lg leading-none"
              >
                ×
              </button>
            </div>
          )}

          {mode === 'login' ? (
            /* LOGIN FORM */
            <div ref={formRef}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
                <p className="text-gray-400">Enter your credentials to access your account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="w-full pl-11 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => router.push('/reset-password')}
                      className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="w-full pl-11 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <p className="text-sm text-gray-400 text-center">
                  Need assistance?{' '}
                  <a 
                    href="mailto:Nextproafrica2025@gmail.com" 
                    className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium"
                  >
                    Contact support
                  </a>
                </p>
              </div>
            </div>
          ) : (
            /* SIGNUP CTA */
            <div ref={formRef}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Create your account</h2>
                <p className="text-gray-400">Complete the registration process to get started</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 mb-6">
                <h4 className="text-white font-semibold mb-4">What you'll get:</h4>
                <ul className="space-y-3">
                  {[
                    'Personalized training schedules',
                    'Performance tracking & analytics',
                    'Access to training resources',
                    'Direct communication with coaches',
                    'Team updates and announcements'
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={goToSignup}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Begin registration</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <p className="mt-6 text-sm text-gray-500 text-center">
                Registration typically takes 5-7 minutes to complete
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}