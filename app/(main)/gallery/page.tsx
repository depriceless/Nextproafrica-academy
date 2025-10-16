"use client"

import { useState, useEffect } from 'react'
import { ChevronRight, Play, X, ChevronLeft, Calendar, Tag, Image as ImageIcon, Video, Download, Share2, Heart } from 'lucide-react'

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null)
  const [galleryVisible, setGalleryVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')
  const [likedItems, setLikedItems] = useState<number[]>([])

  const categories = [
    { id: 'all', label: 'All Media', count: 24 },
    { id: 'training', label: 'Training Sessions', count: 8 },
    { id: 'matches', label: 'Matches', count: 6 },
    { id: 'events', label: 'Events', count: 5 },
    { id: 'facilities', label: 'Facilities', count: 3 },
    { id: 'celebrations', label: 'Celebrations', count: 2 }
  ]

  const galleryItems = [
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80',
      category: 'training',
      title: 'Elite Skill Development',
      description: 'Players mastering advanced ball control techniques during intensive training',
      date: 'October 8, 2025',
      tags: ['Skills', 'Youth', 'Training']
    },
    {
      id: 2,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
      category: 'matches',
      title: 'Championship Glory',
      description: 'U-17 team securing victory in the regional championship final',
      date: 'October 5, 2025',
      tags: ['Match', 'Championship', 'Victory']
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80',
      category: 'training',
      title: 'Tactical Formation Training',
      description: 'Team coordination and tactical awareness session with UEFA-certified coaches',
      date: 'October 3, 2025',
      tags: ['Tactics', 'Team', 'Coaching']
    },
    {
      id: 4,
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',
      category: 'events',
      title: 'Academy Graduation 2024',
      description: 'Celebrating our graduates moving to professional clubs',
      date: 'September 30, 2025',
      tags: ['Event', 'Graduation', 'Celebration']
    },
    {
      id: 5,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600&q=80',
      category: 'facilities',
      title: 'State-of-the-Art Training Ground',
      description: 'Our FIFA-standard training facilities with professional equipment',
      date: 'September 25, 2025',
      tags: ['Facilities', 'Infrastructure']
    },
    {
      id: 6,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80',
      category: 'celebrations',
      title: 'Tournament Champions',
      description: 'Victory celebration after winning the inter-state tournament',
      date: 'September 20, 2025',
      tags: ['Victory', 'Team', 'Trophy']
    },
    {
      id: 7,
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&q=80',
      category: 'training',
      title: 'Speed & Agility Training',
      description: 'High-intensity speed and agility drills for player development',
      date: 'September 15, 2025',
      tags: ['Training', 'Fitness', 'Development']
    },
    {
      id: 8,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80',
      category: 'matches',
      title: 'Derby Day Victory',
      description: 'Intense local derby match showcasing our tactical excellence',
      date: 'September 12, 2025',
      tags: ['Match', 'Derby', 'Competition']
    },
    {
      id: 9,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&q=80',
      category: 'training',
      title: 'Goalkeeper Specialized Training',
      description: 'Dedicated goalkeeper training with professional coaching staff',
      date: 'September 8, 2025',
      tags: ['Goalkeeper', 'Training', 'Specialist']
    },
    {
      id: 10,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=600&q=80',
      category: 'events',
      title: 'Open Day 2025',
      description: 'Prospective players and families experiencing our academy firsthand',
      date: 'September 5, 2025',
      tags: ['Event', 'Open Day', 'Community']
    },
    {
      id: 11,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80',
      category: 'facilities',
      title: 'Indoor Training Complex',
      description: 'All-weather indoor facilities for year-round training excellence',
      date: 'September 1, 2025',
      tags: ['Facilities', 'Indoor', 'Infrastructure']
    },
    {
      id: 12,
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1546608235-3310a2494cdf?w=600&q=80',
      category: 'matches',
      title: 'Season Highlights 2024/25',
      description: 'Best moments from our incredible championship-winning season',
      date: 'August 28, 2025',
      tags: ['Highlights', 'Season', 'Goals']
    },
    {
      id: 13,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80',
      category: 'training',
      title: 'Youth Academy Development',
      description: 'Young players building foundational skills in age-appropriate sessions',
      date: 'August 25, 2025',
      tags: ['Youth', 'Development', 'Basics']
    },
    {
      id: 14,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80',
      category: 'matches',
      title: 'Cup Final Triumph',
      description: 'Historic cup final victory securing our first major trophy',
      date: 'August 20, 2025',
      tags: ['Cup', 'Final', 'Trophy']
    },
    {
      id: 15,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80',
      category: 'events',
      title: 'Community Outreach Program',
      description: 'Engaging with local communities through football development initiatives',
      date: 'August 15, 2025',
      tags: ['Community', 'Outreach', 'Social']
    },
    {
      id: 16,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=600&q=80',
      category: 'training',
      title: 'Strength & Conditioning',
      description: 'Physical development program with professional fitness coaches',
      date: 'August 10, 2025',
      tags: ['Fitness', 'Strength', 'Conditioning']
    },
    {
      id: 17,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&q=80',
      category: 'facilities',
      title: 'Modern Gym Facilities',
      description: 'Fully-equipped gymnasium for player fitness and recovery',
      date: 'August 5, 2025',
      tags: ['Gym', 'Facilities', 'Equipment']
    },
    {
      id: 18,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',
      category: 'celebrations',
      title: 'End of Season Awards',
      description: 'Celebrating player achievements and outstanding performances',
      date: 'July 30, 2025',
      tags: ['Awards', 'Celebration', 'Achievement']
    },
    {
      id: 19,
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600&q=80',
      category: 'training',
      title: 'Shooting Technique Masterclass',
      description: 'Advanced shooting drills and finishing techniques with expert coaches',
      date: 'July 25, 2025',
      tags: ['Shooting', 'Technique', 'Masterclass']
    },
    {
      id: 20,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=600&q=80',
      category: 'matches',
      title: 'Youth League Champions',
      description: 'Our U-15 team celebrating their league championship victory',
      date: 'July 20, 2025',
      tags: ['Youth', 'League', 'Champions']
    },
    {
      id: 21,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&q=80',
      category: 'training',
      title: 'Pre-Season Preparation',
      description: 'Intensive pre-season training camp preparing for new challenges',
      date: 'July 15, 2025',
      tags: ['Pre-Season', 'Camp', 'Preparation']
    },
    {
      id: 22,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&q=80',
      category: 'events',
      title: 'International Friendly Tournament',
      description: 'Hosting teams from across Africa for friendly competition',
      date: 'July 10, 2025',
      tags: ['International', 'Tournament', 'Friendly']
    },
    {
      id: 23,
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80',
      category: 'matches',
      title: 'Best Goals of the Season',
      description: 'Compilation of the most spectacular goals from our players',
      date: 'July 5, 2025',
      tags: ['Goals', 'Highlights', 'Best']
    },
    {
      id: 24,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
      category: 'training',
      title: 'Evening Training Session',
      description: 'Sunset training session capturing the dedication of our players',
      date: 'July 1, 2025',
      tags: ['Training', 'Evening', 'Dedication']
    }
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
              <ImageIcon className="h-5 w-5 text-yellow-500" />
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

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">View:</span>
              <div className="flex bg-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                    viewMode === 'grid' ? 'bg-yellow-500 text-slate-900' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                    viewMode === 'masonry' ? 'bg-yellow-500 text-slate-900' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Masonry
                </button>
              </div>
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
                <ImageIcon className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No media found</h3>
              <p className="text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div 
              id="gallery-grid"
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
              }
            >
              {filteredItems.map((item, index) => {
                const delay = index * 50
                const isLiked = likedItems.includes(item.id)
                
                return (
                  <div
                    key={item.id}
                    className={`group relative bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer ${
                      galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    } ${viewMode === 'masonry' ? 'break-inside-avoid' : ''}`}
                    style={{ transitionDelay: `${delay}ms` }}
                    onClick={() => setSelectedMedia(item.id)}
                  >
                    {/* Image/Video */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      
                      {/* Video Play Button */}
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-yellow-500/90 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                            <Play className="h-8 w-8 text-slate-900 ml-1" fill="currentColor" />
                          </div>
                        </div>
                      )}

                      {/* Type Badge */}
                      <div className="absolute top-4 left-4 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold">
                        {item.type === 'video' ? <Video className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                        <span>{item.type.toUpperCase()}</span>
                      </div>

                      {/* Like Button */}
                      <button
                        onClick={(e) => toggleLike(item.id, e)}
                        className="absolute top-4 right-4 w-10 h-10 bg-slate-900/80 backdrop-blur-sm hover:bg-slate-900 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
                      >
                        <Heart 
                          className={`h-5 w-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`}
                        />
                      </button>

                      {/* Date Badge */}
                      <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-slate-900/80 backdrop-blur-sm text-gray-300 px-3 py-1.5 rounded-full text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="flex items-center space-x-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-xs font-semibold"
                          >
                            <Tag className="h-3 w-3" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/50 rounded-2xl transition-all duration-300 pointer-events-none" />
                  </div>
                )
              })}
            </div>
          )}

          {/* Load More Button */}
          {filteredItems.length > 0 && (
            <div className="mt-12 text-center">
              <button className="group bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2 mx-auto">
                <span>Load More Media</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && currentItem && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
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

          {/* Action Buttons */}
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
            <button 
              onClick={(e) => { e.stopPropagation(); toggleLike(currentItem.id, e); }}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <Heart 
                className={`h-5 w-5 transition-colors ${likedItems.includes(currentItem.id) ? 'fill-red-500 text-red-500' : ''}`}
              />
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <Download className="h-5 w-5" />
            </button>
          </div>

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
    </div>
  )
}