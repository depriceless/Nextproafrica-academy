"use client"

import { useState } from 'react'
import { Award, Users, Trophy, Target, Star, Shield, Heart, Zap, Mail, Phone, CheckCircle2, ChevronRight } from 'lucide-react'

export default function CoachesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const coaches = [
    
    
    {
      id: 4,
      name: "Chidi Nwankwo",
      role: "Elite Program Coach",
      category: "elite",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      certifications: ["CAF License A", "Strength & Conditioning"],
      experience: "12 years",
      specialization: "Elite Performance",
      bio: "Works with advanced players preparing for professional careers. Focus on high-level tactics, mental strength, and physical conditioning.",
      achievements: [
        "Coached at professional academy level",
        "15+ players signed to professional clubs",
        "Elite coaching methodology expert"
      ],
      contact: {
        email: "chidi@nextproafrica.com",
        phone: "+234 807 345 6789"
      }
    },
    {
      id: 5,
      name: "Fatima Ibrahim",
      role: "Technical Skills Coach",
      category: "technical",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
      certifications: ["CAF License B", "Coerver Coaching Method"],
      experience: "9 years",
      specialization: "Technical Skills",
      bio: "Specialist in developing individual technical abilities. Expert in ball mastery, dribbling techniques, and one-on-one situations.",
      achievements: [
        "Technical skills program developer",
        "Coerver coaching certified",
        "Youth development award winner"
      ],
      contact: {
        email: "fatima@nextproafrica.com",
        phone: "+234 808 456 7890"
      }
    },
    {
      id: 6,
      name: "David Thompson",
      role: "Fitness & Conditioning Coach",
      category: "specialist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
      certifications: ["Sports Science Degree", "Strength & Conditioning"],
      experience: "11 years",
      specialization: "Physical Conditioning",
      bio: "Expert in sports science and athletic development. Designs age-appropriate conditioning programs to enhance performance and prevent injuries.",
      achievements: [
        "Reduced player injuries by 40%",
        "Developed youth fitness protocols",
        "Sports science researcher"
      ],
      contact: {
        email: "david@nextproafrica.com",
        phone: "+234 809 567 8901"
      }
    }
  ]

  const stats = [
    { icon: Award, label: "Combined Experience", value: "65+ Years" },
    { icon: Trophy, label: "Championships Won", value: "25+" },
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
      <section className="relative bg-slate-900 py-16 lg:py-20 overflow-hidden mb-16">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80" 
            alt="Our Coaches" 
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
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-yellow-500/20 to-blue-500/20">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-black text-white mb-1">{coach.name}</h3>
                    <p className="text-yellow-400 font-semibold text-sm">{coach.role}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
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

        {/* Qualifications Section */}
        <section className="bg-slate-900 rounded-2xl p-8 lg:p-12 shadow-xl relative overflow-hidden mb-16">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                World-Class Certifications
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Our coaches hold prestigious qualifications from leading football organizations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">UEFA Licenses</h3>
                <p className="text-gray-400 text-sm">
                  European coaching certifications from UEFA's comprehensive coaching pathway
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">CAF Certifications</h3>
                <p className="text-gray-400 text-sm">
                  African football confederation coaching qualifications and licenses
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Specialized Training</h3>
                <p className="text-gray-400 text-sm">
                  Additional certifications in sports science, psychology, and specialized coaching
                </p>
              </div>
            </div>
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