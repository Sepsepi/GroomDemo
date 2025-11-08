'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, DollarSign, Users, LogOut, Phone, Mail, Search } from 'lucide-react';

export default function ClientsPage() {
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

  const clients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Los Angeles, CA 90028',
      pets: [{ name: 'Max', breed: 'Golden Retriever' }],
      totalBookings: 8,
      totalSpent: 620,
      lastVisit: '2025-10-28',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mchen@email.com',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, Los Angeles, CA 90028',
      pets: [{ name: 'Bella', breed: 'Poodle' }],
      totalBookings: 5,
      totalSpent: 375,
      lastVisit: '2025-10-15',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      phone: '(555) 345-6789',
      address: '789 Pine Rd, Los Angeles, CA 90028',
      pets: [{ name: 'Charlie', breed: 'Yorkie' }, { name: 'Lucy', breed: 'Yorkie' }],
      totalBookings: 12,
      totalSpent: 960,
      lastVisit: '2025-09-30',
      status: 'Active'
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
                  {userData.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-sm text-gray-500">{userData.businessName}</p>
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Active Provider
                </div>
              </div>

              <nav className="space-y-2">
                <Link href="/provider/dashboard">
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <Calendar className="w-5 h-5 mr-3" />
                    Schedule
                  </Button>
                </Link>
                <Link href="/provider/clients">
                  <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-600 hover:bg-blue-100">
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
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Client Management</h1>
              <p className="text-xl text-gray-600">View and manage your customer database</p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Clients</p>
                    <p className="text-3xl font-bold text-gray-800">{clients.length}</p>
                  </div>
                  <Users className="w-12 h-12 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Pets</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {clients.reduce((sum, c) => sum + c.pets.length, 0)}
                    </p>
                  </div>
                  <Calendar className="w-12 h-12 text-cyan-600" />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Lifetime Revenue</p>
                    <p className="text-3xl font-bold text-gray-800">
                      ${clients.reduce((sum, c) => sum + c.totalSpent, 0)}
                    </p>
                  </div>
                  <DollarSign className="w-12 h-12 text-green-600" />
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search clients by name, email, or phone..."
                className="h-14 pl-12 text-base border-2"
              />
            </div>

            {/* Client List */}
            <div className="space-y-4">
              {clients.map((client) => (
                <div key={client.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{client.name}</h3>
                        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mt-2">
                          {client.status}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{client.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 md:col-span-2">
                          <MapPin className="w-4 h-4" />
                          <span>{client.address}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {client.pets.map((pet, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                            {pet.name} ({pet.breed})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:items-end">
                      <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 text-center lg:text-right">
                        <div>
                          <p className="text-sm text-gray-500">Bookings</p>
                          <p className="text-xl font-bold text-gray-800">{client.totalBookings}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Spent</p>
                          <p className="text-xl font-bold text-green-600">${client.totalSpent}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Visit</p>
                          <p className="text-sm font-semibold text-gray-800">{client.lastVisit}</p>
                        </div>
                      </div>

                      <Button variant="outline" className="border-2 whitespace-nowrap">
                        View History
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
