import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Bell, CreditCard, Clock, TrendingUp, Star, Shield, Zap, Heart, CheckCircle2, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
              P
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Pawsome Grooming
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/services">
              <Button variant="ghost" className="hover:bg-blue-50">Services</Button>
            </Link>
            <Link href="/book">
              <Button variant="ghost" className="hover:bg-green-50">Book Appointment</Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full text-sm font-semibold text-blue-700">
              <Sparkles className="w-4 h-4" />
              Trusted by 500+ Pet Parents
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Premium Pet Grooming
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mt-2">
                At Your Doorstep
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Experience professional mobile grooming with our expert groomers. We bring the salon to you with premium products, personalized care, and stress-free service.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
              <div>
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600">Happy Pets</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">4.9★</div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Booking</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book" className="flex-1">
                <Button size="lg" className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 shadow-lg hover:shadow-xl transition-all">
                  Book Now
                </Button>
              </Link>
              <Link href="/services" className="flex-1">
                <Button size="lg" variant="outline" className="w-full h-14 text-lg font-semibold border-2 hover:bg-gray-50">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-green-400 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/hero-dog-grooming.jpg"
                alt="Professional dog grooming service"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <div>
                  <div className="font-bold text-gray-800">4.9/5.0</div>
                  <div className="text-xs text-gray-500">2,500+ Reviews</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-bold text-gray-800">Certified</div>
                  <div className="text-xs text-gray-500">Professional Groomers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Why Pet Parents Love Us
          </div>
          <h2 className="text-5xl font-extrabold mb-4">The Pawsome Difference</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're not just another grooming service. We're your pet's new best friend.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: 'Safety First',
              description: 'All groomers are certified, insured, and background-checked. Your pet safety is our top priority.',
              color: 'blue',
              gradient: 'from-blue-500 to-cyan-500'
            },
            {
              icon: Heart,
              title: 'Stress-Free Experience',
              description: 'No car rides or waiting rooms. Your pet stays comfortable in their favorite environment.',
              color: 'pink',
              gradient: 'from-pink-500 to-rose-500'
            },
            {
              icon: Sparkles,
              title: 'Premium Products',
              description: 'We use only the finest organic, hypoallergenic products that are gentle on sensitive skin.',
              color: 'purple',
              gradient: 'from-purple-500 to-indigo-500'
            }
          ].map((feature, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl"
                   style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))` }}></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-gray-200 h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl p-12 text-white shadow-2xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              For Business Owners
            </div>
            <h2 className="text-5xl font-extrabold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Powerful tools to streamline operations and grow your mobile grooming business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Calendar,
                title: 'Smart Scheduling',
                description: 'Intelligent booking system that prevents overlaps and optimizes your day'
              },
              {
                icon: MapPin,
                title: 'Route Optimization',
                description: 'Automatically calculate travel time and create the most efficient routes'
              },
              {
                icon: Bell,
                title: 'Auto Notifications',
                description: 'Automated SMS and email alerts keep customers informed in real-time'
              },
              {
                icon: CreditCard,
                title: 'Seamless Payments',
                description: 'Integrated Stripe payments with automated invoicing and receipts'
              },
              {
                icon: Clock,
                title: 'Live Updates',
                description: 'Drag-and-drop scheduling with instant recalculation of times'
              },
              {
                icon: TrendingUp,
                title: 'Business Analytics',
                description: 'Track revenue, retention, and performance with detailed insights'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all border border-white/20">
                <feature.icon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="opacity-90 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-yellow-700" />
            Testimonials
          </div>
          <h2 className="text-5xl font-extrabold mb-4">Loved by Pet Parents</h2>
          <p className="text-xl text-gray-600">See what our customers have to say</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah Johnson',
              pet: 'Max (Golden Retriever)',
              rating: 5,
              text: 'Absolutely incredible service! Max used to hate going to the groomer, but now he is excited when the van arrives. The convenience of mobile grooming is unbeatable.',
              image: '/images/testimonial-1.jpg'
            },
            {
              name: 'Mike Chen',
              pet: 'Luna (Poodle)',
              rating: 5,
              text: 'Professional, punctual, and so gentle with Luna. The quality of work is outstanding and the prices are very reasonable. Highly recommended!',
              image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
            },
            {
              name: 'Emily Rodriguez',
              pet: 'Charlie (Yorkie)',
              rating: 5,
              text: 'Best decision I made for Charlie! The groomer is patient, skilled, and clearly loves animals. Charlie looks and smells amazing after every session.',
              image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
            }
          ].map((review, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full">
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic flex-grow">&quot;{review.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-800">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.pet}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl p-12 md:p-16 text-white text-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Limited Time Offer
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
              Ready to Transform Your Pet Care?
            </h2>
            <p className="text-2xl mb-8 opacity-95 max-w-2xl mx-auto">
              Book your first appointment today and get 20% off! Experience the convenience of mobile grooming.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/book">
                <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all">
                  Book Your Appointment
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold bg-white/10 hover:bg-white/20 text-white border-2 border-white">
                  Start Your Business
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>No commitment required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/90 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Pawsome Grooming
              </span>
            </div>
            <p className="text-gray-600">&copy; 2025 Pawsome Grooming. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</Link>
              <Link href="/book" className="text-gray-600 hover:text-green-600 transition-colors">Book</Link>
              <Link href="/login" className="text-gray-600 hover:text-purple-600 transition-colors">Login</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
