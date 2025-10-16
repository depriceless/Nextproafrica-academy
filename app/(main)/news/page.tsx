"use client"

import { useState } from 'react'
import { Calendar, Clock, User, ChevronRight, Tag, Search, Filter, Trophy, Star, Users, MapPin } from 'lucide-react'

export default function NewsEventsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const newsArticles = [
    {
      id: 1,
      title: "U-17 Team Wins Regional Championship",
      excerpt: "Our Under-17 squad dominated the regional championship, securing first place with an impressive 5-0 victory in the final match against fierce competitors.",
      content: "In a stunning display of skill and teamwork, our U-17 team has brought home the regional championship trophy...",
      image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
      category: "Achievement",
      date: "October 5, 2025",
      author: "Coach Michael Obi",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "New Certified Coaches Join Our Team",
      excerpt: "We're excited to announce the addition of three new CAF-certified coaches who bring extensive experience to our academy.",
      content: "Nextpro Africa FA continues to strengthen its coaching staff with the addition of three highly qualified professionals...",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
      category: "Announcement",
      date: "October 1, 2025",
      author: "Admin Team",
      readTime: "3 min read",
      featured: false
    },
    {
      id: 3,
      title: "Summer Training Camp Registration Open",
      excerpt: "Join our intensive summer training camp featuring advanced drills, match simulations, and guest appearances from professional players.",
      content: "Registration is now open for our highly anticipated summer training camp scheduled for December 2025...",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
      category: "Event",
      date: "September 28, 2025",
      author: "Academy Director",
      readTime: "4 min read",
      featured: true
    },
    {
      id: 4,
      title: "Partnership with Local Schools Announced",
      excerpt: "Nextpro Africa FA partners with 10 local schools to provide grassroots football training programs and identify young talent.",
      content: "We are thrilled to announce our partnership with 10 schools across Ibadan to expand access to quality football training...",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      category: "Announcement",
      date: "September 20, 2025",
      author: "Partnership Team",
      readTime: "4 min read",
      featured: false
    },
    {
      id: 5,
      title: "Alumni Spotlight: Success Stories",
      excerpt: "Meet five of our academy graduates who are now playing professionally in top Nigerian leagues and making their mark.",
      content: "Since our founding, we've been proud to see our graduates achieve their dreams of professional football...",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
      category: "Achievement",
      date: "September 15, 2025",
      author: "Media Team",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 6,
      title: "Facility Upgrade: New Training Equipment",
      excerpt: "State-of-the-art training equipment installed to enhance player development and provide professional-level training experiences.",
      content: "In our continued commitment to excellence, we've invested in cutting-edge training equipment...",
      image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80",
      category: "Announcement",
      date: "September 10, 2025",
      author: "Facilities Manager",
      readTime: "3 min read",
      featured: false
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Inter-Academy Tournament",
      description: "Compete against top academies from across the region in this prestigious tournament featuring U-15 and U-17 categories.",
      date: "November 15-17, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Nextpro Africa FA Stadium",
      category: "Tournament",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      spots: "Limited spots available"
    },
    {
      id: 2,
      title: "Professional Player Workshop",
      description: "Learn from the pros! Our special guest, a top Nigerian league player, will conduct an exclusive training session.",
      date: "November 25, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Training Ground A",
      category: "Workshop",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
      spots: "50 spots available"
    },
    {
      id: 3,
      title: "Parent Information Day",
      description: "Open house for prospective students and parents. Tour facilities, meet coaches, and learn about our programs.",
      date: "December 5, 2025",
      time: "2:00 PM - 6:00 PM",
      location: "Academy Main Hall",
      category: "Open House",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
      spots: "Open to all"
    },
    {
      id: 4,
      title: "Christmas Football Festival",
      description: "End the year with fun! Join us for our annual Christmas festival featuring matches, games, and prizes for all age groups.",
      date: "December 20, 2025",
      time: "12:00 PM - 8:00 PM",
      location: "Nextpro Africa FA Complex",
      category: "Festival",
      image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
      spots: "Open to all"
    }
  ]

  const categories = [
    { id: 'all', label: 'All Posts', count: newsArticles.length },
    { id: 'achievement', label: 'Achievements', count: newsArticles.filter(a => a.category === 'Achievement').length },
    { id: 'announcement', label: 'Announcements', count: newsArticles.filter(a => a.category === 'Announcement').length },
    { id: 'event', label: 'Events', count: newsArticles.filter(a => a.category === 'Event').length }
  ]

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Achievement": "bg-yellow-500",
      "Announcement": "bg-blue-500",
      "Event": "bg-green-500",
      "Tournament": "bg-purple-500",
      "Workshop": "bg-orange-500",
      "Open House": "bg-pink-500",
      "Festival": "bg-red-500"
    }
    return colors[category] || "bg-gray-500"
  }

  const filteredArticles = activeTab === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category.toLowerCase() === activeTab)

  const searchedArticles = filteredArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-16 lg:py-20 overflow-hidden mb-16">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&q=80" 
            alt="News & Events" 
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
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-500 tracking-wide">Stay Updated</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            News & Events
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Stay informed about the latest achievements, announcements, and upcoming events at Nextpro Africa FA
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news and events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors"
                />
              </div>
              <button className="flex items-center space-x-2 px-6 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-semibold">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === category.id
                      ? 'bg-yellow-500 text-slate-900 shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label} <span className="ml-1 text-sm">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {activeTab === 'all' && (
          <section className="mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center">
              <Trophy className="h-8 w-8 text-yellow-600 mr-3" />
              Featured Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {newsArticles.filter(a => a.featured).map((article) => (
                <div
                  key={article.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
                    <div className={`absolute top-4 left-4 ${getCategoryColor(article.category)} text-white px-4 py-1 rounded-full text-sm font-bold`}>
                      {article.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{article.author}</span>
                      </div>
                      <button className="text-yellow-600 font-bold text-sm flex items-center space-x-1 group-hover:space-x-2 transition-all">
                        <span>Read More</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Articles */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-6">
            {activeTab === 'all' ? 'All Posts' : categories.find(c => c.id === activeTab)?.label}
          </h2>
          
          {searchedArticles.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchedArticles.map((article) => (
                <div
                  key={article.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    <div className={`absolute top-4 left-4 ${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{article.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{article.author}</span>
                      </div>
                      <button className="text-yellow-600 font-semibold text-sm flex items-center space-x-1 group-hover:space-x-2 transition-all">
                        <span>Read</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Upcoming Events */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-slate-900 flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              Upcoming Events
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
                  <div className={`absolute top-4 left-4 ${getCategoryColor(event.category)} text-white px-4 py-1 rounded-full text-sm font-bold`}>
                    {event.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-green-600">{event.spots}</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2">
                    <span>Register Now</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-slate-900 rounded-2xl p-8 lg:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Never Miss an Update
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter and be the first to know about news, events, and opportunities at Nextpro Africa FA
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
              />
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}