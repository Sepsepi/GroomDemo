'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, User, CreditCard, Clock, LogOut, Menu } from 'lucide-react';

export default function CustomerDashboard() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const auth = localStorage.getItem('customerAuth');
    if (!auth) {
      window.location.href = '/signin';
    } else {
      setUserData(JSON.parse(auth));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customerAuth');
    window.location.href = '/';
  };

  if (!userData) return null;

  const upcomingAppointments = [
    {
      id: 1,
      service: 'Full Grooming Package',
      pet: 'Max (Golden Retriever)',
      petSize: 'Large',
      date: '2025-11-15',
      time: '10:00 AM',
      groomer: 'Sarah Johnson',
      address: '123 Main St, Los Angeles, CA 90028',
      price: 85,
      duration: '90 minutes',
      includes: ['Bath', 'Haircut', 'Nail Trim', 'Ear Cleaning', 'Teeth Brushing']
    },
    {
      id: 2,
      service: 'Bath & Nail Trim',
      pet: 'Bella (Poodle)',
      petSize: 'Medium',
      date: '2025-11-20',
      time: '2:00 PM',
      groomer: 'Mike Chen',
      address: '123 Main St, Los Angeles, CA 90028',
      price: 55,
      duration: '60 minutes',
      includes: ['Premium Bath', 'Nail Trimming', 'Paw Moisturizing']
    },
    {
      id: 3,
      service: 'Puppy Introduction',
      pet: 'Charlie (Yorkie)',
      petSize: 'Small',
      date: '2025-11-25',
      time: '11:00 AM',
      groomer: 'Emily Rodriguez',
      address: '123 Main St, Los Angeles, CA 90028',
      price: 40,
      duration: '45 minutes',
      includes: ['Gentle First Grooming', 'Light Trimming', 'Positive Reinforcement']
    }
  ];

  const pastAppointments = [
    {
      id: 4,
      service: 'Express Groom',
      pet: 'Max (Golden Retriever)',
      date: '2025-10-28',
      time: '3:00 PM',
      groomer: 'Sarah Johnson',
      price: 55,
      rating: 5
    },
    {
      id: 5,
      service: 'Full Grooming Package',
      pet: 'Bella (Poodle)',
      date: '2025-10-15',
      time: '1:00 PM',
      groomer: 'Mike Chen',
      price: 75,
      rating: 5
    },
    {
      id: 6,
      service: 'Bath & Nail Trim',
      pet: 'Max (Golden Retriever)',
      date: '2025-09-30',
      time: '10:00 AM',
      groomer: 'Sarah Johnson',
      price: 65,
      rating: 5
    }
  ];

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
            <Link href="/services">
              <Button variant="ghost">Services</Button>
            </Link>
            <Link href="/book">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">Book Appointment</Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  JD
                </div>
                <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>

              <nav className="space-y-2">
                <Link href="/dashboard">
                  <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-600 hover:bg-blue-100">
                    <Calendar className="w-5 h-5 mr-3" />
                    My Appointments
                  </Button>
                </Link>
                <Link href="/dashboard/pets">
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <User className="w-5 h-5 mr-3" />
                    My Pets
                  </Button>
                </Link>
                <Link href="/dashboard/payment">
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <CreditCard className="w-5 h-5 mr-3" />
                    Payment Methods
                  </Button>
                </Link>
                <Link href="/dashboard/settings">
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <User className="w-5 h-5 mr-3" />
                    Account Settings
                  </Button>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Welcome back, {userData.name.split(' ')[0]}!</h1>
              <p className="text-xl text-blue-100 mb-6">You have {upcomingAppointments.length} upcoming appointments</p>
              <Link href="/book">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold h-12">
                  Book New Appointment
                </Button>
              </Link>
            </div>

            {/* Upcoming Appointments */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Upcoming Appointments</h2>
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-8 h-8 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{apt.service}</h3>
                            <p className="text-gray-600 mb-3">For {apt.pet}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{apt.date} at {apt.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{apt.groomer}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Total</div>
                          <div className="text-2xl font-bold text-blue-600">${apt.price}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm" className="border-2">
                            Reschedule
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Appointments */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Past Appointments</h2>
              <div className="space-y-4">
                {pastAppointments.map((apt) => (
                  <div key={apt.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Clock className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{apt.service}</h3>
                          <p className="text-gray-600 mb-2">For {apt.pet}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{apt.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{apt.groomer}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Paid</div>
                          <div className="text-2xl font-bold text-gray-800">${apt.price}</div>
                        </div>
                        <Button variant="outline" className="border-2">
                          Book Again
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Pawsome Grooming. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
