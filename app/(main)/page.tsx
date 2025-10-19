"use client"

import { useState, useEffect } from 'react'
import { ChevronRight, Play, Users, Target, Star, Award, Shield, Zap, Heart, Trophy, MapPin, Phone, Mail, Clock, CircleCheck, AlertCircle } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase lazily
let supabaseClient: ReturnType<typeof createClient> | null = null

const getSupabase = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return supabaseClient
}

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface SubmitStatus {
  type: string | null
  message: string
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [counts, setCounts] = useState({ players: 0, coaches: 0, years: 0, success: 0 })
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [storyVisible, setStoryVisible] = useState(false)
  const [programsVisible, setProgramsVisible] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)
  const [valuesVisible, setValuesVisible] = useState(false)
  const [newsVisible, setNewsVisible] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: null, message: '' })

  const slides = [
    {
      title: "Transform Your Game",
      subtitle: "Elite Football Training",
      description: "Join Nigeria's premier football academy and unlock your full potential with world-class coaching",
      image: "/hero.jpg"
    },
    {
      title: "Champions Are Made Here",
      subtitle: "Professional Development",
      description: "From grassroots to glory - comprehensive training programs for every skill level",
      image: "/nextpro.jpg"
    },
    {
      title: "Your Journey Starts Now",
      subtitle: "Excellence in Every Touch",
      description: "State-of-the-art facilities and UEFA-certified coaches ready to elevate your game",
      image: "/nextproi.jpg"
    }
  ]

  const values = [
    { icon: Trophy, title: "Excellence", description: "We pursue the highest standards in every aspect of training and player development" },
    { icon: Heart, title: "Passion", description: "Our love for the game drives us to inspire and nurture the next generation of football stars" },
    { icon: Shield, title: "Integrity", description: "We build character alongside skills, fostering respect, discipline and sportsmanship" },
    { icon: Zap, title: "Innovation", description: "Cutting-edge training methods and technology to maximize player potential" }
  ]

  const programs = [
    {
      icon: Users,
      title: "Youth Development",
      age: "Ages 6-12",
      description: "Build foundational skills through fun, age-appropriate training sessions that develop technical abilities and foster a love for the game.",
      features: ["Basic Skills Training", "Team Play Introduction", "Physical Development", "Character Building"],
      color: "blue"
    },
    {
      icon: Target,
      title: "Elite Training",
      age: "Ages 13-17",
      description: "Advanced coaching for aspiring professionals. Intensive technical, tactical, and physical training designed to maximize potential.",
      features: ["Advanced Tactics", "Position-Specific Training", "Match Analysis", "Strength & Conditioning"],
      color: "yellow",
      featured: true
    },
    {
      icon: Trophy,
      title: "Pro Pathway",
      age: "Ages 16+",
      description: "Elite program for players aiming for professional careers. Includes trials, scouting exposure, and career guidance.",
      features: ["Professional Coaching", "Scout Exposure", "Video Analysis", "Career Management"],
      color: "green"
    }
  ]

  const categories = [
    { id: 'all', label: 'All Media' },
    { id: 'training', label: 'Training' },
    { id: 'matches', label: 'Matches' },
    { id: 'events', label: 'Events' },
    { id: 'facilities', label: 'Facilities' }
  ]

  const galleryItems = [
    { id: 1, url: '/match.jpg', category: 'training', objectPosition: 'top', type: 'image' },
    { id: 2, url: '/matchii.jpg', category: 'matches', objectPosition: 'top', type: 'image' },
    { id: 3, url: '/matchiii.jpg', category: 'events', objectPosition: 'top', type: 'image' },
    { id: 4, type: 'video', thumbnail: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80', category: 'events', title: 'Academy Graduation 2024', description: 'Celebrating our graduates' },
    { id: 5, type: 'image', url: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80', category: 'facilities', title: 'Training Ground', description: 'State-of-the-art facilities', objectPosition: 'top' },
    { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80', category: 'matches', title: 'Victory Celebration', description: 'Team celebrating tournament win', objectPosition: 'top' },
  ]

  const newsArticles = [
    { id: 1, title: "U-17 Team Wins Regional Championship", excerpt: "Our Under-17 squad dominated the regional championship, securing first place with an impressive 5-0 victory in the final match.", image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80", category: "Achievement", date: "October 5, 2025", author: "Coach Michael", readTime: "3 min read" },
    { id: 2, title: "New UEFA-Certified Coaches Join Our Team", excerpt: "We're excited to announce the addition of three new UEFA-certified coaches who bring international experience to our academy.", image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80", category: "Announcement", date: "October 1, 2025", author: "Admin", readTime: "2 min read" },
    { id: 3, title: "Summer Training Camp Registration Open", excerpt: "Join our intensive summer training camp featuring advanced drills, match simulations, and guest appearances from professional players.", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80", category: "Event", date: "September 28, 2025", author: "Academy Director", readTime: "4 min read" }
  ]

  const contactInfo = [
    { icon: MapPin, title: "Visit Us", details: ["123 Sports Avenue, Ring Road", "Ibadan, Oyo State, Nigeria"], color: "yellow" },
    { icon: Phone, title: "Call Us", details: ["+234 803 456 7890"], color: "blue" },
    { icon: Mail, title: "Email Us", details: ["Nextproafrica2025@gmail.com"], color: "green" },
    { icon: Clock, title: "Training Schedule", details: ["Mon, Wed, Fri: 10:00 AM - 12:00 PM", "Saturday: 10:00 AM - 11:00 AM (Gym)"], color: "red" }
  ]

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const duration = 2000, steps = 60, interval = duration / steps
        let step = 0
        const timer = setInterval(() => {
          step++
          const progress = step / steps
          setCounts({ 
            players: Math.floor(500 * progress), 
            coaches: Math.floor(15 * progress), 
            years: Math.floor(10 * progress), 
            success: Math.floor(98 * progress) 
          })
          if (step >= steps) {
            clearInterval(timer)
            setCounts({ players: 500, coaches: 15, years: 10, success: 98 })
          }
        }, interval)
      }
    }, { threshold: 0.2 })
    const section = document.getElementById('about')
    if (section) observer.observe(section)
    return () => { if (section) observer.unobserve(section) }
  }, [])

  useEffect(() => {
    const createObserver = (id: string, setState: (state: boolean) => void) => {
      const observer = new IntersectionObserver(([entry]) => setState(entry.isIntersecting), { threshold: 0.1 })
      const section = document.getElementById(id)
      if (section) observer.observe(section)
      return () => { if (section) observer.unobserve(section) }
    }

    const cleanup1 = createObserver('story-section', setStoryVisible)
    const cleanup2 = createObserver('values-section', setValuesVisible)
    const cleanup3 = createObserver('programmes', setProgramsVisible)
    const cleanup4 = createObserver('news', setNewsVisible)
    const cleanup5 = createObserver('contact', setContactVisible)

    return () => {
      cleanup1()
      cleanup2()
      cleanup3()
      cleanup4()
      cleanup5()
    }
  }, [])

  const filteredItems = activeCategory === 'all' ? galleryItems : galleryItems.filter(item => item.category === activeCategory)

  const getColorClasses = (color: string): Record<string, string> => {
    const colors: Record<string, Record<string, string>> = {
      blue: { gradient: "from-blue-500 to-blue-600", light: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/20", hover: "hover:border-blue-500" },
      yellow: { gradient: "from-yellow-500 to-yellow-600", light: "bg-yellow-500/10", text: "text-yellow-600", border: "border-yellow-500/20", hover: "hover:border-yellow-500", bg: "bg-yellow-500/10", icon: "text-yellow-600" },
      green: { gradient: "from-green-500 to-green-600", light: "bg-green-500/10", text: "text-green-600", border: "border-green-500/20", hover: "hover:border-green-500", bg: "bg-green-500/10", icon: "text-green-600" },
      red: { bg: "bg-red-500/10", text: "text-red-600", icon: "text-red-600" }
    }
    return colors[color] || colors.yellow
  }

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = { 
      "Achievement": "bg-yellow-500", 
      "Announcement": "bg-blue-500", 
      "Event": "bg-green-500" 
    }
    return colors[category] || "bg-gray-500"
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Please fill in all required fields')
      }

      const supabase = getSupabase()
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject,
            message: formData.message,
            user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
          }
        ])

      if (error) throw error

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you soon.'
      })
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' })
      }, 5000)

    } catch (error: any) {
      console.error('Error submitting form:', error)
      setSubmitStatus({
        type: 'error',
        message: error?.message || 'Failed to send message. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen bg-slate-900 overflow-hidden pt-20">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover object-center" loading={index === 0 ? "eager" : "lazy"} />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/30" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="w-full">
            <div className="space-y-8 max-w-4xl mx-auto text-center flex flex-col items-center">
              <div className="space-y-4 flex flex-col items-center">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight text-center">{slides[currentSlide].title}</h1>
                <div className="flex items-center justify-center space-x-3">
                  <div className="h-1 w-12 bg-yellow-500" />
                  <p className="text-xl sm:text-2xl font-bold text-yellow-500 text-center">{slides[currentSlide].subtitle}</p>
                  <div className="h-1 w-12 bg-yellow-500" />
                </div>
              </div>

              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto text-center">{slides[currentSlide].description}</p>

              <div className="flex flex-wrap gap-4 justify-center">
                <button className="group relative bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 flex items-center space-x-2">
                  <span>Join Academy</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => setIsVideoPlaying(true)} className="group relative bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-yellow-500 w-12' : 'bg-white/30 w-2 hover:bg-white/50'}`} />
          ))}
        </div>

        {isVideoPlaying && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setIsVideoPlaying(false)}>
            <div className="relative w-full max-w-5xl aspect-video bg-slate-900 rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsVideoPlaying(false)} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors">✕</button>
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Academy Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
            </div>
          </div>
        )}

        <div className="absolute bottom-8 right-8 z-20 hidden lg:block animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Scroll Down</p>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-yellow-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative bg-slate-50 py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-4">
              <Award className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-600 tracking-wide">About Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Building Champions, Shaping Futures</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">Nextpro Africa FA is Nigeria's leading football development center, dedicated to transforming talented young players into professional athletes through world-class training and holistic development.</p>
          </div>

          <div id="story-section" className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div className={`relative transition-all duration-1000 ${storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80" alt="Football Training" className="w-full h-[500px] object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-4xl font-black text-yellow-600">{counts.players}+</p>
                      <p className="text-base text-gray-600 font-medium">Active Players</p>
                    </div>
                    <div>
                      <p className="text-4xl font-black text-yellow-600">{counts.coaches}+</p>
                      <p className="text-base text-gray-600 font-medium">Expert Coaches</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-500 rounded-2xl -z-10 opacity-20" />
            </div>

            <div className={`space-y-8 transition-all duration-1000 delay-300 ${storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Story</h3>
                <p className="text-gray-600 leading-relaxed mb-4">Nextpro Africa is more than a football academy — we are a community and a pathway. Founded to give talented African children structured access to professional coaching, education and exposure,</p>
                <p className="text-gray-600 leading-relaxed">Nextpro Africa helps promising players reach competitive leagues while equipping them with the life skills to thrive beyond football.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 delay-500 ${storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4">
                    <Trophy className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">UEFA Certified</h4>
                  <p className="text-gray-600 text-sm">International standard coaching qualifications</p>
                </div>

                <div className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 delay-700 ${storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Modern Facilities</h4>
                  <p className="text-gray-600 text-sm">State-of-the-art training grounds and equipment</p>
                </div>
              </div>

              <button className="group inline-flex bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 items-center space-x-2">
                <span>Learn More About Us</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div id="values-section" className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Our Core Values</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do at Nextpro Africa FA</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const delay = index * 150
                const Icon = value.icon
                return (
                  <div 
                    key={index} 
                    className={`group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-500 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${delay}ms` }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programmes" className="relative bg-white py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-4">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-600 tracking-wide">Our Programs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Training Programs For Every Level</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">From beginners to aspiring professionals, we have the perfect program to help you reach your football goals.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const colors = getColorClasses(program.color)
              const delay = index * 200
              const Icon = program.icon
              
              return (
                <div key={index} className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-1000 ${colors.border} ${colors.hover} hover:shadow-2xl hover:-translate-y-2 ${program.featured ? 'shadow-2xl scale-105 ring-2 ring-yellow-500/20' : 'shadow-lg'} ${programsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>
                  {program.featured && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">MOST POPULAR</span>
                    </div>
                  )}

                  <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{program.title}</h3>
                    <p className={`text-sm font-semibold ${colors.text} mb-3`}>{program.age}</p>
                    <p className="text-gray-600 leading-relaxed mb-4">{program.description}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className={`w-5 h-5 ${colors.light} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <svg className={`w-3 h-3 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full bg-gradient-to-r ${colors.gradient} hover:shadow-xl text-white px-6 py-4 rounded-lg font-bold text-base transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mt-6`}>
                    <span>Enroll Now</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">Not sure which program is right for you?</p>
            <button className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2 mx-auto">
              <span>Schedule a Free Trial</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative bg-slate-900 py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-4">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-500 tracking-wide">Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">Moments That Matter</h2>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">Explore our journey through photos and videos - from intense training sessions to championship victories.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${activeCategory === category.id ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/30 scale-105' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'}`}>
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer" onClick={() => setSelectedImage(item.id)}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.type === 'video' ? item.thumbnail : item.url} 
                    alt={item.title || 'Gallery item'} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: item.objectPosition || 'center' }}
                    loading="lazy"
                  />
                  
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-yellow-500/90 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                        <Play className="h-8 w-8 text-slate-900 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}

                  <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase">{item.type}</div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/50 rounded-2xl transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="group inline-flex bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 items-center space-x-2">
              <span>View Full Gallery</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setSelectedImage(null)}>
            <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors text-2xl">✕</button>
            <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
              {galleryItems.find(item => item.id === selectedImage)?.type === 'video' ? (
                <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden">
                  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
                </div>
              ) : (
                <div>
                  <img src={galleryItems.find(item => item.id === selectedImage)?.url} alt="Gallery" className="w-full h-auto rounded-2xl shadow-2xl" />
                  <div className="mt-4 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{galleryItems.find(item => item.id === selectedImage)?.title}</h3>
                    <p className="text-gray-400">{galleryItems.find(item => item.id === selectedImage)?.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* News Section */}
      <section id="news" className="relative bg-slate-50 py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-4">
              <Star className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-600 tracking-wide">News & Updates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Latest From The Academy</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">Stay updated with the latest news, achievements, and events from Nextpro Africa FA.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => {
              const delay = index * 200
              return (
                <div key={article.id} className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer ${newsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    <div className={`absolute top-4 left-4 ${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-xs font-bold`}>{article.category}</div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">By {article.author}</span>
                      <button className="text-yellow-600 font-semibold text-sm flex items-center space-x-1 group-hover:space-x-2 transition-all">
                        <span>Read More</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <button className="group inline-flex bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 items-center space-x-2">
              <span>View All News</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative bg-slate-900 py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-4">
              <Mail className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-500 tracking-wide">Contact Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">Get In Touch</h2>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className={`bg-slate-800 rounded-2xl p-8 shadow-2xl border border-yellow-500/10 transition-all duration-1000 ${contactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Mail className="h-6 w-6 text-yellow-500" />
                <span>Send Us a Message</span>
              </h3>

              {submitStatus.type && (
                <div className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${submitStatus.type === 'success' ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                  {submitStatus.type === 'success' ? <CircleCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" /> : <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{submitStatus.message}</p>
                  </div>
                  <button onClick={() => setSubmitStatus({ type: null, message: '' })} className="text-gray-400 hover:text-white text-xl">×</button>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Your Name <span className="text-red-400">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed" placeholder="John Doe" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address <span className="text-red-400">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed" placeholder="+234 800 000 0000" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Subject <span className="text-red-400">*</span></label>
                    <select name="subject" value={formData.subject} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      <option value="">Select a subject</option>
                      <option value="Enrollment Inquiry">Enrollment Inquiry</option>
                      <option value="Program Information">Program Information</option>
                      <option value="Free Trial Session">Free Trial Session</option>
                      <option value="Partnership Opportunity">Partnership Opportunity</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Message <span className="text-red-400">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} disabled={isSubmitting} rows={6} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed" placeholder="Tell us more about your inquiry..." />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-400 text-center">We'll respond within 24 hours during business days</p>
              </form>
            </div>

            <div className={`space-y-6 transition-all duration-1000 delay-300 ${contactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-yellow-500/10 h-[400px]">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126847.24537273698!2d3.8480038!3d7.3775399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103993a9dccbcb7f%3A0xf1b82e4076c716c5!2sIbadan%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1234567890" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Academy Location" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const colors = getColorClasses(info.color)
                  const delay = (index + 1) * 200
                  const Icon = info.icon
                  return (
                    <div key={index} className={`bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700 hover:border-yellow-500/30 hover:scale-105 transition-all duration-500 ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 ${colors.icon}`} />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-400 text-sm">{detail}</p>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}