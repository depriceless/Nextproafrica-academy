"use client"

import { useState, useEffect } from 'react'
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin, CheckCircle, AlertCircle, Users, Database, Cookie, Share2, Settings, Calendar, ChevronRight } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('')
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    setHeaderVisible(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]')
      let currentSection = ''

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.getAttribute('data-section') || ''
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', icon: FileText },
    { id: 'information-we-collect', title: 'Information We Collect', icon: Database },
    { id: 'how-we-use', title: 'How We Use Your Information', icon: Settings },
    { id: 'data-sharing', title: 'Data Sharing and Disclosure', icon: Share2 },
    { id: 'data-security', title: 'Data Security', icon: Lock },
    { id: 'your-rights', title: 'Your Rights', icon: Shield },
    { id: 'cookies', title: 'Cookies and Tracking', icon: Cookie },
    { id: 'childrens-privacy', title: "Children's Privacy", icon: Users },
    { id: 'changes', title: 'Changes to This Policy', icon: AlertCircle },
    { id: 'contact', title: 'Contact Us', icon: Mail }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-slate-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
              <Shield className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-500 tracking-wide">PRIVACY POLICY</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Your Privacy Matters to Us
            </h1>
            
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              At Nextpro Africa FA, we are committed to protecting your personal information and your right to privacy.
            </p>

            <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Last Updated: October 11, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Table of Contents - Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Table of Contents</h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                          activeSection === item.id
                            ? 'bg-yellow-500 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="line-clamp-1">{item.title}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-12">
                {/* Introduction */}
                <div id="introduction" data-section="introduction" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Introduction</h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Welcome to Nextpro Africa Football Academy ("Nextpro Africa FA," "we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with our academy.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
                    </p>
                  </div>
                </div>

                {/* Information We Collect */}
                <div id="information-we-collect" data-section="information-we-collect" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Database className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Information We Collect</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Personal Information</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        We may collect personal information that you voluntarily provide to us when you:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Register for our academy programs or trials</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Fill out contact forms or inquiry forms</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Subscribe to our newsletter or communications</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Attend our events or training sessions</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Communicate with us via email, phone, or social media</span>
                        </li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        This information may include: name, email address, phone number, date of birth, address, emergency contact information, medical information (for player safety), payment information, photographs and videos, and any other information you choose to provide.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Automatically Collected Information</h3>
                      <p className="text-gray-700 leading-relaxed">
                        When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device. We may also collect information about your browsing actions and patterns.
                      </p>
                    </div>
                  </div>
                </div>

                {/* How We Use Your Information */}
                <div id="how-we-use" data-section="how-we-use" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <Settings className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">How We Use Your Information</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      We use the information we collect or receive to:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700">Provide, operate, and maintain our academy services and programs</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700">Process registrations, payments, and enrollment applications</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700">Communicate with you about academy activities, schedules, and updates</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700">Send newsletters, promotional materials, and marketing communications</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700">Improve our website, services, and training programs</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700">Ensure player safety and provide appropriate medical care when necessary</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700">Create promotional content featuring players (with appropriate consent)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700">Comply with legal obligations and protect our legal rights</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Data Sharing */}
                <div id="data-sharing" data-section="data-sharing" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <Share2 className="h-6 w-6 text-purple-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Data Sharing and Disclosure</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      We may share your information in the following situations:
                    </p>
                    <div className="space-y-4">
                      <div className="bg-slate-50 rounded-xl p-6 border border-gray-200">
                        <h4 className="font-bold text-slate-900 mb-2">Service Providers</h4>
                        <p className="text-gray-700 text-sm">
                          We may share your information with third-party service providers who perform services on our behalf, such as payment processing, email delivery, hosting services, and marketing assistance.
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-6 border border-gray-200">
                        <h4 className="font-bold text-slate-900 mb-2">Partner Organizations</h4>
                        <p className="text-gray-700 text-sm">
                          With your consent, we may share player information with partner football clubs, scouts, and educational institutions for player development opportunities.
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-6 border border-gray-200">
                        <h4 className="font-bold text-slate-900 mb-2">Legal Requirements</h4>
                        <p className="text-gray-700 text-sm">
                          We may disclose your information when required by law or to protect our rights, property, or safety, or that of our users or the public.
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-6 border border-gray-200">
                        <h4 className="font-bold text-slate-900 mb-2">Business Transfers</h4>
                        <p className="text-gray-700 text-sm">
                          In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Security */}
                <div id="data-security" data-section="data-security" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                      <Lock className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Data Security</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <Lock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Encryption of sensitive data during transmission</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Lock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Secure servers and data storage systems</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Lock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Regular security assessments and updates</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Lock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Limited access to personal information by authorized personnel only</span>
                      </li>
                    </ul>
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-sm text-gray-700">
                          However, please note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Your Rights */}
                <div id="your-rights" data-section="your-rights" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Your Rights</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Depending on your location, you may have certain rights regarding your personal information:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                        <Eye className="h-8 w-8 text-yellow-600 mb-3" />
                        <h4 className="font-bold text-slate-900 mb-2">Access</h4>
                        <p className="text-gray-700 text-sm">Request access to your personal information</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <Settings className="h-8 w-8 text-blue-600 mb-3" />
                        <h4 className="font-bold text-slate-900 mb-2">Correction</h4>
                        <p className="text-gray-700 text-sm">Request correction of inaccurate data</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                        <Database className="h-8 w-8 text-green-600 mb-3" />
                        <h4 className="font-bold text-slate-900 mb-2">Deletion</h4>
                        <p className="text-gray-700 text-sm">Request deletion of your personal information</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                        <Share2 className="h-8 w-8 text-purple-600 mb-3" />
                        <h4 className="font-bold text-slate-900 mb-2">Portability</h4>
                        <p className="text-gray-700 text-sm">Request transfer of your data</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below.
                    </p>
                  </div>
                </div>

                {/* Cookies */}
                <div id="cookies" data-section="cookies" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                      <Cookie className="h-6 w-6 text-orange-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Cookies and Tracking Technologies</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with small amounts of data that are sent to your browser from a website and stored on your device.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      We use both session and persistent cookies for the following purposes:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2" />
                        <span className="text-gray-700">To enable certain functions of the website</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2" />
                        <span className="text-gray-700">To provide analytics and track website usage</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2" />
                        <span className="text-gray-700">To store your preferences and settings</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2" />
                        <span className="text-gray-700">To enhance security and prevent fraud</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                    </p>
                  </div>
                </div>

                {/* Children's Privacy */}
                <div id="childrens-privacy" data-section="childrens-privacy" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Children's Privacy</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Our academy serves children and minors under the age of 18. We take the privacy of children seriously and comply with applicable laws regarding children's privacy protection.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      When we collect personal information from children, we do so with parental or guardian consent. Parents and guardians have the right to:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Review their child's personal information</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Request deletion of their child's personal information</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Refuse further collection or use of their child's information</span>
                      </li>
                    </ul>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                      <p className="text-sm text-gray-700">
                        <strong>Important:</strong> Parents or guardians must provide consent for minors to participate in our programs. We will not knowingly collect personal information from children without appropriate parental consent.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Changes to Policy */}
                <div id="changes" data-section="changes" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-purple-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Changes to This Privacy Policy</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      We may update this Privacy Policy from time to time. When we make changes, we will update the "Last Updated" date at the top of this policy. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      If we make material changes to this Privacy Policy, we will notify you either through the email address you have provided us or by placing a prominent notice on our website prior to the change becoming effective.
                    </p>
                  </div>
                </div>

                {/* Contact Us */}
                <div id="contact" data-section="contact" className="scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Contact Us</h2>
                  </div>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                        <Mail className="h-8 w-8 text-yellow-600 mb-4" />
                        <h4 className="font-bold text-slate-900 mb-2">Email</h4>
                        <a href="mailto:privacy@nextproafrica.com" className="text-yellow-600 hover:text-yellow-700 font-medium">
                          Nextproafrica2025@gmail.com
                        </a>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <Phone className="h-8 w-8 text-blue-600 mb-4" />
                        <h4 className="font-bold text-slate-900 mb-2">Phone</h4>
                        <a href="tel:+2348034567890" className="text-blue-600 hover:text-blue-700 font-medium">
                          +234 803 456 7890
                        </a>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                        <MapPin className="h-8 w-8 text-green-600 mb-4" />
                        <h4 className="font-bold text-slate-900 mb-2">Address</h4>
                        <p className="text-gray-700 text-sm">
                          123 Sports Avenue<br />
                          Ring Road, Ibadan<br />
                          Oyo State, Nigeria
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 border border-gray-200 mt-6">
                      <h4 className="font-bold text-slate-900 mb-3">Data Protection Officer</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        For specific data protection inquiries, you may also contact our Data Protection Officer:
                      </p>
                      <p className="text-gray-700 text-sm">
                        <strong>Email:</strong> <a href="mailto:dpo@nextproafrica.com" className="text-blue-600 hover:text-blue-700">dpo@nextproafrica.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information Box */}
              <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Your Privacy is Important to Us</h3>
                    <p className="text-gray-300 leading-relaxed">
                      At Nextpro Africa FA, we are committed to maintaining the trust and confidence of all our players, parents, and partners. We handle your personal information with the utmost care and in accordance with applicable data protection laws.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Related Policies</h3>
            <p className="text-gray-600">Learn more about our policies and terms</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="/terms" className="group bg-slate-50 hover:bg-slate-100 rounded-xl p-6 border border-gray-200 hover:border-yellow-500 transition-all duration-300">
              <FileText className="h-8 w-8 text-yellow-600 mb-3" />
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">Terms of Service</h4>
              <p className="text-gray-600 text-sm mb-3">Our terms and conditions for using our services</p>
              <span className="text-yellow-600 text-sm font-semibold flex items-center">
                Read More <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a href="/cookie-policy" className="group bg-slate-50 hover:bg-slate-100 rounded-xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300">
              <Cookie className="h-8 w-8 text-blue-600 mb-3" />
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Cookie Policy</h4>
              <p className="text-gray-600 text-sm mb-3">How we use cookies and tracking technologies</p>
              <span className="text-blue-600 text-sm font-semibold flex items-center">
                Read More <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a href="/contact" className="group bg-slate-50 hover:bg-slate-100 rounded-xl p-6 border border-gray-200 hover:border-green-500 transition-all duration-300">
              <Mail className="h-8 w-8 text-green-600 mb-3" />
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">Contact Us</h4>
              <p className="text-gray-600 text-sm mb-3">Get in touch with our team for any inquiries</p>
              <span className="text-green-600 text-sm font-semibold flex items-center">
                Contact <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-300 text-lg mb-8">
            Our team is here to help. Contact us anytime with your privacy concerns or questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center space-x-2">
              <span>Contact Support</span>
              <Mail className="h-5 w-5" />
            </a>
            <a href="/" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 border border-white/20 hover:border-white/40 inline-flex items-center">
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}