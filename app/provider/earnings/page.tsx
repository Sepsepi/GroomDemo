'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, Users, LogOut, TrendingUp, Download, CreditCard } from 'lucide-react';

export default function EarningsPage() {
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

  const earningsData = {
    today: 175,
    week: 840,
    month: 3420,
    total: 18950
  };

  const recentPayouts = [
    { id: 1, date: '2025-11-01', amount: 3420, status: 'Paid', method: 'Bank Transfer', period: 'October 2025' },
    { id: 2, date: '2025-10-01', amount: 3180, status: 'Paid', method: 'Bank Transfer', period: 'September 2025' },
    { id: 3, date: '2025-09-01', amount: 2950, status: 'Paid', method: 'Bank Transfer', period: 'August 2025' }
  ];

  const weeklyBreakdown = [
    { day: 'Monday', appointments: 4, revenue: 285 },
    { day: 'Tuesday', appointments: 3, revenue: 195 },
    { day: 'Wednesday', appointments: 5, revenue: 370 },
    { day: 'Thursday', appointments: 0, revenue: 0 },
    { day: 'Friday', appointments: 4, revenue: 315 },
    { day: 'Saturday', appointments: 6, revenue: 465 },
    { day: 'Sunday', appointments: 2, revenue: 130 }
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
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <Users className="w-5 h-5 mr-3" />
                    Clients
                  </Button>
                </Link>
                <Link href="/provider/earnings">
                  <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-600 hover:bg-blue-100">
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
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Earnings & Payouts</h1>
              <p className="text-xl text-gray-600">Track your income and payment history</p>
            </div>

            {/* Earnings Overview */}
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: 'Today', amount: earningsData.today, icon: DollarSign, color: 'from-green-500 to-emerald-500' },
                { label: 'This Week', amount: earningsData.week, icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
                { label: 'This Month', amount: earningsData.month, icon: Calendar, color: 'from-purple-500 to-pink-500' },
                { label: 'All Time', amount: earningsData.total, icon: CreditCard, color: 'from-orange-500 to-red-500' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                  <div className="text-3xl font-bold text-gray-800">${stat.amount}</div>
                </div>
              ))}
            </div>

            {/* Weekly Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">This Week's Performance</h2>

              <div className="space-y-4">
                {weeklyBreakdown.map((day, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-28 font-semibold text-gray-700">{day.day}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full flex items-center justify-end px-3 text-white text-sm font-bold"
                            style={{ width: `${(day.revenue / 500) * 100}%` }}
                          >
                            {day.revenue > 0 && `$${day.revenue}`}
                          </div>
                        </div>
                        <div className="w-32 text-right">
                          <span className="text-sm text-gray-600">{day.appointments} appointments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-gray-600">Weekly Total:</span>
                  <span className="text-2xl font-bold text-gray-800 ml-3">${earningsData.week}</span>
                </div>
                <div>
                  <span className="text-gray-600">Avg per Day:</span>
                  <span className="text-2xl font-bold text-gray-800 ml-3">${Math.round(earningsData.week / 7)}</span>
                </div>
              </div>
            </div>

            {/* Payout History */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Payout History</h2>
                <Button variant="outline" className="border-2">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Period</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Method</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentPayouts.map((payout) => (
                      <tr key={payout.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-800">{payout.date}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{payout.period}</td>
                        <td className="px-6 py-4 text-sm font-bold text-green-600">${payout.amount}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{payout.method}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            {payout.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>

              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white max-w-md">
                <div className="text-sm opacity-90 mb-4">Bank Account</div>
                <div className="text-xl font-bold mb-4">••••••••1234</div>
                <div className="text-sm opacity-90">Chase Bank</div>
              </div>

              <Button variant="outline" className="mt-6 border-2">
                Update Payment Method
              </Button>
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
