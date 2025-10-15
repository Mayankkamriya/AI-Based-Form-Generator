'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import "./globals.css";
import { Sparkles, FileText, Zap, Shield, Users, ArrowRight, LogOut } from 'lucide-react';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">SmartForms Pro</span>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Dashboard
                </Link> */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Sign In
                </Link>
                {/* <Link
                  href="/signup"
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </Link> */}
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-6 py-16 lg:pt-12 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Powered by AI</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Create Forms with
                <span className="block bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  Natural Language
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Describe the form you want in plain English, and our AI will generate it instantly. 
                No more complex form builders or coding required.
              </p>
            
          <div className="flex flex-col sm:flex-row items-center lg:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <button
              onClick={() => router.push(isLoggedIn ? '/dashboard' : '/signup')}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center space-x-2"
            >
              <span>Start Creating Forms</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            {/* <Link
              href="/login"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-teal-600 hover:text-teal-600 transition-all duration-200"
            >
              View Demo
            </Link> */}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl font-bold text-teal-600">10K+</div>
                  <div className="text-sm text-gray-600">Forms Created</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600">5K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Demo */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-5 h-5 text-teal-600" />
                    <span className="font-semibold text-gray-900">Try It Now</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 italic">
                      "Create a contact form with name, email, phone, and message fields"
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Full Name</span>
                      <span className="text-xs text-gray-500">Text Input</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Email Address</span>
                      <span className="text-xs text-gray-500">Email Input</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Phone Number</span>
                      <span className="text-xs text-gray-500">Tel Input</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-3 border border-teal-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Message</span>
                      <span className="text-xs text-gray-500">Text Area</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-teal-600">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">Generated in 2 seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create professional forms in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Describe Your Form</h3>
                <p className="text-gray-600">
                  Simply type what you need in plain English. Our AI understands your requirements and context.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI Generates Form</h3>
                <p className="text-gray-600">
                  Watch as AI creates your form with smart field types, validation rules, and perfect structure.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Share & Collect</h3>
                <p className="text-gray-600">
                  Share your form instantly, collect responses, and manage submissions all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose SmartForms Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform the way you create forms with AI-powered automation and intelligent design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Generation</h3>
              <p className="text-gray-600">
                Simply describe your form in natural language and watch as AI creates the perfect form structure with appropriate fields and validation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                Generate complex forms in seconds, not hours. Our AI understands context and creates forms that match your exact requirements.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Fields</h3>
              <p className="text-gray-600">
                Automatically detects field types, adds validation rules, and suggests the best input methods for each piece of information.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Reliable</h3>
              <p className="text-gray-600">
                Built with enterprise-grade security. All form submissions are encrypted and stored safely with proper access controls.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Collaboration</h3>
              <p className="text-gray-600">
                Share forms with your team, collaborate on designs, and manage submissions together in one centralized platform.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-green-50 border border-teal-100">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Integration</h3>
              <p className="text-gray-600">
                Embed forms anywhere, integrate with your existing tools, and export data in multiple formats for seamless workflow integration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Only show when user is not logged in */}
      {!isLoggedIn && (
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Form Creation?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who are already creating forms faster and smarter with AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-teal-600 hover:text-teal-600 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      )}

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">SmartForms Pro</span>
          </div>
          <p className="text-gray-400 mb-6">
            The future of form creation is here. Powered by artificial intelligence.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <span>© 2025 SmartForms Pro. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
