"use client"

import { useState, useEffect } from 'react'
import { Shield, Scale, FileText, AlertTriangle, UserCheck, CreditCard, Ban, CheckCircle, Mail, Phone, MapPin, Calendar, ChevronRight, Users, BookOpen, Award, Gavel, Lock, RefreshCw } from 'lucide-react'

export default function TermsOfServicePage() {
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
    { id: 'acceptance', title: 'Acceptance of Terms', icon: FileText },
    { id: 'eligibility', title: 'Eligibility', icon: UserCheck },
    { id: 'registration', title: 'Registration & Enrollment', icon: Users },
    { id: 'fees-payment', title: 'Fees and Payment', icon: CreditCard },
    { id: 'code-of-conduct', title: 'Code of Conduct', icon: BookOpen },
    { id: 'intellectual-property', title: 'Intellectual Property', icon: Award },
    { id: 'liability', title: 'Limitation of Liability', icon: Shield },
    { id: 'termination', title: 'Termination', icon: Ban },
    { id: 'modifications', title: 'Modifications', icon: RefreshCw },
    { id: 'governing-law', title: 'Governing Law', icon: Gavel },
    { id: 'contact', title: 'Contact Information', icon: Mail }
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
              <Scale className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-500 tracking-wide">TERMS OF SERVICE</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Terms and Conditions
            </h1>
            
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Please read these terms carefully before using our services or enrolling in our academy programs.
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
                {/* Acceptance of Terms */}
                <div id="acceptance" data-section="acceptance" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Acceptance of Terms</h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Welcome to Nextpro Africa Football Academy ("Nextpro Africa FA," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our website, services, programs, and facilities.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      By accessing our website, enrolling in our programs, or using any of our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-sm text-gray-700">
                          <strong>Important:</strong> For participants under 18 years of age, a parent or legal guardian must review and accept these Terms on behalf of the minor.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Eligibility */}
                <div id="eligibility" data-section="eligibility" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Eligibility</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      To enroll in our academy programs, you must meet the following requirements:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Be within the age range specified for the program (typically 6-18 years old)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Have parental or guardian consent if under 18 years of age</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Provide accurate and complete registration information</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Have adequate health and fitness to participate in football training</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Comply with all academy rules and regulations</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      We reserve the right to verify eligibility and may request additional documentation at any time.
                    </p>
                  </div>
                </div>

                {/* Registration & Enrollment */}
                <div id="registration" data-section="registration" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Registration and Enrollment</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Application Process</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Enrollment in our academy programs requires completion of our application process, which may include:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-700">Submission of completed application forms</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-700">Attendance at trial sessions or assessments</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-700">Provision of medical clearance and health information</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-700">Payment of applicable fees</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-700">Signing of liability waivers and consent forms</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Account Responsibility</h3>
                      <p className="text-gray-700 leading-relaxed">
                        You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fees and Payment */}
                <div id="fees-payment" data-section="fees-payment" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-purple-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Fees and Payment</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-slate-50 rounded-xl p-6 border border-gray-200">
                      <h4 className="font-bold text-slate-900 mb-3">Program Fees</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        All program fees are outlined in our enrollment materials and must be paid according to the specified payment schedule. Fees may include:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-700 text-sm">Registration fees</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-700 text-sm">Training fees (monthly, quarterly, or annual)</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-700 text-sm">Equipment and uniform costs</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-700 text-sm">Tournament and competition fees</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-700 text-sm">Special event or camp fees</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 border border-gray-200">
                      <h4 className="font-bold text-slate-900 mb-3">Payment Terms</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">Payments must be made by the due date specified</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">Late payments may incur additional fees</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">Failed to pay may result in suspension from training</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">Refund policies are outlined in your enrollment agreement</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <p className="text-sm text-gray-700">
                        <strong>Refund Policy:</strong> Refunds are considered on a case-by-case basis. Generally, registration fees are non-refundable. Training fees may be partially refunded for medical emergencies or relocation, subject to approval.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Code of Conduct */}
                <div id="code-of-conduct" data-section="code-of-conduct" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Code of Conduct</h2>
                  </div>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      All participants, parents, and visitors are expected to adhere to our code of conduct:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                        <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
                        <h4 className="font-bold text-slate-900 mb-2">Respect</h4>
                        <p className="text-gray-700 text-sm">Show respect to coaches, staff, fellow players, and facilities</p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <Shield className="h-8 w-8 text-blue-600 mb-3" />
                        <h4 className="font-bold text-slate-900 mb-2">Safety</h4>
                        <p className="text-gray-700 text-sm">Follow all safety guidelines and use equipment properly</p>
                      </div>

                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                        <Users className="h-8 w-8 text-yellow-600 mb-3" />
                        <h4 className="font-bold text-slate-900 mb-2">Sportsmanship</h4>
                        <p className="text-gray-700 text-sm">Display good sportsmanship at all times, in victory and defeat</p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                        <AlertTriangle className="h-8 w-8 text-purple-600 mb-3" />
                        <h4 className="font-bold text-slate-900 mb-2">Zero Tolerance</h4>
                        <p className="text-gray-700 text-sm">No bullying, discrimination, violence, or substance abuse</p>
                      </div>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                      <div className="flex items-start">
                        <Ban className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-sm text-gray-700">
                          <strong>Violations:</strong> Any violation of our code of conduct may result in warnings, suspension, or permanent removal from the academy without refund.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Intellectual Property */}
                <div id="intellectual-property" data-section="intellectual-property" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                      <Award className="h-6 w-6 text-orange-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Intellectual Property</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      All content on our website and materials, including but not limited to text, graphics, logos, images, videos, training methodologies, and software, are the property of Nextpro Africa FA or our licensors and are protected by intellectual property laws.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission.
                    </p>
                    
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Media Release</h3>
                      <p className="text-gray-700 leading-relaxed">
                        By enrolling in our programs, you grant Nextpro Africa FA permission to use photographs, videos, and other media featuring participants for promotional, educational, and marketing purposes unless you explicitly opt out in writing.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Limitation of Liability */}
                <div id="liability" data-section="liability" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Limitation of Liability</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Football is a contact sport that carries inherent risks of injury. By participating in our programs, you acknowledge and accept these risks.
                    </p>
                    
                    <div className="bg-slate-50 rounded-xl p-6 border border-gray-200">
                      <h4 className="font-bold text-slate-900 mb-3">Waiver of Claims</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        Participants and their parents/guardians agree to waive claims against Nextpro Africa FA, its coaches, staff, and affiliates for:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-slate-600 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-700 text-sm">Injuries sustained during training or competitions</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-slate-600 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-700 text-sm">Loss or damage to personal property</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-slate-600 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-700 text-sm">Program cancellations due to weather or unforeseen circumstances</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-sm text-gray-700">
                          <strong>Insurance:</strong> Participants are strongly encouraged to maintain adequate health and accident insurance. The academy does not provide insurance coverage for participants.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Termination */}
                <div id="termination" data-section="termination" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                      <Ban className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Termination</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      We reserve the right to terminate or suspend access to our services and programs at any time, without prior notice, for conduct that we believe:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <Ban className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Violates these Terms of Service</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Ban className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Violates our code of conduct</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Ban className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Is harmful to other participants, staff, or the academy</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Ban className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Violates any applicable laws or regulations</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Ban className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Results from non-payment of fees</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      You may also terminate your enrollment by providing written notice according to the terms of your enrollment agreement.
                    </p>
                  </div>
                </div>

                {/* Modifications */}
                <div id="modifications" data-section="modifications" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <RefreshCw className="h-6 w-6 text-purple-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Modifications to Terms</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of any material changes by:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Posting the updated Terms on our website</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Sending an email notification to registered users</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Updating the "Last Updated" date at the top of this document</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Your continued use of our services after any modifications indicates your acceptance of the updated Terms. If you do not agree to the modified Terms, you must discontinue your use of our services.
                    </p>
                  </div>
                </div>

                {/* Governing Law */}
                <div id="governing-law" data-section="governing-law" className="mb-12 scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                      <Gavel className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Governing Law and Disputes</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions.
                    </p>
                    
                    <div className="bg-slate-50 rounded-xl p-6 border border-gray-200">
                      <h4 className="font-bold text-slate-900 mb-3">Dispute Resolution</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        Any disputes arising from these Terms or your use of our services shall be resolved through:
                      </p>
                      <ol className="space-y-2">
                        <li className="flex items-start space-x-3">
                          <span className="font-bold text-yellow-600 flex-shrink-0">1.</span>
                          <span className="text-gray-700 text-sm">Good faith negotiations between the parties</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="font-bold text-yellow-600 flex-shrink-0">2.</span>
                          <span className="text-gray-700 text-sm">Mediation, if negotiations fail</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="font-bold text-yellow-600 flex-shrink-0">3.</span>
                          <span className="text-gray-700 text-sm">Arbitration or litigation in Nigerian courts as a last resort</span>
                        </li>
                      </ol>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      You agree that any legal action or proceeding related to these Terms shall be brought exclusively in the courts located in Oyo State, Nigeria.
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div id="contact" data-section="contact" className="scroll-mt-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Contact Information</h2>
                  </div>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                        <Mail className="h-8 w-8 text-yellow-600 mb-4" />
                        <h4 className="font-bold text-slate-900 mb-2">Email</h4>
                        <a href="mailto:info@nextproafrica.com" className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">
                          Nextproafrica2025@gmail.com
                        </a>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <Phone className="h-8 w-8 text-blue-600 mb-4" />
                        <h4 className="font-bold text-slate-900 mb-2">Phone</h4>
                        <a href="tel:+2348034567890" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
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
                  </div>
                </div>
              </div>

              {/* Acknowledgment Box */}
              <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Scale className="h-6 w-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Acknowledgment</h3>
                    <p className="text-gray-300 leading-relaxed">
                      By using our services or enrolling in our programs, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These Terms constitute a legally binding agreement between you and Nextpro Africa Football Academy.
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
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Related Documents</h3>
            <p className="text-gray-600">Review our other policies and guidelines</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="/privacy-policy" className="group bg-slate-50 hover:bg-slate-100 rounded-xl p-6 border border-gray-200 hover:border-yellow-500 transition-all duration-300">
              <Lock className="h-8 w-8 text-yellow-600 mb-3" />
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">Privacy Policy</h4>
              <p className="text-gray-600 text-sm mb-3">Learn how we protect your personal information</p>
              <span className="text-yellow-600 text-sm font-semibold flex items-center">
                Read More <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a href="/code-of-conduct" className="group bg-slate-50 hover:bg-slate-100 rounded-xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300">
              <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Code of Conduct</h4>
              <p className="text-gray-600 text-sm mb-3">Our standards for behavior and sportsmanship</p>
              <span className="text-blue-600 text-sm font-semibold flex items-center">
                Read More <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a href="/enrollment" className="group bg-slate-50 hover:bg-slate-100 rounded-xl p-6 border border-gray-200 hover:border-green-500 transition-all duration-300">
              <Users className="h-8 w-8 text-green-600 mb-3" />
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">Enrollment Guide</h4>
              <p className="text-gray-600 text-sm mb-3">Step-by-step guide to joining our academy</p>
              <span className="text-green-600 text-sm font-semibold flex items-center">
                Get Started <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Join Us?
          </h3>
          <p className="text-gray-300 text-lg mb-8">
            Start your football journey with Nextpro Africa FA. Register today and become part of our family.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/register" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center space-x-2">
              <span>Register Now</span>
              <ChevronRight className="h-5 w-5" />
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