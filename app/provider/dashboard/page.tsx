'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, DollarSign, Users, TrendingUp, LogOut, Clock, CheckCircle } from 'lucide-react';

export default function ProviderDashboard() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const auth = localStorage.getItem('providerAuth');
    if (!auth) {
      window.location.href = '/login';
    } else {
      setUserData(JSON.parse(auth));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('providerAuth');
    window.location.href = '/';
  };

  if (!userData) return null;

  const todayAppointments = [
    {
      id: 1,
      time: '9:00 AM',
      service: 'Full Grooming Package',
      pet: 'Max (Golden Retriever)',
      client: 'Sarah Johnson',
      address: '123 Main St, Los Angeles, CA',
      price: 75,
      duration: 90,
      status: 'upcoming'
    },
    {
      id: 2,
      time: '11:00 AM',
      service: 'Bath & Nail Trim',
      pet: 'Bella (Poodle)',
      client: 'Mike Chen',
      address: '456 Oak Ave, Los Angeles, CA',
      price: 55,
      duration: 60,
      status: 'completed'
    },
    {
      id: 3,
      time: '2:00 PM',
      service: 'Express Groom',
      pet: 'Charlie (Yorkie)',
      client: 'Emily Rodriguez',
      address: '789 Pine Rd, Los Angeles, CA',
      price: 45,
      duration: 45,
      status: 'upcoming'
    }
  ];

  const stats = [
    { label: 'Today\'s Revenue', value: '$175', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: 'Appointments Today', value: '3', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { label: 'This Week', value: '12', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { label: 'Total Clients', value: '45', icon: Users, color: 'from-orange-500 to-red-500' }
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
            <span className="text-sm text-gray-600 hidden md:block">{userData.businessName}</span>
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
                  JS
                </div>
                <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-sm text-gray-500">{userData.businessName}</p>
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Active Provider
                </div>
              </div>

              <nav className="space-y-2">
                <Link href="/provider/dashboard">
                  <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-600 hover:bg-blue-100">
                    <Calendar className="w-5 h-5 mr-3" />
                    Schedule
                  </Button>
                </Link>
                <Link href="/provider/clients">
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <Users className="w-5 h-5 mr-3" />
                    Clients
                  </Button>
                </Link>
                <Link href="/provider/earnings">
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <DollarSign className="w-5 h-5 mr-3" />
                    Earnings
                  </Button>
                </Link>
                <Link href="/provider/settings">
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <Calendar className="w-5 h-5 mr-3" />
                    Settings
                  </Button>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">Good Morning, {userData.name.split(' ')[0]}!</h1>
              <p className="text-xl text-blue-100 mb-6">You have {todayAppointments.length} appointments scheduled for today</p>
              <div className="flex items-center gap-2 text-blue-100">
                <MapPin className="w-5 h-5" />
                <span>Estimated drive time: 45 minutes</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Today's Schedule */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Today's Schedule</h2>
                <Button variant="outline" className="border-2">
                  View Calendar
                </Button>
              </div>

              <div className="space-y-4">
                {todayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className={`bg-white rounded-2xl shadow-lg border-2 p-6 hover:shadow-xl transition-all ${
                      apt.status === 'completed' ? 'border-green-200 bg-green-50/30' : 'border-gray-100'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Time Badge */}
                      <div className="flex-shrink-0">
                        <div className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center ${
                          apt.status === 'completed'
                            ? 'bg-green-100 border-2 border-green-300'
                            : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                        }`}>
                          {apt.status === 'completed' ? (
                            <>
                              <CheckCircle className="w-8 h-8 text-green-600 mb-1" />
                              <span className="text-xs font-semibold text-green-700">Completed</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-6 h-6 text-white mb-1" />
                              <span className="text-lg font-bold text-white">{apt.time}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-1">{apt.service}</h3>
                          <p className="text-lg text-gray-600">{apt.pet}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{apt.client}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{apt.duration} minutes</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 md:col-span-2">
                            <MapPin className="w-4 h-4" />
                            <span>{apt.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-3 flex-shrink-0">
                        <div className="text-right lg:text-center mb-2">
                          <div className="text-sm text-gray-500">Service Fee</div>
                          <div className="text-3xl font-bold text-blue-600">${apt.price}</div>
                        </div>
                        {apt.status === 'upcoming' ? (
                          <>
                            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 h-11 whitespace-nowrap">
                              Start Service
                            </Button>
                            <Button variant="outline" className="border-2 h-11">
                              View Details
                            </Button>
                          </>
                        ) : (
                          <Button variant="outline" className="border-2 h-11">
                            View Receipt
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all cursor-pointer">
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Block Time Off</h3>
                <p className="text-sm text-gray-600">Manage your availability</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all cursor-pointer">
                <MapPin className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Optimize Routes</h3>
                <p className="text-sm text-gray-600">Plan efficient travel</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all cursor-pointer">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">View Earnings</h3>
                <p className="text-sm text-gray-600">Track your income</p>
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
