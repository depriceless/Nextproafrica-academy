"use client"

import { useState } from 'react'
import { Trophy, Menu, X, Facebook, Twitter, Instagram, Youtube, User, LogIn } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-slate-900 shadow-lg z-50">
      <div className="bg-slate-800 border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <p className="text-sm text-gray-400 font-medium">Official Site Nextpro Africa FA</p>
            <div className="flex items-center space-x-2">
              <a href="https://shrtlink.ai/NPA" className="w-8 h-8 bg-slate-700 hover:bg-yellow-500 transition rounded flex items-center justify-center">
                <Facebook className="h-4 w-4 text-white" />
              </a>
              <a href="https://clik.now/TVX2" className="w-8 h-8 bg-slate-700 hover:bg-yellow-500 transition rounded flex items-center justify-center">
                <Twitter className="h-4 w-4 text-white" />
              </a>
              <a href="https://clik.now/sHt6" className="w-8 h-8 bg-slate-700 hover:bg-yellow-500 transition rounded flex items-center justify-center">
                <Instagram className="h-4 w-4 text-white" />
              </a>
              <a href="https://clik.now/PSei" className="w-8 h-8 bg-slate-700 hover:bg-yellow-500 transition rounded flex items-center justify-center">
                <Youtube className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-8">
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
              <div className="w-14 h-14 rounded-lg overflow-hidden">
                <img src="/npalogo.png" alt="Nextpro Africa FA Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Nextpro Africa FA</h1>
                <p className="text-xs text-yellow-500 font-bold tracking-wide">Elite Football Training</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-end pr-8">
              <Link href="/" className="relative text-gray-300 hover:text-white transition font-semibold text-sm tracking-wide whitespace-nowrap group px-3 py-2">
                Home
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              
              <Link href="/about" className="relative text-gray-300 hover:text-white transition font-semibold text-sm tracking-wide whitespace-nowrap group px-3 py-2">
                About Us
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              
              <Link href="/programmes" className="relative text-gray-300 hover:text-white transition font-semibold text-sm tracking-wide whitespace-nowrap group px-3 py-2">
                Programmes
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              
              <Link href="/coaches" className="relative text-gray-300 hover:text-white transition font-semibold text-sm tracking-wide whitespace-nowrap group px-3 py-2">
                Our Coaches
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              
              <div className="relative group">
                <button className="relative text-gray-300 hover:text-white transition font-semibold flex items-center text-sm tracking-wide whitespace-nowrap px-3 py-2">
                  Academy
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
                
                <div className="absolute top-full left-0 mt-8 w-52 bg-slate-800 border border-yellow-500/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link href="/news" className="block px-5 py-3 text-base text-gray-300 hover:text-white hover:bg-slate-700 transition-colors rounded-t-lg font-medium">
                    News & Events
                  </Link>
                  <Link href="/players" className="block px-5 py-3 text-base text-gray-300 hover:text-white hover:bg-slate-700 transition-colors font-medium">
                    Players
                  </Link>
                  <Link href="/gallery" className="block px-5 py-3 text-base text-gray-300 hover:text-white hover:bg-slate-700 transition-colors font-medium">
                    Gallery
                  </Link>
                  <Link href="/blog" className="block px-5 py-3 text-base text-gray-300 hover:text-white hover:bg-slate-700 transition-colors rounded-b-lg font-medium">
                    Blog
                  </Link>
                </div>
              </div>
              
              <Link href="/contact" className="relative text-gray-300 hover:text-white transition font-semibold text-sm tracking-wide whitespace-nowrap group px-3 py-2">
                Contact Us
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </nav>

            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0 ml-auto -mr-30">
              <Link 
                href="/auth"
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link 
                href="/auth/signup"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span>Join Academy</span>
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-yellow-500 transition"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-800 border-t border-yellow-500/20">
          <nav className="px-4 py-6 space-y-2">
            <Link href="/" className="block text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all font-semibold py-3 px-4 rounded-lg text-base" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" className="block text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all font-semibold py-3 px-4 rounded-lg text-base" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/programmes" className="block text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all font-semibold py-3 px-4 rounded-lg text-base" onClick={() => setMobileMenuOpen(false)}>Programmes</Link>
            <Link href="/coaches" className="block text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all font-semibold py-3 px-4 rounded-lg text-base" onClick={() => setMobileMenuOpen(false)}>Our Coaches</Link>
            
            <div className="border-t border-yellow-500/20 pt-2 mt-2">
              <p className="text-yellow-500 font-bold px-4 py-2 text-base">Academy</p>
              <Link href="/news" className="block text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all font-medium py-3 px-4 rounded-lg ml-4 text-base" onClick={() => setMobileMenuOpen(false)}>News & Events</Link>
              <Link href="/players" className="block text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all font-medium py-3 px-4 rounded-lg ml-4 text-base" onClick={() => setMobileMenuOpen(false)}>Players</Link>
              <Link href="/gallery" className="block text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all font-medium py-3 px-4 rounded-lg ml-4 text-base" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
              <Link href="/blog" className="block text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all font-medium py-3 px-4 rounded-lg ml-4 text-base" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            </div>
            
            <Link href="/contact" className="block text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all font-semibold py-3 px-4 rounded-lg text-base" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
            
            <div className="border-t border-yellow-500/20 pt-4 mt-4 space-y-2">
              <Link 
                href="/auth"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all border border-white/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link 
                href="/auth/signup"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 rounded-lg font-semibold transition-all shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Sign Up</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}