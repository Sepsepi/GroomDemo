'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, Briefcase, ArrowRight } from 'lucide-react';

export default function AuthChoicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Pawsome Grooming
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </nav>

      {/* Choice Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Welcome to Pawsome
            </h1>
            <p className="text-2xl text-gray-600">Choose how you'd like to continue</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Customer Option */}
            <Link href="/signin">
              <div className="group bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8 hover:shadow-2xl hover:border-blue-300 transition-all cursor-pointer h-full">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User className="w-12 h-12 text-white" />
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">I'm a Customer</h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Book grooming services for your pets
                    </p>
                  </div>

                  <div className="space-y-3 w-full">
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Book appointments online</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Manage your pets</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Track grooming history</span>
                    </div>
                  </div>

                  <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 text-lg font-semibold group-hover:shadow-lg transition-all">
                    Continue as Customer
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </Link>

            {/* Provider Option */}
            <Link href="/login">
              <div className="group bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8 hover:shadow-2xl hover:border-cyan-300 transition-all cursor-pointer h-full">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="w-12 h-12 text-white" />
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">I'm a Groomer</h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Manage your grooming business
                    </p>
                  </div>

                  <div className="space-y-3 w-full">
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span>Manage your schedule</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span>Track your earnings</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span>View client database</span>
                    </div>
                  </div>

                  <Button className="w-full h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-90 text-lg font-semibold group-hover:shadow-lg transition-all">
                    Continue as Provider
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth" className="text-blue-600 font-semibold hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Pawsome Grooming. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
