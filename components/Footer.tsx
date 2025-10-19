"use client"

import { useState } from 'react'
import { Trophy, Facebook, Twitter, Instagram, Youtube, ChevronRight, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setTimeout(() => {
      setEmail('')
      setIsSubscribed(false)
    }, 3000)
  }

  const footerLinks = {
    academy: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Programs', href: '/programmes' },
      { label: 'Our Coaches', href: '/coaches' },
      { label: 'Gallery', href: '/gallery' }
    ],
    programs: [
      { label: 'Youth Development', href: '/programmes' },
      { label: 'Elite Training', href: '/programmes' },
      { label: 'Pro Pathway', href: '/programmes' }
    ],
    resources: [
      { label: 'News & Updates', href: '/news' },
      { label: 'Contact Us', href: '/contact' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' }
    ]
  }

  const achievements = [
   
  ]

  return (
    <footer className="relative bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Newsletter Section */}
        <div className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">Stay Updated</h3>
                <p className="text-gray-400">Subscribe to our newsletter for the latest news, training tips, and exclusive offers.</p>
              </div>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
                >
                  {isSubscribed ? 'Subscribed! ✓' : 'Subscribe Now'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Trophy className="h-7 w-7 text-slate-900" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">Nextpro Africa FA</h2>
                  <p className="text-xs text-yellow-500 font-bold">Elite Football Training</p>
                </div>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Nigeria's premier football academy dedicated to developing champions through world-class training and holistic development.
              </p>

              {/* Social Media */}
              <div className="flex space-x-3 mb-6">
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-yellow-500 transition rounded-lg flex items-center justify-center group">
                  <Facebook className="h-5 w-5 text-gray-400 group-hover:text-slate-900" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-yellow-500 transition rounded-lg flex items-center justify-center group">
                  <Twitter className="h-5 w-5 text-gray-400 group-hover:text-slate-900" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-yellow-500 transition rounded-lg flex items-center justify-center group">
                  <Instagram className="h-5 w-5 text-gray-400 group-hover:text-slate-900" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-yellow-500 transition rounded-lg flex items-center justify-center group">
                  <Youtube className="h-5 w-5 text-gray-400 group-hover:text-slate-900" />
                </a>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-400 hover:text-yellow-500 transition-colors">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">+234 803 456 7890</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 hover:text-yellow-500 transition-colors">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Nextproafrica2025@gmai.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">123 Sports Avenue, Ibadan, Nigeria</span>
                </div>
              </div>
            </div>

            {/* Academy Links */}
            <div>
              <h4 className="text-white font-bold text-base mb-4">Academy</h4>
              <ul className="space-y-3">
                {footerLinks.academy.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors text-sm flex items-center space-x-2 group">
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs Links */}
            <div>
              <h4 className="text-white font-bold text-base mb-4">Programs</h4>
              <ul className="space-y-3">
                {footerLinks.programs.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors text-sm flex items-center space-x-2 group">
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-white font-bold text-base mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors text-sm flex items-center space-x-2 group">
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-white font-bold text-base mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors text-sm flex items-center space-x-2 group">
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Nextpro Africa FA. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
          aria-label="Back to top"
        >
          <ChevronRight className="h-6 w-6 -rotate-90" />
        </button>
      </div>
    </footer>
  )
}