'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, DollarSign, Users, LogOut, User, MapPin, Bell, Shield, Clock } from 'lucide-react';

export default function ProviderSettingsPage() {
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
                  <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-600 hover:bg-blue-100">
                    <User className="w-5 h-5 mr-3" />
                    Settings
                  </Button>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Provider Settings</h1>
              <p className="text-xl text-gray-600">Manage your business profile and preferences</p>
            </div>

            {/* Business Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Business Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" defaultValue={userData.businessName} className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerName">Your Name</Label>
                  <Input id="ownerName" defaultValue={userData.name} className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={userData.email} className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue={userData.phone || '(555) 123-4567'} className="h-12" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Business Description</Label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    defaultValue="Professional mobile pet grooming with 10+ years of experience. Specializing in all breeds and sizes."
                  />
                </div>
              </div>

              <Button className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">
                Save Changes
              </Button>
            </div>

            {/* Service Area */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Service Area</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceArea">Primary Service Location</Label>
                  <Input id="serviceArea" defaultValue="Los Angeles, CA" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="radius">Service Radius (miles)</Label>
                  <Input id="radius" type="number" defaultValue="25" className="h-12" />
                  <p className="text-sm text-gray-500">Maximum distance you'll travel for appointments</p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-blue-700 font-semibold">Current Coverage: 25 miles from Los Angeles, CA</p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Working Hours</h2>
              </div>

              <div className="space-y-4">
                {[
                  { day: 'Monday', start: '09:00', end: '17:00', enabled: true },
                  { day: 'Tuesday', start: '09:00', end: '17:00', enabled: true },
                  { day: 'Wednesday', start: '09:00', end: '17:00', enabled: true },
                  { day: 'Thursday', start: '09:00', end: '17:00', enabled: false },
                  { day: 'Friday', start: '09:00', end: '17:00', enabled: true },
                  { day: 'Saturday', start: '09:00', end: '15:00', enabled: true },
                  { day: 'Sunday', start: '10:00', end: '14:00', enabled: false }
                ].map((schedule, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <input
                      type="checkbox"
                      defaultChecked={schedule.enabled}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="w-28 font-semibold text-gray-700">{schedule.day}</div>
                    <div className="flex items-center gap-2 flex-1">
                      <Input type="time" defaultValue={schedule.start} className="h-10" disabled={!schedule.enabled} />
                      <span className="text-gray-500">to</span>
                      <Input type="time" defaultValue={schedule.end} className="h-10" disabled={!schedule.enabled} />
                    </div>
                  </div>
                ))}
              </div>

              <Button className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">
                Update Availability
              </Button>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Notification Preferences</h2>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'New Booking Alerts', desc: 'Get notified immediately when a new appointment is booked' },
                  { label: 'Cancellation Notices', desc: 'Alert when customers cancel or reschedule' },
                  { label: 'Payment Confirmations', desc: 'Notification when payments are processed' },
                  { label: 'Daily Schedule Summary', desc: 'Morning email with your daily schedule' }
                ].map((notif, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-800">{notif.label}</p>
                      <p className="text-sm text-gray-600">{notif.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                ))}
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
                <Button variant="outline" className="border-2">Two-Factor Authentication</Button>
                <Button variant="outline" className="border-2 text-red-600 hover:bg-red-50 hover:text-red-700">
                  Deactivate Provider Account
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
