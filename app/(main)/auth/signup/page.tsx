"use client"

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { 
  User, Mail, Lock, Phone, Calendar, MapPin, Heart, Shield, 
  Upload, Eye, EyeOff, CheckCircle, AlertCircle, ChevronRight, 
  ChevronLeft, UserPlus, FileText, Users, Activity, Award, PenTool
} from 'lucide-react'
import Link from 'next/link'

interface FormData {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  dateOfBirth: string
  ageCategory: string
  gender: string
  phone: string
  address: string
  emergencyContact: string
  emergencyRelation: string
  emergencyPhone: string
  hasMedicalCondition: string
  medicalConditionDetails: string
  hasPreviousInjuries: string
  injuryDetails: string
  hasAllergies: string
  allergyDetails: string
  medicalWaiverAgreed: boolean
  isSponsored: string
  sponsorName: string
  sponsorContact: string
  sponsorRelationship: string
  sponsorSupport: string
  conductAgreed: boolean
  attendanceAgreed: boolean
  disciplineAgreed: boolean
  healthSafetyAgreed: boolean
  representationAgreed: boolean
  mediaConsentAgreed: boolean
  parentGuardianName: string
  finalAgreement: boolean
  signatureData: string
}

export default function SignupPage() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dateOfBirth: '',
    ageCategory: '',
    gender: '',
    phone: '',
    address: '',
    emergencyContact: '',
    emergencyRelation: '',
    emergencyPhone: '',
    hasMedicalCondition: '',
    medicalConditionDetails: '',
    hasPreviousInjuries: '',
    injuryDetails: '',
    hasAllergies: '',
    allergyDetails: '',
    medicalWaiverAgreed: false,
    isSponsored: '',
    sponsorName: '',
    sponsorContact: '',
    sponsorRelationship: '',
    sponsorSupport: '',
    conductAgreed: false,
    attendanceAgreed: false,
    disciplineAgreed: false,
    healthSafetyAgreed: false,
    representationAgreed: false,
    mediaConsentAgreed: false,
    parentGuardianName: '',
    finalAgreement: false,
    signatureData: ''
  })

  const ageCategories = ['Under 12', 'Under 15', 'Under 18', 'Over 18', 'Over 40']
  const genders = ['Male', 'Female']
  const relations = ['Parent', 'Guardian', 'Sibling', 'Spouse', 'Friend', 'Other']
  const yesNoOptions = ['Yes', 'No']
  const sponsorSupportOptions = ['Yes', 'No', 'Maybe']

  // Initialize canvas background
  useEffect(() => {
    if (currentStep === 7) {
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = '#0f172a'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
      }
    }
  }, [currentStep])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData({ ...formData, [name]: checked })
    } else {
      setFormData({ ...formData, [name]: value })
    }
    
    setError(null)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB')
        return
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file')
        return
      }
      
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setError(null)
    }
  }

  // Signature pad functions
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      }
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      }
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return

    setIsDrawing(true)
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { x, y } = getCoordinates(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { x, y } = getCoordinates(e)
    ctx.lineTo(x, y)
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (isDrawing && canvasRef.current) {
      const signatureData = canvasRef.current.toDataURL('image/png')
      setFormData({ ...formData, signatureData })
    }
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setFormData({ ...formData, signatureData: '' })
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.email || !formData.password || !formData.confirmPassword) {
          setError('Please fill in all required fields')
          return false
        }
        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters long')
          return false
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
          setError('Please enter a valid email address')
          return false
        }
        break
        
      case 2:
        if (!formData.fullName || !formData.dateOfBirth || !formData.ageCategory || !formData.gender || !formData.phone || !formData.address) {
          setError('Please fill in all required fields')
          return false
        }
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
          setError('Please enter a valid phone number')
          return false
        }
        break
        
      case 3:
        if (!formData.emergencyContact || !formData.emergencyPhone || !formData.emergencyRelation) {
          setError('Please fill in all emergency contact fields')
          return false
        }
        break
        
      case 4:
        if (!formData.hasMedicalCondition || !formData.hasPreviousInjuries || !formData.hasAllergies) {
          setError('Please answer all medical questions')
          return false
        }
        if (formData.hasMedicalCondition === 'Yes' && !formData.medicalConditionDetails.trim()) {
          setError('Please specify your medical condition')
          return false
        }
        if (formData.hasPreviousInjuries === 'Yes' && !formData.injuryDetails.trim()) {
          setError('Please specify your previous injuries')
          return false
        }
        if (formData.hasAllergies === 'Yes' && !formData.allergyDetails.trim()) {
          setError('Please specify your allergies')
          return false
        }
        if (!formData.medicalWaiverAgreed) {
          setError('You must agree to the medical waiver')
          return false
        }
        break

      case 5:
        if (!formData.isSponsored) {
          setError('Please indicate if you are sponsored')
          return false
        }
        if (formData.isSponsored === 'Yes') {
          if (!formData.sponsorName.trim() || !formData.sponsorContact.trim()) {
            setError('Please provide sponsor name and contact information')
            return false
          }
        }
        break

      case 6:
        if (!formData.conductAgreed || !formData.attendanceAgreed || !formData.disciplineAgreed || 
            !formData.healthSafetyAgreed || !formData.representationAgreed || !formData.mediaConsentAgreed) {
          setError('You must agree to all rules and regulations')
          return false
        }
        break
        
      case 7:
        const birthYear = new Date(formData.dateOfBirth).getFullYear()
        const currentYear = new Date().getFullYear()
        const age = currentYear - birthYear
        if (age < 18 && !formData.parentGuardianName.trim()) {
          setError('Parent/Guardian name is required for players under 18')
          return false
        }
        if (!formData.signatureData) {
          setError('Please provide your signature')
          return false
        }
        if (!formData.finalAgreement) {
          setError('You must confirm that you have read and agreed to all terms')
          return false
        }
        break
    }
    
    return true
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
      setError(null)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const uploadAvatar = async (userId: string): Promise<string | null> => {
    if (!avatarFile) return null

    try {
      const fileExt = avatarFile.name.split('.').pop()
      const fileName = `${userId}.${fileExt}`
      const filePath = `${userId}/${fileName}`

      console.log('Uploading to path:', filePath)
      console.log('File size:', avatarFile.size, 'bytes')
      console.log('File type:', avatarFile.type)

      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        console.error('Avatar upload error:', uploadError)
        console.error('Error details:', {
          message: uploadError.message,
          statusCode: uploadError.statusCode,
          error: uploadError
        })
        return null
      }

      console.log('Upload successful, data:', data)

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      console.log('Public URL:', publicUrl)
      return publicUrl
    } catch (err) {
      console.error('Avatar upload exception:', err)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep(7)) return
    
    setIsLoading(true)
    setError(null)

    try {
      console.log('Step 1: Creating auth user...')
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          }
        }
      })

      if (signUpError) {
        console.error('Auth signup error:', signUpError)
        throw signUpError
      }
      if (!authData.user) {
        console.error('No user data returned')
        throw new Error('User creation failed')
      }
      
      if (authData.session === null && authData.user.identities?.length === 0) {
        throw new Error('This email is already registered. Please sign in instead.')
      }
      
      console.log('Auth user created:', authData.user.id)

      let avatarUrl = null
      if (avatarFile) {
        console.log('Step 2: Uploading avatar...')
        avatarUrl = await uploadAvatar(authData.user.id)
        if (avatarUrl) {
          console.log('Avatar uploaded successfully:', avatarUrl)
        } else {
          console.warn('Avatar upload failed, continuing without avatar')
        }
      }

      console.log('Step 3: Creating profile...')
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: formData.email,
          full_name: formData.fullName,
          phone: formData.phone,
          role: 'player',
          avatar_url: avatarUrl,
          date_of_birth: formData.dateOfBirth
        })
        .select()

      if (profileError) {
        console.error('Profile creation error:', profileError)
        throw new Error(`Profile creation failed: ${profileError.message}`)
      }
      console.log('Profile created successfully:', profileData)

      console.log('Step 4: Creating player record...')
      
      // Prepare medical info
      let medicalInfo = []
      if (formData.hasMedicalCondition === 'Yes' && formData.medicalConditionDetails) {
        medicalInfo.push(`Medical Condition: ${formData.medicalConditionDetails}`)
      }
      if (formData.hasPreviousInjuries === 'Yes' && formData.injuryDetails) {
        medicalInfo.push(`Previous Injuries: ${formData.injuryDetails}`)
      }
      if (formData.hasAllergies === 'Yes' && formData.allergyDetails) {
        medicalInfo.push(`Allergies: ${formData.allergyDetails}`)
      }
      const medicalInfoString = medicalInfo.length > 0 ? medicalInfo.join(' | ') : 'None provided'

      // Prepare emergency contact
      const emergencyContactString = `${formData.emergencyContact} (${formData.emergencyRelation}) - ${formData.emergencyPhone}`

      // Prepare sponsorship info
      let sponsorInfo = null
      if (formData.isSponsored === 'Yes') {
        sponsorInfo = {
          name: formData.sponsorName,
          contact: formData.sponsorContact,
          relationship: formData.sponsorRelationship || 'Not specified',
          support: formData.sponsorSupport || 'Not specified'
        }
      }

      const { error: playerError } = await supabase
        .from('players')
        .insert({
          user_id: authData.user.id,
          position: 'Not Specified',
          emergency_contact: emergencyContactString,
          medical_info: medicalInfoString,
          status: 'active',
          age_category: formData.ageCategory,
          gender: formData.gender,
          address: formData.address,
          sponsor_info: sponsorInfo,
          parent_guardian: formData.parentGuardianName || null,
          signature: formData.signatureData,
          agreement_date: new Date().toISOString()
        })

      if (playerError) {
        console.error('Player record error:', playerError)
        throw new Error(`Player record creation failed: ${playerError.message}`)
      }
      console.log('Player record created successfully')

      console.log('Registration complete! Redirecting...')
      router.push('/auth/signup-success')
      
    } catch (err: any) {
      console.error('Signup error:', err)
      
      let errorMessage = err?.message || 'Failed to create account. Please try again.'
      
      if (err?.code === 'over_email_send_rate_limit') {
        errorMessage = 'Too many signup attempts. Please wait a minute and try again.'
      } else if (err?.code === '23505') {
        errorMessage = 'This email is already registered. Please sign in instead.'
      } else if (err?.message?.includes('already registered')) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const getPlayerAge = (): number => {
    if (!formData.dateOfBirth) return 18
    const birthYear = new Date(formData.dateOfBirth).getFullYear()
    const currentYear = new Date().getFullYear()
    return currentYear - birthYear
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Create Your Account</h3>
              <p className="text-gray-400">Start by setting up your login credentials</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  placeholder="player@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  placeholder="Minimum 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Section 1 – Basic Information</h3>
              <p className="text-gray-400">Tell us about yourself</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Profile Photo
              </label>
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-600">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <div>
                  <label className="cursor-pointer inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
                    <Upload className="h-4 w-4" />
                    <span className="text-sm font-medium">Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-400 mt-2">JPG, PNG or GIF (Max 5MB)</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Full Name (Player) <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Date of Birth <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Age Category <span className="text-red-400">*</span>
                </label>
                <select
                  name="ageCategory"
                  value={formData.ageCategory}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                >
                  <option value="">Select age category</option>
                  {ageCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Gender <span className="text-red-400">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                >
                  <option value="">Select gender</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Contact Number <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Residential Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all resize-none"
                  placeholder="Your residential address"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Section 2 – Emergency Contact</h3>
              <p className="text-gray-400">Who should we contact in case of emergency?</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Emergency Contact Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  placeholder="Emergency contact person"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Relationship <span className="text-red-400">*</span>
              </label>
              <select
                name="emergencyRelation"
                value={formData.emergencyRelation}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
              >
                <option value="">Select relationship</option>
                {relations.map((rel) => (
                  <option key={rel} value={rel}>{rel}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Emergency Phone Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Section 3 – Medical & Injury Waiver</h3>
              <p className="text-gray-400">Help us keep you safe on the field</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Do you have any pre-existing medical condition? <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-4">
                {yesNoOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasMedicalCondition"
                      value={option}
                      checked={formData.hasMedicalCondition === option}
                      onChange={handleChange}
                      className="w-4 h-4 text-yellow-500 bg-slate-700 border-slate-500 focus:ring-yellow-500"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.hasMedicalCondition === 'Yes' && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Please specify <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="medicalConditionDetails"
                  value={formData.medicalConditionDetails}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all resize-none"
                  placeholder="Describe your medical condition..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Do you have any previous injuries? <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-4">
                {yesNoOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasPreviousInjuries"
                      value={option}
                      checked={formData.hasPreviousInjuries === option}
                      onChange={handleChange}
                      className="w-4 h-4 text-yellow-500 bg-slate-700 border-slate-500 focus:ring-yellow-500"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.hasPreviousInjuries === 'Yes' && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Please specify <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="injuryDetails"
                  value={formData.injuryDetails}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all resize-none"
                  placeholder="Describe your previous injuries..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Do you have allergies? <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-4">
                {yesNoOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasAllergies"
                      value={option}
                      checked={formData.hasAllergies === option}
                      onChange={handleChange}
                      className="w-4 h-4 text-yellow-500 bg-slate-700 border-slate-500 focus:ring-yellow-500"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.hasAllergies === 'Yes' && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Please specify <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="allergyDetails"
                  value={formData.allergyDetails}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all resize-none"
                  placeholder="Describe your allergies..."
                />
              </div>
            )}

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="medicalWaiverAgreed"
                  checked={formData.medicalWaiverAgreed}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-slate-500 bg-slate-700 text-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                />
                <div className="flex-1">
                  <label className="text-sm text-gray-300">
                    <span className="font-semibold text-red-400">Medical Waiver:</span> I understand that football training involves physical activity and possible injury. I release Nextpro Africa Football Academy, its coaches, and partners from liability in case of accident, injury, or health complications during training or matches. I participate at my own risk. <span className="text-red-400">*</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Section 4 – Sponsorship & Support</h3>
              <p className="text-gray-400">Tell us about your sponsorship status</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Are you sponsored? <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-4">
                {yesNoOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isSponsored"
                      value={option}
                      checked={formData.isSponsored === option}
                      onChange={handleChange}
                      className="w-4 h-4 text-yellow-500 bg-slate-700 border-slate-500 focus:ring-yellow-500"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.isSponsored === 'Yes' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Sponsor's Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="sponsorName"
                      value={formData.sponsorName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                      placeholder="Sponsor's name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Sponsor's Phone/Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="sponsorContact"
                      value={formData.sponsorContact}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                      placeholder="Phone or email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Sponsor's Relationship
                  </label>
                  <input
                    type="text"
                    name="sponsorRelationship"
                    value={formData.sponsorRelationship}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                    placeholder="e.g., Company, Individual, Organization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Would your sponsor support academy initiatives (friendlies, jerseys, equipment)?
                  </label>
                  <select
                    name="sponsorSupport"
                    value={formData.sponsorSupport}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  >
                    <option value="">Select option</option>
                    {sponsorSupportOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Section 5 – Rules & Regulations</h3>
              <p className="text-gray-400">Please read and agree to all academy rules</p>
            </div>

            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <Activity className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-2">General Conduct</h4>
                  <ul className="text-sm text-gray-300 space-y-1 mb-3">
                    <li>• Respect coaches, teammates, referees, and spectators</li>
                    <li>• No abusive language, bullying, or discrimination</li>
                    <li>• Be punctual and disciplined</li>
                    <li>• Wear official academy kit or approved training wear</li>
                  </ul>
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="conductAgreed"
                      checked={formData.conductAgreed}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-slate-500 bg-slate-700 text-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    />
                    <span className="text-sm text-yellow-400 font-medium">I agree to follow General Conduct rules *</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-2">Training & Attendance</h4>
                  <ul className="text-sm text-gray-300 space-y-1 mb-3">
                    <li>• Attend all sessions unless excused</li>
                    <li>• Report absences 24hrs before training</li>
                    <li>• Arrive 15 minutes early to warm up</li>
                    <li>• Coaches must prepare sessions in advance</li>
                  </ul>
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="attendanceAgreed"
                      checked={formData.attendanceAgreed}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-slate-500 bg-slate-700 text-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    />
                    <span className="text-sm text-yellow-400 font-medium">I agree to follow Training & Attendance rules *</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-2">Discipline & Attitude</h4>
                  <ul className="text-sm text-gray-300 space-y-1 mb-3">
                    <li>• No fighting, quarrels, or bad behavior</li>
                    <li>• No phones during training/team talks</li>
                    <li>• No alcohol, smoking, or drugs during academy activities</li>
                    <li>• Misconduct may lead to suspension or expulsion</li>
                  </ul>
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="disciplineAgreed"
                      checked={formData.disciplineAgreed}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-slate-500 bg-slate-700 text-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    />
                    <span className="text-sm text-yellow-400 font-medium">I agree to follow Discipline & Attitude rules *</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <Heart className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-2">Health & Safety</h4>
                  <ul className="text-sm text-gray-300 space-y-1 mb-3">
                    <li>• Disclose injuries/conditions before training</li>
                    <li>• Warm-up and cool-down are compulsory</li>
                    <li>• Treat facilities and equipment with care</li>
                    <li>• Serious injuries handled at player/sponsor's cost</li>
                  </ul>
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="healthSafetyAgreed"
                      checked={formData.healthSafetyAgreed}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-slate-500 bg-slate-700 text-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    />
                    <span className="text-sm text-yellow-400 font-medium">I agree to follow Health & Safety rules *</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <Award className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-2">Respect & Representation</h4>
                  <ul className="text-sm text-gray-300 space-y-1 mb-3">
                    <li>• Represent Nextpro Africa positively on/off the field</li>
                    <li>• Social media posts must be respectful</li>
                    <li>• Misconduct damaging academy image leads to discipline</li>
                  </ul>
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="representationAgreed"
                      checked={formData.representationAgreed}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-slate-500 bg-slate-700 text-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    />
                    <span className="text-sm text-yellow-400 font-medium">I agree to Respect & Representation rules *</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <FileText className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-2">Media & Publicity</h4>
                  <ul className="text-sm text-gray-300 space-y-1 mb-3">
                    <li>• Photos/videos may be used for academy promotion</li>
                    <li>• Coaches promote academy values positively</li>
                  </ul>
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="mediaConsentAgreed"
                      checked={formData.mediaConsentAgreed}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-slate-500 bg-slate-700 text-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                    />
                    <span className="text-sm text-yellow-400 font-medium">I consent to use of my images/videos for publicity *</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Section 6 – Agreement & Signature</h3>
              <p className="text-gray-400">Final step - sign the agreement</p>
            </div>

            {getPlayerAge() < 18 && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Parent/Guardian Name (Required for players under 18) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="parentGuardianName"
                    value={formData.parentGuardianName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                    placeholder="Parent or guardian full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Signature <span className="text-red-400">*</span>
              </label>
              <div className="bg-slate-900 border-2 border-slate-600 rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={200}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full cursor-crosshair touch-none"
                  style={{ touchAction: 'none' }}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-400">Sign above using your mouse or finger</p>
                <button
                  type="button"
                  onClick={clearSignature}
                  className="text-sm text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
                >
                  Clear Signature
                </button>
              </div>
            </div>

            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="finalAgreement"
                  checked={formData.finalAgreement}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-slate-500 bg-slate-700 text-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                />
                <div className="flex-1">
                  <label className="text-sm text-gray-300">
                    <span className="font-semibold text-yellow-400">Final Confirmation:</span> I confirm that I have read, understood, and agreed to abide by the Nextpro Africa Football Academy rules and regulations. All information provided is accurate and complete.
                    {' '}<span className="text-red-400">*</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-400 font-medium mb-1">Welcome to Nextpro Africa!</p>
                  <p className="text-sm text-gray-400">
                    Once submitted, your application will be processed and you'll receive a confirmation email. Welcome to the family!
                  </p>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-3xl mx-auto">
       <div className="text-center mb-8 mt-23">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl mb-4 shadow-lg shadow-yellow-500/30">
            <UserPlus className="h-10 w-10 text-slate-900" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Nextpro Africa Football Academy</h1>
          <p className="text-gray-400">Player Agreement Form</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5, 6, 7].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep >= step
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 shadow-lg'
                    : 'bg-slate-700 text-gray-400'
                }`}>
                  {currentStep > step ? <CheckCircle className="h-6 w-6" /> : step}
                </div>
                {step < 7 && (
                  <div className={`flex-1 h-1 mx-1 rounded transition-all ${
                    currentStep > step ? 'bg-yellow-500' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 px-2">
            <span className={currentStep === 1 ? 'text-yellow-500 font-medium' : ''}>Account</span>
            <span className={currentStep === 2 ? 'text-yellow-500 font-medium' : ''}>Basic Info</span>
            <span className={currentStep === 3 ? 'text-yellow-500 font-medium' : ''}>Emergency</span>
            <span className={currentStep === 4 ? 'text-yellow-500 font-medium' : ''}>Medical</span>
            <span className={currentStep === 5 ? 'text-yellow-500 font-medium' : ''}>Sponsor</span>
            <span className={currentStep === 6 ? 'text-yellow-500 font-medium' : ''}>Rules</span>
            <span className={currentStep === 7 ? 'text-yellow-500 font-medium' : ''}>Sign</span>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700/50">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-400">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)} 
                className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>Previous</span>
                </button>
              ) : (
                <Link
                  href="/auth"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="text-sm">Back to login</span>
                </Link>
              )}

              {currentStep < 7 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  <span>Next Step</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <PenTool className="h-5 w-5" />
                      <span>Submit Agreement</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/auth" className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}