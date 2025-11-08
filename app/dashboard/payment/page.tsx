'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, LogOut, User, CreditCard, Plus, Check, Download } from 'lucide-react';

export default function PaymentPage() {
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

  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      default: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiry: '09/26',
      default: false
    }
  ];

  const paymentHistory = [
    {
      id: 1,
      date: '2025-10-28',
      service: 'Express Groom',
      pet: 'Max',
      amount: 55,
      status: 'paid',
      method: 'Visa •••• 4242',
      invoice: '#INV-001'
    },
    {
      id: 2,
      date: '2025-10-15',
      service: 'Full Grooming Package',
      pet: 'Bella',
      amount: 75,
      status: 'paid',
      method: 'Visa •••• 4242',
      invoice: '#INV-002'
    },
    {
      id: 3,
      date: '2025-09-30',
      service: 'Bath & Nail Trim',
      pet: 'Max',
      amount: 65,
      status: 'paid',
      method: 'Mastercard •••• 8888',
      invoice: '#INV-003'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navigation - Same as other pages */}
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
                  <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-600 hover:bg-blue-100">
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
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Payment Methods</h1>
              <p className="text-xl text-gray-600">Manage your payment methods and view transaction history</p>
            </div>

            {/* Payment Methods */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Saved Payment Methods</h2>
                <Button variant="outline" className="border-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Card
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden ${
                      method.default ? 'ring-4 ring-blue-300' : ''
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative">
                      {method.default && (
                        <div className="absolute -top-2 -right-2 bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Default
                        </div>
                      )}
                      <div className="text-sm opacity-90 mb-4">{method.type}</div>
                      <div className="text-2xl font-bold tracking-wider mb-6">
                        •••• •••• •••• {method.last4}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs opacity-75">EXPIRES</div>
                          <div className="font-semibold">{method.expiry}</div>
                        </div>
                        {!method.default && (
                          <Button variant="ghost" className="text-white hover:bg-white/20" size="sm">
                            Set as Default
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment History */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment History</h2>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Service</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pet</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Payment Method</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-800">{payment.date}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800">{payment.service}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{payment.pet}</td>
                          <td className="px-6 py-4 text-sm font-bold text-gray-800">${payment.amount}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{payment.method}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                              <Check className="w-3 h-3 mr-1" />
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                              <Download className="w-4 h-4 mr-1" />
                              {payment.invoice}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">Total Spent: <span className="font-bold text-gray-800">$195</span></p>
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
