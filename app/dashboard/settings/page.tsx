'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, LogOut, User, CreditCard, MapPin, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
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
                  <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-600 hover:bg-blue-100">
                    <User className="w-5 h-5 mr-3" />
                    Account Settings
                  </Button>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Account Settings</h1>
              <p className="text-xl text-gray-600">Manage your account preferences and personal information</p>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={userData.name} className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={userData.email} className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue={userData.phone || '(555) 123-4567'} className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Default Address</Label>
                  <Input id="address" defaultValue={userData.address || '123 Main St, Los Angeles, CA'} className="h-12" />
                </div>
              </div>

              <Button className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">
                Save Changes
              </Button>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Notification Preferences</h2>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Appointment Reminders', desc: 'Get reminded 24 hours before your appointment' },
                  { label: 'Groomer En Route Alerts', desc: 'Notification when groomer is 15 minutes away' },
                  { label: 'Special Offers', desc: 'Receive promotional emails and discounts' },
                  { label: 'Service Updates', desc: 'Updates about new services and features' }
                ].map((notif, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-800">{notif.label}</p>
                      <p className="text-sm text-gray-600">{notif.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={idx < 2}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Service Area */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Service Area</h2>
              </div>

              <p className="text-gray-600 mb-4">Your address is within our service area. We provide mobile grooming services within 25 miles of Los Angeles.</p>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <p className="text-green-700 font-semibold">✓ Service Available at Your Location</p>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Security</h2>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="border-2">Change Password</Button>
                <Button variant="outline" className="border-2 text-red-600 hover:bg-red-50 hover:text-red-700">
                  Delete Account
                </Button>
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
