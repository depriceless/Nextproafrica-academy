"use client"

import { useState } from 'react'
import { Trophy, Users, Target, Clock, Calendar, ChevronRight, Star, Award, Zap, Shield, Heart, TrendingUp, CheckCircle2 } from 'lucide-react'

export default function ProgramsPage() {
  const [selectedAge, setSelectedAge] = useState('all')

  const programs = [
    {
      id: 1,
      name: "Little Champions",
      ageRange: "6-9 years",
      category: "youth",
      duration: "12 weeks",
      sessions: "2x per week",
      image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80",
      color: "blue",
      icon: Heart,
      description: "Introduction to football fundamentals in a fun, engaging environment. Focus on basic skills, coordination, and love for the game.",
      features: [
        "Basic ball control and dribbling",
        "Fun games and activities",
        "Social skills development",
        "Confidence building",
        "Qualified youth coaches",
        "Small group sizes (max 12)"
      ],
      goals: "Build confidence, learn basic skills, and develop a love for football"
    },
    {
      id: 2,
      name: "Youth Development",
      ageRange: "10-13 years",
      category: "youth",
      duration: "16 weeks",
      sessions: "3x per week",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      color: "green",
      icon: TrendingUp,
      description: "Structured training program focusing on technical skills, tactical awareness, and physical development.",
      features: [
        "Technical skills training",
        "Tactical understanding",
        "Physical conditioning",
        "Team play concepts",
        "Match day experience",
        "Performance tracking"
      ],
      goals: "Develop fundamental skills and understanding of team dynamics"
    },
    {
      id: 3,
      name: "Elite Academy",
      ageRange: "14-16 years",
      category: "elite",
      duration: "20 weeks",
      sessions: "4x per week",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
      color: "yellow",
      icon: Trophy,
      description: "Advanced training for serious players aiming for professional careers. Intensive coaching with focus on all aspects of the game.",
      features: [
        "Advanced tactical training",
        "Strength & conditioning",
        "Mental coaching",
        "Video analysis",
        "Competitive matches",
        "Scouting opportunities"
      ],
      goals: "Prepare players for competitive football and potential professional careers"
    },
    {
      id: 4,
      name: "Goalkeeper Specialist",
      ageRange: "10-18 years",
      category: "specialized",
      duration: "12 weeks",
      sessions: "2x per week",
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80",
      color: "orange",
      icon: Shield,
      description: "Specialized goalkeeper training focusing on shot-stopping, positioning, distribution, and command of the penalty area.",
      features: [
        "Specialist GK coaches",
        "Shot-stopping techniques",
        "Positioning & angles",
        "Distribution training",
        "1v1 situations",
        "Game reading skills"
      ],
      goals: "Develop complete goalkeepers with technical and mental skills"
    }
  ]

  const benefits = [
    {
      icon: Users,
      title: "Expert Coaches",
      description: "UEFA and CAF certified coaches with professional playing experience"
    },
    {
      icon: Target,
      title: "Structured Curriculum",
      description: "Age-appropriate training programs designed for optimal development"
    },
    {
      icon: Trophy,
      title: "Competitive Opportunities",
      description: "Regular matches, tournaments, and showcase events"
    },
    {
      icon: Zap,
      title: "Modern Facilities",
      description: "State-of-the-art pitches and training equipment"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, any> = {
      blue: { 
        gradient: "from-blue-500 to-blue-600",
        bg: "bg-blue-500/10",
        text: "text-blue-600",
        border: "border-blue-200",
        hover: "hover:border-blue-500"
      },
      green: { 
        gradient: "from-green-500 to-green-600",
        bg: "bg-green-500/10",
        text: "text-green-600",
        border: "border-green-200",
        hover: "hover:border-green-500"
      },
      yellow: { 
        gradient: "from-yellow-500 to-yellow-600",
        bg: "bg-yellow-500/10",
        text: "text-yellow-600",
        border: "border-yellow-200",
        hover: "hover:border-yellow-500"
      },
      red: { 
        gradient: "from-red-500 to-red-600",
        bg: "bg-red-500/10",
        text: "text-red-600",
        border: "border-red-200",
        hover: "hover:border-red-500"
      },
      purple: { 
        gradient: "from-purple-500 to-purple-600",
        bg: "bg-purple-500/10",
        text: "text-purple-600",
        border: "border-purple-200",
        hover: "hover:border-purple-500"
      },
      orange: { 
        gradient: "from-orange-500 to-orange-600",
        bg: "bg-orange-500/10",
        text: "text-orange-600",
        border: "border-orange-200",
        hover: "hover:border-orange-500"
      }
    }
    return colors[color]
  }

  const filteredPrograms = selectedAge === 'all' 
    ? programs 
    : programs.filter(p => p.category === selectedAge)

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-16 lg:py-20 overflow-hidden mb-16">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1920&q=80" 
            alt="Training Programs" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-500 tracking-wide">Our Programs</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Training Programs
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Comprehensive football development programs designed for every age and skill level
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Benefits Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Filter Section */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Filter Programs</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedAge('all')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedAge === 'all'
                    ? 'bg-yellow-500 text-slate-900 shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Programs
              </button>
              <button
                onClick={() => setSelectedAge('youth')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedAge === 'youth'
                    ? 'bg-yellow-500 text-slate-900 shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Youth Development
              </button>
              <button
                onClick={() => setSelectedAge('elite')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedAge === 'elite'
                    ? 'bg-yellow-500 text-slate-900 shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Elite Programs
              </button>
              <button
                onClick={() => setSelectedAge('specialized')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedAge === 'specialized'
                    ? 'bg-yellow-500 text-slate-900 shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Specialized Training
              </button>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => {
              const colors = getColorClasses(program.color)
              const Icon = program.icon
              
              return (
                <div
                  key={program.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-lg border-2 ${colors.border} ${colors.hover} transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={`absolute top-4 right-4 ${colors.bg} backdrop-blur-sm rounded-full p-3`}>
                      <Icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-black text-slate-900">{program.name}</h3>
                      <span className={`${colors.bg} ${colors.text} px-3 py-1 rounded-full text-xs font-bold`}>
                        {program.ageRange}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100">
                      <div>
                        <div className="flex items-center space-x-1 text-gray-500 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span className="text-xs">Duration</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900">{program.duration}</p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-1 text-gray-500 mb-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">Sessions</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900">{program.sessions}</p>
                      </div>
                    </div>
                     

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-slate-900 mb-2">What's Included:</h4>
                      <ul className="space-y-1">
                        {program.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle2 className={`h-4 w-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                            <span className="text-xs text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full bg-gradient-to-r ${colors.gradient} text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2`}>
                      <span>Enroll Now</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Program Goals Section */}
        <section className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-100 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Our Training Philosophy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every program is built on our core principles of player development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Technical Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                Master the fundamental skills through repetition, progressive challenges, and expert coaching feedback.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Team Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Build communication, leadership, and tactical awareness through structured team activities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Character Building</h3>
              <p className="text-gray-600 leading-relaxed">
                Develop discipline, resilience, sportsmanship, and life skills that extend beyond the pitch.
              </p>
            </div>
          </div>
        </section>

        {/* Enrollment Process */}
        <section className="bg-slate-900 rounded-2xl p-8 lg:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                How to Enroll
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Getting started is easy! Follow these simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-10">
              {[
                { step: "1", title: "Choose Program", desc: "Select the program that fits your age and goals" },
                { step: "2", title: "Schedule Trial", desc: "Book a free trial session to experience our training" },
                { step: "3", title: "Meet Coaches", desc: "Get assessed and meet your coaching team" },
                { step: "4", title: "Start Training", desc: "Begin your journey to football excellence" }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 text-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="group bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center space-x-2">
                <span>Schedule Your Free Trial</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}