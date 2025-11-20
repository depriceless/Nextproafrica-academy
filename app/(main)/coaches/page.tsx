"use client"

import { useState } from 'react'
import { Award, Users, Trophy, Target, Star, Shield, Heart, Zap, Mail, Phone, CheckCircle2, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default function CoachesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const coaches = [
    
    
    {
      id: 1,
      name: "IDOGBE TIMOTHY",
      role: "Elite Program Coach",
      category: "elite",
      image: "./coachTimothy.jpg",
      certifications: ["Strength & Conditioning"],
      experience: "7 years",
      specialization: "Elite Performance",
      bio: "Former player at crown Fc, Fc Ebede, FC osaka (Japan), Union Bank, First Bank, Shooting stars, and Bayelsc FC. Highest Goal Scorer at shooting. Bring 7+ years of top-level coaching experience ",
      achievements: [
        "Coached at professional academy level",
        "15+ players signed to professional clubs",
        "Elite coaching methodology expert"
      ],
      contact: {
        email: "Idogbe@nextproafrica.com",
        phone: "+2348039419590"
      }
    },
    {
      id: 5,
      name: "Adekola Opeyemi",
      role: "Technical Skills Coach",
      category: "technical",
      image: "./coachcrespo.jpg",
      certifications: ["Sports Science Degree", "Strength & Conditioning"],
      experience: "7+ years",
      specialization: "Technical Skills",
      bio: " Sport Science graduate (OAU) with a strong playing background across multiple clubs including Overcomer Fc , Knights FC, OAU Giants united. 7+ years of coaching experince",
      achievements: [
        "Technical skills program developer",
        "Youth development award winner"
      ],
      contact: {
        email: "Adekola@nextproafrica.com",
        phone: "+2340762840245"
      }
    },
    {
      id: 6,
      name: "Adejumo Amos",
      role: "Fitness & Conditioning Coach",
      category: "specialist",
      image: "./coachamos.jpg",
      certifications: [ "Coerver Coaching Method"],
      experience: "11 years",
      specialization: "Physical Conditioning",
      bio: "A highly experienced coach with 8+ years in player development, Former coach at Polytechnic Ibadan (Saki Campus and Eruwa Cammpus). Woked with top academics across Ibadan",
      achievements: [
        "Reduced player injuries by 40%",
        "Developed youth fitness protocols",
        "Sports science researcher"
      ],
      contact: {
        email: "Adejumonextproafrica.com",
        phone: "+2348026689737"
      }
    }
  ]

  const stats = [
    { icon: Award, label: "Combined Experience", value: "7+ Years" },
    { icon: Trophy, label: "matches Won", value: "25+" },
    { icon: Users, label: "Players Developed", value: "500+" },
    { icon: Star, label: "Professional Placements", value: "40+" }
  ]

  const philosophyPoints = [
    {
      icon: Target,
      title: "Individual Development",
      description: "Every player receives personalized attention and development plans tailored to their needs and goals."
    },
    {
      icon: Heart,
      title: "Passion for Teaching",
      description: "Our coaches are dedicated educators who love sharing their knowledge and inspiring the next generation."
    },
    {
      icon: Shield,
      title: "Safe Learning Environment",
      description: "Creating a positive, supportive atmosphere where players feel confident to learn and make mistakes."
    },
    {
      icon: Zap,
      title: "Continuous Innovation",
      description: "Staying current with the latest coaching techniques, tactics, and training methodologies."
    }
  ]

  const filteredCoaches = selectedCategory === 'all' 
    ? coaches 
    : coaches.filter(c => c.category === selectedCategory)

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-16 lg:py-20 overflow-hidden mb-19">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80" 
            alt="Our Coaches" 
            className="w-full h-full object-cover opacity-20"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
            <Users className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-500 tracking-wide">Our Team</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Meet Our Coaches
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Experienced, certified professionals dedicated to developing the next generation of football talent
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-yellow-600" />
                </div>
                <p className="text-3xl font-black text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Filter Section */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Filter Coaches</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-yellow-500 text-slate-900 shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Coaches
              </button>
              <button
                onClick={() => setSelectedCategory('senior')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === 'senior'
                    ? 'bg-yellow-500 text-slate-900 shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Senior Staff
              </button>
              <button
                onClick={() => setSelectedCategory('youth')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === 'youth'
                    ? 'bg-yellow-500 text-slate-900 shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Youth Coaches
              </button>
              <button
                onClick={() => setSelectedCategory('elite')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === 'elite'
                    ? 'bg-yellow-500 text-slate-900 shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Elite Coaches
              </button>
              <button
                onClick={() => setSelectedCategory('specialist')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === 'specialist'
                    ? 'bg-yellow-500 text-slate-900 shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Specialists
              </button>
            </div>
          </div>
        </section>

        {/* Coaches Grid */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCoaches.map((coach) => (
              <div
                key={coach.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
{/* Image - Passport Style */}
<div className="relative h-64 overflow-hidden bg-slate-100">
<img
  src={coach.image}
  alt={coach.name}
  className="w-full h-full object-cover object-top"
/>
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
  <div className="absolute bottom-4 left-4 right-4">
    <h3 className="text-2xl font-black text-white mb-1">{coach.name}</h3>
    <p className="text-yellow-400 font-semibold text-sm">{coach.role}</p>
  </div>
</div>
                {/* Content */}
                <div className="p-3">
                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {coach.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="bg-yellow-500/10 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Experience</p>
                      <p className="text-sm font-bold text-slate-900">{coach.experience}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Specialization</p>
                      <p className="text-sm font-bold text-slate-900">{coach.specialization}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {coach.bio}
                  </p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-slate-900 mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {coach.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-600">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact */}
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="h-4 w-4 text-yellow-600" />
                      <span className="text-xs">{coach.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="h-4 w-4 text-yellow-600" />
                      <span className="text-xs">{coach.contact.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coaching Philosophy */}
        <section className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-100 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Our Coaching Philosophy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide our coaching approach and player development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {philosophyPoints.map((point, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <point.icon className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{point.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </section>



        {/* CTA Section */}
        <section className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-8 lg:p-12 shadow-xl text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Train With the Best
          </h2>
          <p className="text-lg text-slate-800 max-w-2xl mx-auto mb-8">
            Join our academy and learn from experienced, certified coaches who are committed to your development
          </p>
          <button className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center space-x-2">
            <span>Start Your Journey Today</span>
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </section>
      </div>
    </div>
  )
}