import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/mock-data';
import { Clock, Check, Sparkles, Heart, Award } from 'lucide-react';
import { ServiceImage } from '@/components/service-image';

export default function ServicesPage() {
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
          <div className="flex items-center space-x-4">
            <Link href="/book">
              <Button variant="ghost">Book Appointment</Button>
            </Link>
            <Link href="/login">
              <Button>Provider Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Premium Mobile Pet Grooming
          </div>
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Tailored Grooming Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We bring professional pet grooming directly to your doorstep. Every service is customized to your pet's unique needs with premium products and expert care.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={service.id} className="group relative">
              {/* Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Image with Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <ServiceImage
                    src={`/images/service-${index + 1}.jpg`}
                    alt={service.name}
                    serviceName={service.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Badge on Image */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-gray-800">{service.duration} min</span>
                  </div>

                  {/* Service Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl font-bold text-white mb-2">{service.name}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="p-6">
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-500 mb-3">Pricing by Pet Size</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="relative rounded-xl p-4 bg-blue-50 border-2 border-blue-200 transition-all hover:scale-105">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white rounded-full text-xs font-semibold text-blue-600 border border-blue-200">
                          Small
                        </div>
                        <div className="text-center mt-2">
                          <p className="text-2xl font-bold text-blue-600">${service.prices.small}</p>
                          <p className="text-xs text-gray-500 mt-1">0-20 lbs</p>
                        </div>
                      </div>
                      <div className="relative rounded-xl p-4 bg-blue-50 border-2 border-blue-300 transition-all hover:scale-105">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white rounded-full text-xs font-semibold text-blue-600 border border-blue-300">
                          Medium
                        </div>
                        <div className="text-center mt-2">
                          <p className="text-2xl font-bold text-blue-600">${service.prices.medium}</p>
                          <p className="text-xs text-gray-500 mt-1">20-50 lbs</p>
                        </div>
                      </div>
                      <div className="relative rounded-xl p-4 bg-blue-50 border-2 border-blue-400 transition-all hover:scale-105">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white rounded-full text-xs font-semibold text-blue-600 border border-blue-400">
                          Large
                        </div>
                        <div className="text-center mt-2">
                          <p className="text-2xl font-bold text-blue-600">${service.prices.large}</p>
                          <p className="text-xs text-gray-500 mt-1">50+ lbs</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Book Button */}
                  <Link href="/book" className="block">
                    <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 transition-all shadow-md hover:shadow-lg">
                      Book {service.name}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What's Included Section */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Service Details
            </div>
            <h2 className="text-4xl font-bold mb-4">What's Included</h2>
            <p className="text-gray-600 text-lg">Every service comes with premium care and attention to detail</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Full Grooming Package',
                items: [
                  'Professional bath with premium organic shampoo',
                  'Complete haircut and breed-specific styling',
                  'Precise nail trimming and smooth filing',
                  'Thorough ear cleaning and inspection',
                  'Gentle teeth brushing with pet-safe toothpaste',
                  'Sanitary trim for hygiene'
                ]
              },
              {
                title: 'Bath & Nail Trim',
                items: [
                  'Refreshing bath with aromatherapy option',
                  'Premium shampoo and conditioner treatment',
                  'Thorough blow-drying and brush out',
                  'Professional nail trimming and filing',
                  'Paw pad moisturizing',
                  'Light brush out and detangling'
                ]
              },
              {
                title: 'Express Groom',
                items: [
                  'Quick but thorough bathing session',
                  'Touch-up trim for maintenance',
                  'Nail trimming and filing',
                  'Face and paw area cleanup',
                  'Perfect for regular upkeep',
                  'Ideal for well-maintained coats'
                ]
              },
              {
                title: 'Puppy Introduction',
                items: [
                  'Gentle first grooming experience',
                  'Patience with lots of positive reinforcement',
                  'Light trimming and nail work',
                  'Introduction to grooming tools and sounds',
                  'Specifically for puppies under 6 months',
                  'Building trust and comfort'
                ]
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold mb-4 text-blue-700">{service.title}</h3>
                <ul className="space-y-3">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
          <div className="relative bg-white rounded-3xl p-12 shadow-xl border border-gray-100 max-w-3xl mx-auto">
            <Heart className="w-16 h-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Ready to Pamper Your Pet?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Book your appointment today and give your furry friend the premium grooming experience they deserve. We come to you!
            </p>
            <Link href="/book">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 transition-all shadow-lg hover:shadow-xl">
                Schedule an Appointment
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">Same-day appointments available | 100% satisfaction guaranteed</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Pawsome Grooming. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
