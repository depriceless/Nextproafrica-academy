"use client"

import { useState, useEffect } from 'react'
import { ChevronRight, Play, X, ChevronLeft, Calendar, Tag, Image, Video, Download, Share2, Heart } from 'lucide-react'

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null)
  const [galleryVisible, setGalleryVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [likedItems, setLikedItems] = useState<number[]>([])

  const categories = [
    { id: 'all', label: 'All Media', count: 5 },
    { id: 'training', label: 'Training', count: 1 },
    { id: 'matches', label: 'Matches', count: 2 },
    { id: 'events', label: 'Events', count: 1 },
    { id: 'facilities', label: 'Facilities', count: 1 }
  ]

  const galleryItems = [
    { 
      id: 1, 
      type: 'image',
      url: '/match.jpg', 
      category: 'training', 
      title: 'Training Session',
      description: 'Professional training drills',
      date: 'October 8, 2025',
      tags: ['Skills', 'Training', 'Development']
    },
    { 
      id: 2, 
      type: 'image',
      url: '/matchii.jpg', 
      category: 'matches', 
      title: 'Match Day',
      description: 'Team in action',
      date: 'October 5, 2025',
      tags: ['Match', 'Competition', 'Team']
    },
    { 
      id: 3, 
      type: 'image',
      url: '/matchiii.jpg', 
      category: 'events', 
      title: 'Team Spirit',
      description: 'Building champions together',
      date: 'October 3, 2025',
      tags: ['Team', 'Spirit', 'Unity']
    },
    { 
      id: 4, 
      type: 'image', 
      url: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80', 
      category: 'facilities', 
      title: 'Training Ground', 
      description: 'State-of-the-art facilities',
      date: 'September 30, 2025',
      tags: ['Facilities', 'Infrastructure', 'Modern']
    },
    { 
      id: 5, 
      type: 'image', 
      url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80', 
      category: 'matches', 
      title: 'Victory Celebration', 
      description: 'Team celebrating tournament win',
      date: 'September 25, 2025',
      tags: ['Victory', 'Celebration', 'Trophy']
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setGalleryVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('gallery-grid')
    if (section) observer.observe(section)
    return () => { if (section) observer.unobserve(section) }
  }, [])

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const currentItem = selectedMedia ? galleryItems.find(item => item.id === selectedMedia) : null
  const currentIndex = selectedMedia ? galleryItems.findIndex(item => item.id === selectedMedia) : -1

  const handleNext = () => {
    if (currentIndex < galleryItems.length - 1) {
      setSelectedMedia(galleryItems[currentIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedMedia(galleryItems[currentIndex - 1].id)
    }
  }

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
              <Image className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-500 tracking-wide">Media Gallery</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Moments That Define Us
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-8">
              Explore our journey through captivating photos and videos - from intense training sessions to championship victories and memorable celebrations.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-slate-800 border-b border-slate-700 sticky top-0 z-30 backdrop-blur-lg bg-slate-800/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/30 scale-105'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white'
                  }`}
                >
                  {category.label}
                  <span className={`ml-2 text-xs ${activeCategory === category.id ? 'text-slate-900/70' : 'text-gray-500'}`}>
                    ({category.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-400">
            Showing <span className="text-white font-semibold">{filteredItems.length}</span> of {galleryItems.length} items
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Image className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No media found</h3>
              <p className="text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          ) : (
           <div 
  id="gallery-grid"
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
>
              {filteredItems.map((item, index) => {
                const delay = index * 100
                const isLiked = likedItems.includes(item.id)
                
                return (
                  <div
                    key={item.id}
                    className={`group relative bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                      galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ 
                      transitionDelay: `${delay}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                      opacity: 0
                    }}
                    onClick={() => setSelectedMedia(item.id)}
                  >
                   {/* Image/Video */}
                    <div className="relative aspect-[5/6] overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out bg-slate-900"
                        loading="lazy"
                      />
                      {/* Professional gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      
                      {/* Video Play Button */}
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-yellow-500/90 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                            <Play className="h-8 w-8 text-slate-900 ml-1" fill="currentColor" />
                          </div>
                        </div>
                      )}

                      {/* Hover content overlay */}
                      <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                          <p className="text-gray-300 text-sm">{item.description}</p>
                        </div>
                      </div>
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
                      </div>

                      {/* Date Badge */}
                      <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-slate-900/80 backdrop-blur-sm text-gray-300 px-3 py-1.5 rounded-full text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Professional border glow effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/60 rounded-2xl transition-all duration-500 pointer-events-none" />
                    
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && currentItem && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          {/* Close Button */}
          <button 
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors group"
          >
            <X className="h-6 w-6 group-hover:rotate-90 transition-transform" />
          </button>

          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {currentIndex < galleryItems.length - 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Content */}
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {currentItem.type === 'video' ? (
              <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                  title={currentItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                  className="w-full h-full"
                />
              </div>
            ) : (
              <img
                src={currentItem.url}
                alt={currentItem.title}
                className="w-full h-auto rounded-2xl shadow-2xl max-h-[80vh] object-contain"
              />
            )}

            {/* Media Info */}
            <div className="mt-6 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-yellow-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {currentItem.category}
                    </span>
                    <span className="flex items-center space-x-1 text-gray-400 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{currentItem.date}</span>
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {currentItem.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {currentItem.description}
                  </p>
                </div>
                <div className="text-gray-400 text-sm ml-4">
                  {currentIndex + 1} / {galleryItems.length}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {currentItem.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="flex items-center space-x-1 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-lg text-sm font-semibold"
                  >
                    <Tag className="h-3 w-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-yellow-500 to-yellow-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Want to Be Part of Our Story?
          </h2>
          <p className="text-lg text-slate-800 mb-8 max-w-2xl mx-auto">
            Join Nextpro Africa FA and create your own championship moments. Start your journey to becoming a professional footballer today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2">
              <span>Join Our Academy</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-white hover:bg-gray-100 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2">
              <span>Schedule a Visit</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}