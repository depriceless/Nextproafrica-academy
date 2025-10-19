"use client"

import { useState, useEffect } from 'react'
import { Trophy, Award, Target, Users, Heart, Shield, Zap, Star, ChevronRight, Medal, TrendingUp, Globe, ArrowRight, CheckCircle, Linkedin, Mail, BookOpen, Briefcase, Map } from 'lucide-react'

// Add type definitions at the top level
type ColorType = 'yellow' | 'red' | 'blue' | 'purple' | 'green' | 'orange'

interface ValueItem {
  icon: any
  title: string
  description: string
  color: ColorType
}

interface WhatWeDoItem {
  icon: any
  title: string
  description: string
  color: ColorType
}

export default function AboutUsPage() {
  const [heroVisible, setHeroVisible] = useState(false)
  const [storyVisible, setStoryVisible] = useState(false)
  const [valuesVisible, setValuesVisible] = useState(false)
  const [impactVisible, setImpactVisible] = useState(false)
  const [teamVisible, setTeamVisible] = useState(false)
  const [facilitiesVisible, setFacilitiesVisible] = useState(false)

  useEffect(() => {
    setHeroVisible(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStoryVisible(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    const section = document.getElementById('story-section')
    if (section) observer.observe(section)
    return () => { if (section) observer.unobserve(section) }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setValuesVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('values-section')
    if (section) observer.observe(section)
    return () => { if (section) observer.unobserve(section) }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setImpactVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('impact-section')
    if (section) observer.observe(section)
    return () => { if (section) observer.unobserve(section) }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setTeamVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('team-section')
    if (section) observer.observe(section)
    return () => { if (section) observer.unobserve(section) }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFacilitiesVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('facilities-section')
    if (section) observer.observe(section)
    return () => { if (section) observer.unobserve(section) }
  }, [])

  // Add type annotation to the arrays
  const values: ValueItem[] = [
    {
      icon: Trophy,
      title: "Excellence",
      description: "We pursue the highest standards in every aspect of training and player development, ensuring our athletes reach their full potential.",
      color: "yellow"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Our love for the game drives us to inspire and nurture the next generation of football stars with dedication and enthusiasm.",
      color: "red"
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We build character alongside skills, fostering respect, discipline, sportsmanship, and ethical behavior on and off the field.",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge training methods and technology to maximize player potential and stay ahead of modern football development.",
      color: "purple"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive family environment where players, coaches, and families work together towards common goals.",
      color: "green"
    },
    {
      icon: Target,
      title: "Growth Mindset",
      description: "Encouraging continuous improvement, learning from mistakes, and embracing challenges as opportunities to develop.",
      color: "orange"
    }
  ]

  const whatWeDo: WhatWeDoItem[] = [
    {
      icon: Target,
      title: "Elite Coaching & Technique",
      description: "Structured weekly training at Liberty Stadium and selected pitches, focusing on technical skill, tactical intelligence and physical conditioning.",
      color: "yellow"
    },
    {
      icon: TrendingUp,
      title: "Player Development Pathway",
      description: "Personalised training plans, match scouting, and exposure to trials and partner networks in Europe and across Africa.",
      color: "blue"
    },
    {
      icon: BookOpen,
      title: "Education & Life Skills",
      description: "Academic support, career guidance, nutrition and mental resilience programmes that make players stronger people, not just athletes.",
      color: "green"
    },
    {
      icon: Users,
      title: "Community & Inclusivity",
      description: "Programs for younger players, outreach to underserved communities, and fitness sessions for adults 40+ to promote lifelong health.",
      color: "purple"
    }
  ]

  const leadership = [
    {
      name: "Adedini Jamiu Tobi",
      role: "Director, Operations & Strategy Development",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      bio: "Strategic leader dedicated to building sustainable pathways for African football talent.",
      linkedin: "#",
      email: "jamiu@nextproafrica.com"
    },
    {
      name: "Oladele Opeyemi James",
      role: "Director, Sports & Talent Development",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      bio: "Expert in player development with deep experience in identifying and nurturing football talent.",
      linkedin: "#",
      email: "opeyemi@nextproafrica.com"
    }
  ]

  const impactMetrics = [
    {
      icon: Users,
      metric: "Technical Progress",
      description: "Measurable improvement in player skills, tactical awareness, and physical conditioning"
    },
    {
      icon: BookOpen,
      metric: "Academic Stability",
      description: "Support systems ensuring players maintain educational progress alongside athletic development"
    },
    {
      icon: TrendingUp,
      metric: "Professional Transitions",
      description: "Successful placements in professional trials and scholarship opportunities across Africa and Europe"
    },
    {
      icon: Globe,
      metric: "Opportunity Access",
      description: "Every Nigerian child with football potential gets a fair shot at achieving their professional dreams"
    }
  ]

  const getColorClasses = (color: ColorType) => {
    const colors = {
      yellow: { bg: "bg-yellow-500", light: "bg-yellow-500/10", text: "text-yellow-600", border: "border-yellow-500", gradient: "from-yellow-500 to-yellow-600" },
      red: { bg: "bg-red-500", light: "bg-red-500/10", text: "text-red-600", border: "border-red-500", gradient: "from-red-500 to-red-600" },
      blue: { bg: "bg-blue-500", light: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500", gradient: "from-blue-500 to-blue-600" },
      purple: { bg: "bg-purple-500", light: "bg-purple-500/10", text: "text-purple-600", border: "border-purple-500", gradient: "from-purple-500 to-purple-600" },
      green: { bg: "bg-green-500", light: "bg-green-500/10", text: "text-green-600", border: "border-green-500", gradient: "from-green-500 to-green-600" },
      orange: { bg: "bg-orange-500", light: "bg-orange-500/10", text: "text-orange-600", border: "border-orange-500", gradient: "from-orange-500 to-orange-600" }
    }
    return colors[color]
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-slate-900 pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80" 
            alt="About Us" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-900/80" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-500 tracking-wide">ABOUT NEXTPRO AFRICA FA</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Building Champions, Shaping Futures
              </h1>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Nextpro Africa is more than a football academy — we are a community and a pathway. Founded to give talented African children structured access to professional coaching, education and exposure, Nextpro Africa helps promising players reach competitive leagues while equipping them with the life skills to thrive beyond football.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="group bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2">
                  <span>Join Our Academy</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80" 
                    alt="Training" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-yellow-500/20 rounded-2xl -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story-section" className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`transition-all duration-1000 ${storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80" 
                  alt="Our Story" 
                  className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent rounded-2xl" />
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
                Our Story
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Nextpro Africa is more than a football academy — we are a community and a pathway. Founded to give talented African children structured access to professional coaching, education and exposure, Nextpro Africa helps promising players reach competitive leagues while equipping them with the life skills to thrive beyond football.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                What started as a vision to bridge the gap between raw talent and professional opportunity has grown into one of Nigeria's most respected football academies. Our success is built on a foundation of excellence, integrity, and an unwavering commitment to developing not just great footballers, but outstanding individuals who can succeed both on and off the pitch.
              </p>

              <button className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2">
                <span>Explore Our Programs</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section id="values-section" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission & Vision Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <div className={`bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-10 shadow-2xl transition-all duration-1000 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Our Mission</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                To discover, develop and showcase African football talent by delivering world-class coaching, education, and mentorship that prepare players for careers in elite leagues — and for life after sport.
              </p>
            </div>

            <div className={`bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-10 shadow-2xl transition-all duration-1000 delay-200 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Our Vision</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                A future where every African child with football potential has the coaching, support and opportunities to reach their highest level — locally and internationally.
              </p>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
                What We Do
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our comprehensive approach combines elite training, personal development, and community impact to create well-rounded athletes and individuals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {whatWeDo.map((item, index) => {
                const colors = getColorClasses(item.color)
                const delay = index * 150
                return (
                  <div 
                    key={index} 
                    className={`bg-white rounded-2xl p-8 border-2 ${colors.border} hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${delay}ms` }}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center mb-5`}>
                      <item.icon className="h-7 w-7 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Core Values Grid */}
          <div>
            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center">Our Core Values</h3>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
              The principles that guide everything we do at Nextpro Africa FA
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => {
                const colors = getColorClasses(value.color)
                const delay = index * 100
                return (
                  <div 
                    key={index} 
                    className={`bg-white rounded-2xl p-8 border-2 ${colors.border} hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${delay}ms` }}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center mb-5`}>
                      <value.icon className="h-7 w-7 text-white" />
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

      {/* Impact Section */}
      <section id="impact-section" className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
              Our Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We prioritize measurable growth — technical progress, academic stability, and successful transitions to professional trials or scholarship opportunities. Every Nigerian child with a dream of pro football should have a fair shot; our work turns ambition into opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => {
              const delay = index * 150
              return (
                <div 
                  key={index} 
                  className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${impactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-5">
                    <metric.icon className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{metric.metric}</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">{metric.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities-section" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${facilitiesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                <Map className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600 tracking-wide">OUR FACILITIES</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
                Facilities & Where We Train
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our primary training base is <span className="font-bold text-slate-900">Liberty Stadium, Ibadan</span>. We're actively expanding pitch access — including plans to use Adamasingba training ground — to increase training slots and competitive opportunities for our academy players.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">Liberty Stadium</p>
                    <p className="text-gray-600 text-sm">Primary training facility with professional-grade pitches</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">Adamasingba Ground</p>
                    <p className="text-gray-600 text-sm">Planned expansion for additional training opportunities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">Selected Partner Pitches</p>
                    <p className="text-gray-600 text-sm">Strategic locations across Ibadan for flexible training</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${facilitiesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80" 
                  alt="Training Facilities" 
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
                  <Briefcase className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-semibold text-yellow-500 tracking-wide">PARTNERSHIPS</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                  Sponsorship & Partnerships
                </h2>
                
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  We welcome partnerships that help fund player development, kit and travel, pitch rentals, and educational scholarships. Sponsorships make the difference between a one-off reprieve and a sustainable pathway to professional football.
                </p>

                <button className="group bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2">
                  <span>Become a Partner</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <Trophy className="h-8 w-8 text-yellow-500 mb-3" />
                  <p className="text-white font-semibold mb-1">Player Development</p>
                  <p className="text-gray-400 text-sm">Training & coaching support</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <Users className="h-8 w-8 text-blue-500 mb-3" />
                  <p className="text-white font-semibold mb-1">Kit & Travel</p>
                  <p className="text-gray-400 text-sm">Equipment & logistics</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <Map className="h-8 w-8 text-green-500 mb-3" />
                  <p className="text-white font-semibold mb-1">Pitch Rentals</p>
                  <p className="text-gray-400 text-sm">Facility access funding</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <BookOpen className="h-8 w-8 text-purple-500 mb-3" />
                  <p className="text-white font-semibold mb-1">Scholarships</p>
                  <p className="text-gray-400 text-sm">Educational support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="team-section" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced professionals with a shared passion for developing the next generation of African football talent
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader, index) => {
              const delay = index * 150
              return (
                <div 
                  key={index} 
                  className={`group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    <div className="absolute bottom-4 left-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a href={leader.linkedin} className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                        <Linkedin className="h-5 w-5 text-slate-900" />
                      </a>
                      <a href={`mailto:${leader.email}`} className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                        <Mail className="h-5 w-5 text-slate-900" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{leader.name}</h3>
                    <p className="text-yellow-600 font-semibold mb-3">{leader.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
              Get Involved
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're a parent, coach, scout, sponsor or volunteer — we'd love to hear from you. Help us train the next generation of African professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-5">
                <Users className="h-7 w-7 text-yellow-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Parents</h4>
              <p className="text-gray-600 text-sm mb-4">Enroll your child in our development programs</p>
              <button className="text-yellow-600 font-semibold text-sm flex items-center space-x-1 group">
                <span>Learn More</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5">
                <Trophy className="h-7 w-7 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Coaches</h4>
              <p className="text-gray-600 text-sm mb-4">Join our team of expert coaches</p>
              <button className="text-blue-600 font-semibold text-sm flex items-center space-x-1 group">
                <span>Apply Now</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-5">
                <Briefcase className="h-7 w-7 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Sponsors</h4>
              <p className="text-gray-600 text-sm mb-4">Partner with us to fund player development</p>
              <button className="text-green-600 font-semibold text-sm flex items-center space-x-1 group">
                <span>Partner With Us</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-5">
                <Heart className="h-7 w-7 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Volunteers</h4>
              <p className="text-gray-600 text-sm mb-4">Support our programs and community initiatives</p>
              <button className="text-purple-600 font-semibold text-sm flex items-center space-x-1 group">
                <span>Volunteer</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-500 tracking-wide">JOIN US TODAY</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            Ready to Transform Your Football Journey?
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join aspiring footballers who have chosen Nextpro Africa FA to develop their skills, character, and pursue their dreams of professional football.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="group bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-10 py-5 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center space-x-2">
              <span>Schedule a Visit</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-5 rounded-lg font-bold text-lg transition-all duration-300 border-2 border-white/20 hover:border-white/40">
              <span>Contact Admissions</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
