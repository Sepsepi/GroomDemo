'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, LogOut, User, CreditCard, Plus, Edit, Trash2 } from 'lucide-react';

export default function PetsPage() {
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

  const pets = [
    {
      id: 1,
      name: 'Max',
      breed: 'Golden Retriever',
      size: 'Large',
      weight: '75 lbs',
      age: '5 years',
      color: 'Golden',
      notes: 'Friendly, loves treats. Sensitive around ears.',
      lastGroomed: '2025-10-28',
      vaccinations: 'Up to date',
      photo: null
    },
    {
      id: 2,
      name: 'Bella',
      breed: 'Poodle',
      size: 'Medium',
      weight: '35 lbs',
      age: '3 years',
      color: 'White',
      notes: 'Nervous around clippers. Prefers gentle handling.',
      lastGroomed: '2025-10-15',
      vaccinations: 'Up to date',
      photo: null
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
                  {userData.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>

              <nav className="space-y-2">
                <Link href="/dashboard">
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <Calendar className="w-5 h-5 mr-3" />
                    My Appointments
                  </Button>
                </Link>
                <Link href="/dashboard/pets">
                  <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-600 hover:bg-blue-100">
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
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">My Pets</h1>
                <p className="text-xl text-gray-600">Manage your pet profiles and grooming preferences</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">
                <Plus className="w-5 h-5 mr-2" />
                Add New Pet
              </Button>
            </div>

            {/* Pet Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {pets.map((pet) => (
                <div key={pet.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <User className="w-10 h-10 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{pet.name}</h3>
                        <p className="text-gray-600">{pet.breed}</p>
                        <div className="mt-2 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {pet.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-red-50 text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Weight:</span>
                        <p className="font-semibold text-gray-800">{pet.weight}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Age:</span>
                        <p className="font-semibold text-gray-800">{pet.age}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Color:</span>
                        <p className="font-semibold text-gray-800">{pet.color}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Groomed:</span>
                        <p className="font-semibold text-gray-800">{pet.lastGroomed}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <span className="text-sm text-gray-500">Grooming Notes:</span>
                      <p className="text-sm text-gray-700 mt-1">{pet.notes}</p>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Vaccinations:</span>
                        <span className="text-sm font-semibold text-green-600">{pet.vaccinations}</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/book">
                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">
                      Book Grooming for {pet.name}
                    </Button>
                  </Link>
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
