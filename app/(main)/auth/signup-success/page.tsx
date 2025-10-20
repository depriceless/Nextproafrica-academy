
"use client"

import { CheckCircle, Mail, Home } from 'lucide-react'
import Link from 'next/link'

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-2xl w-full">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-12 shadow-2xl border border-slate-700/50 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 shadow-lg shadow-green-500/30 animate-bounce">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-black text-white mb-4">Registration Successful!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Welcome to Nextpro Africa Football Academy
          </p>

          {/* Information Box */}
          <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-6 mb-8 text-left">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">What&apos;s Next?</h3>
                <div className="space-y-3 text-gray-300 text-sm">
                
                    <span className="inline-block w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="text-yellow-500 font-bold">1</span>
                    </span>
                         <span>We&apos;ve sent a verification email to your inbox. Please check and verify your email address.</span>
                 <p className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="text-yellow-500 font-bold">2</span>
                    </span>
                    <span>You can then log in to your player portal to access training schedules, videos, and more!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8">
            <p className="text-sm text-blue-400">
              <strong>Questions?</strong> Contact us at{' '}
              <a href="mailto:Nextproafrica2025@gmail.com" className="underline hover:text-blue-300">
                Nextproafrica2025@gmail.com
              </a>
              {' '}or call <strong>+234 803 456 7890</strong>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all"
            >
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
              <Link href="/auth" 
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>Go to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}






