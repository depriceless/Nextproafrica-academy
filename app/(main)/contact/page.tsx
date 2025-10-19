"use client"

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, ChevronRight, Send, CheckCircle, AlertCircle, Facebook, Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Please fill in all required fields')
      }

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

      if (error) {
        throw error
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you soon.'
      })
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })

      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' })
      }, 5000)

    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Sports Avenue, Ring Road", "Ibadan, Oyo State, Nigeria"],
      color: "yellow"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+234 803 456 7890", "+234 805 123 4567"],
      color: "blue"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@nextproafrica.com", "admissions@nextproafrica.com"],
      color: "green"
    },
    {
      icon: Clock,
      title: "Training Schedule",
      details: ["Mon, Wed, Fri: 10:00 AM - 12:00 PM", "Saturday: 10:00 AM - 11:00 AM (Gym Session)"],
      color: "red"
    }
  ]

  const socialMedia = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://shrtlink.ai/NPA",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://clik.now/sHt6",
      color: "bg-pink-600 hover:bg-pink-700"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://clik.now/TVX2",
      color: "bg-sky-500 hover:bg-sky-600"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://clik.now/PSei",
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      name: "TikTok",
      icon: MessageCircle,
      url: "https://clik.now/4pFL",
      color: "bg-gray-900 hover:bg-black"
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/234803456789",
      color: "bg-green-600 hover:bg-green-700"
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      yellow: { bg: "bg-yellow-500/10", icon: "text-yellow-600" },
      blue: { bg: "bg-blue-500/10", icon: "text-blue-600" },
      green: { bg: "bg-green-500/10", icon: "text-green-600" },
      red: { bg: "bg-red-500/10", icon: "text-red-600" }
    }
    return colors[color]
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-16 lg:py-20 overflow-hidden mb-16">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80" 
            alt="Contact Us" 
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
            <Mail className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-500 tracking-wide">Contact Us</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Get In Touch
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Contact us via any of our channels.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
              <Send className="h-6 w-6 text-yellow-600" />
              <span>Send Us a Message</span>
            </h3>

            {/* Status Messages */}
            {submitStatus.type && (
              <div className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {submitStatus.message}
                  </p>
                </div>
                <button
                  onClick={() => setSubmitStatus({ type: null, message: '' })}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            )}
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="+234 800 000 0000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
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

              <p className="text-sm text-gray-500 text-center">
                We'll respond within 24 hours during business days
              </p>
            </div>
          </div>

          {/* Map and Contact Info */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126847.24537273698!2d3.8480038!3d7.3775399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103993a9dccbcb7f%3A0xf1b82e4076c716c5!2sIbadan%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Academy Location"
              />
            </div>

            {/* Contact Info Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const colors = getColorClasses(info.color)
                const Icon = info.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${colors.icon}`} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{info.title}</h4>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 lg:p-12 shadow-xl border border-yellow-500/10 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Follow Us On Social Media
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest news, events, and updates from Nextpro Africa FA
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {socialMedia.map((platform, index) => {
              const Icon = platform.icon
              return (
                <a
                  key={index}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${platform.color} text-white p-3 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                >
                  <Icon className="h-6 w-6" />
                </a>
              )
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              Connect with us on any platform for instant updates, behind-the-scenes content, and community engagement
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-100 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about our academy
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                question: "What age groups do you accept?",
                answer: "We accept players from ages 6-18 across our various programs, from youth development to elite training."
              },
              {
                question: "How do I register my child?",
                answer: "You can register by filling out the contact form above, calling us, visiting us on WhatsApp, or visiting our facility for a trial session."
              },
              {
                question: "What are the training schedules?",
                answer: "Training sessions run Monday, Wednesday, and Friday from 10:00 AM - 12:00 PM. We also have a Gym Session on Saturdays from 10:00 AM - 11:00 AM."
              },
              {
                question: "Do you provide equipment?",
                answer: "Basic training equipment is provided. Players need to bring their own boots, shin guards, and water bottles."
              },
              {
                question: "Are scholarships available?",
                answer: "Yes, we offer merit-based scholarships for talented players who demonstrate exceptional commitment and skill."
              },
              {
                question: "Can parents watch training?",
                answer: "Absolutely! We have a dedicated viewing area where parents can watch training sessions."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <h4 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Banner */}
      <section className="mt-16 bg-slate-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            Ready to Join Our Academy?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Take the first step towards your football dreams. Schedule a free trial session today!
          </p>
          <button className="group bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2 mx-auto">
            <span>Schedule Free Trial</span>
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  )
}