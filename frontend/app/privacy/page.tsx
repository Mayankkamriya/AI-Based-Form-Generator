'use client';

import Link from 'next/link';
import { Shield, Sparkles } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <nav className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">SmartForms Pro</span>
          </Link>
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600 mt-2">Last updated: October 15, 2025</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed">
                We collect information that you provide directly to us when you create an account, use our services, 
                or communicate with us. This includes your name, email address, and any content you create or submit 
                through our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. All form submissions are encrypted 
                and stored securely with proper access controls.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed">
                We use AI services to generate forms based on your prompts and cloud storage services for file uploads. 
                These services have their own privacy policies and we encourage you to review them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Correct or update your information</li>
                <li>Delete your account and associated data</li>
                <li>Object to processing of your personal data</li>
                <li>Export your data in a portable format</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us 
                through our support channels.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <Link
                href="/terms"
                className="text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
              >
                View Terms of Service →
              </Link>
              <Link
                href="/"
                className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
