'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { services } from '@/lib/mock-data';
import { ArrowLeft, ArrowRight, Check, Calendar, MapPin, CreditCard, Sparkles } from 'lucide-react';

type Step = 'service' | 'details' | 'datetime' | 'address' | 'payment' | 'confirmation';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState<Step>('service');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookingData, setBookingData] = useState({
    serviceId: '',
    petName: '',
    petBreed: '',
    petSize: '',
    specialRequirements: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: ''
  });

  // Mock provider availability - in real app, this would come from API
  const getAvailableSlots = (date: string) => {
    const dayOfWeek = new Date(date).getDay();

    // Provider working hours by day
    const schedule: Record<number, string[]> = {
      0: [], // Sunday - closed
      1: ['09:00', '10:30', '12:00', '13:30', '15:00'], // Monday
      2: ['09:00', '10:30', '12:00', '13:30', '15:00'], // Tuesday
      3: ['09:00', '10:30', '12:00', '13:30', '15:00'], // Wednesday
      4: [], // Thursday - closed
      5: ['09:00', '10:30', '12:00', '13:30', '15:00'], // Friday
      6: ['09:00', '11:00', '13:00'], // Saturday - shorter hours
    };

    // Mock booked slots (would come from database)
    const bookedSlots: Record<string, string[]> = {
      '2025-11-15': ['09:00', '13:30'],
      '2025-11-16': ['10:30'],
    };

    const availableSlots = schedule[dayOfWeek] || [];
    const booked = bookedSlots[date] || [];

    // Filter out booked slots
    return availableSlots.filter(slot => !booked.includes(slot));
  };

  // Get next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayOfWeek = date.getDay();
      // Skip days when provider is closed (Sunday and Thursday)
      if (dayOfWeek !== 0 && dayOfWeek !== 4) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          dayName: date.toLocaleDateString('en-US', { weekday: 'long' })
        });
      }
    }

    return dates;
  };

  const availableDates = getAvailableDates();
  const availableTimeSlots = selectedDate ? getAvailableSlots(selectedDate) : [];

  const steps: Step[] = ['service', 'details', 'datetime', 'address', 'payment', 'confirmation'];
  const stepIndex = steps.indexOf(currentStep);

  const selectedService = services.find(s => s.id === bookingData.serviceId);

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'service':
        return bookingData.serviceId !== '';
      case 'details':
        return bookingData.petName && bookingData.petSize;
      case 'datetime':
        return bookingData.date && bookingData.time;
      case 'address':
        return bookingData.name && bookingData.email && bookingData.phone && bookingData.address;
      case 'payment':
        return bookingData.paymentMethod !== '';
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Pawsome Grooming
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost">Cancel</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-2xl p-6 shadow-sm">
          {steps.slice(0, -1).map((step, index) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                    index <= stepIndex
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                  {index < stepIndex ? <Check className="w-6 h-6" /> : index + 1}
                </div>
                <span className={`text-xs mt-2 ${index <= stepIndex ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                  {step === 'service' && 'Service'}
                  {step === 'details' && 'Pet Info'}
                  {step === 'datetime' && 'Schedule'}
                  {step === 'address' && 'Contact'}
                  {step === 'payment' && 'Payment'}
                </span>
              </div>
              {index < steps.length - 2 && (
                <div className={`h-1 flex-1 mx-2 transition-all ${
                  index < stepIndex ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Service Selection */}
          {currentStep === 'service' && (
            <div className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-800">Select Your Service</h2>
                </div>
                <p className="text-gray-600 text-lg">Choose the perfect grooming service for your furry friend</p>
              </div>

              <div className="grid gap-4">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`group cursor-pointer transition-all rounded-2xl overflow-hidden border-2 ${
                      bookingData.serviceId === service.id
                        ? 'border-blue-500 shadow-lg scale-[1.02]'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                    onClick={() => setBookingData({ ...bookingData, serviceId: service.id })}
                  >
                    <div className="flex">
                      {/* Service Image */}
                      <div className="w-48 h-48 relative flex-shrink-0">
                        <img
                          src={`/images/service-${index + 1}.jpg`}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Service Details */}
                      <div className="flex-1 p-6 flex justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                          <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                            <Calendar className="w-4 h-4" />
                            <span>{service.duration} minutes</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">Starting at</p>
                          <p className="text-3xl font-bold text-blue-600">${service.prices.small}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pet Details */}
          {currentStep === 'details' && (
            <div className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Pet Information</h2>
                <p className="text-gray-600 text-lg">Tell us about your furry companion</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="petName" className="text-base font-semibold">Pet Name</Label>
                  <Input
                    id="petName"
                    value={bookingData.petName}
                    onChange={(e) => setBookingData({ ...bookingData, petName: e.target.value })}
                    placeholder="e.g., Max"
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="petBreed" className="text-base font-semibold">Breed (Optional)</Label>
                  <Input
                    id="petBreed"
                    value={bookingData.petBreed}
                    onChange={(e) => setBookingData({ ...bookingData, petBreed: e.target.value })}
                    placeholder="e.g., Golden Retriever"
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="petSize" className="text-base font-semibold">Pet Size</Label>
                  <Select value={bookingData.petSize} onValueChange={(value) => setBookingData({ ...bookingData, petSize: value })}>
                    <SelectTrigger className="mt-2 h-12">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (0-20 lbs)</SelectItem>
                      <SelectItem value="medium">Medium (20-50 lbs)</SelectItem>
                      <SelectItem value="large">Large (50+ lbs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="specialRequirements" className="text-base font-semibold">Special Requirements (Optional)</Label>
                  <Input
                    id="specialRequirements"
                    value={bookingData.specialRequirements}
                    onChange={(e) => setBookingData({ ...bookingData, specialRequirements: e.target.value })}
                    placeholder="Any special needs or concerns?"
                    className="mt-2 h-12"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Date & Time */}
          {currentStep === 'datetime' && (
            <div className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Schedule Appointment</h2>
                <p className="text-gray-600 text-lg">Choose from our available time slots</p>
              </div>

              <div className="space-y-6">
                {/* Date Selection */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Select a Date</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableDates.map((dateObj) => (
                      <button
                        key={dateObj.date}
                        type="button"
                        onClick={() => {
                          setSelectedDate(dateObj.date);
                          setBookingData({ ...bookingData, date: dateObj.date, time: '' });
                        }}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedDate === dateObj.date
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`text-xs ${selectedDate === dateObj.date ? 'text-blue-600' : 'text-gray-500'}`}>
                          {dateObj.dayName}
                        </div>
                        <div className={`text-lg font-bold ${selectedDate === dateObj.date ? 'text-blue-700' : 'text-gray-800'}`}>
                          {dateObj.display}
                        </div>
                        {getAvailableSlots(dateObj.date).length > 0 && (
                          <div className="text-xs text-green-600 mt-1">
                            {getAvailableSlots(dateObj.date).length} slots available
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Available Time Slots</Label>
                    {availableTimeSlots.length > 0 ? (
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {availableTimeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setBookingData({ ...bookingData, time: slot })}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${
                              bookingData.time === slot
                                ? 'border-blue-500 bg-blue-500 text-white shadow-lg'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                          >
                            <div className="font-bold">{slot}</div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
                        <p className="text-yellow-700 font-semibold">No slots available for this date</p>
                        <p className="text-sm text-yellow-600 mt-2">Please select another date</p>
                      </div>
                    )}
                  </div>
                )}

                {!selectedDate && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                    <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                    <p className="text-blue-700 font-semibold">Select a date to view available time slots</p>
                  </div>
                )}

                {selectedService && bookingData.time && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <p className="text-green-700">
                      <span className="font-semibold">Selected:</span> {selectedService.name} on{' '}
                      {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {bookingData.time}
                    </p>
                    <p className="text-sm text-green-600 mt-1">Duration: {selectedService.duration} minutes</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Address & Contact */}
          {currentStep === 'address' && (
            <div className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Information</h2>
                <p className="text-gray-600 text-lg">Where should we come to groom your pet?</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base font-semibold">Full Name</Label>
                  <Input
                    id="name"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    placeholder="Your name"
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-semibold">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-semibold">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-base font-semibold">Service Address</Label>
                  <Input
                    id="address"
                    value={bookingData.address}
                    onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                    placeholder="123 Main St, City, State, ZIP"
                    className="mt-2 h-12"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Method */}
          {currentStep === 'payment' && (
            <div className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Method</h2>
                <p className="text-gray-600 text-lg">Choose how you would like to pay</p>
              </div>

              <div className="space-y-4">
                {[
                  { value: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                  { value: 'cash', label: 'Pay After Service (Cash)', icon: MapPin }
                ].map((method) => (
                  <div
                    key={method.value}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      bookingData.paymentMethod === method.value
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setBookingData({ ...bookingData, paymentMethod: method.value })}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${
                        bookingData.paymentMethod === method.value ? 'bg-blue-500' : 'bg-gray-200'
                      }`}>
                        <method.icon className={`w-6 h-6 ${
                          bookingData.paymentMethod === method.value ? 'text-white' : 'text-gray-500'
                        }`} />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{method.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking Summary */}
              {selectedService && (
                <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold mb-4 text-blue-800">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Service:</span>
                      <span className="font-semibold">{selectedService.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Pet:</span>
                      <span className="font-semibold">{bookingData.petName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Date:</span>
                      <span className="font-semibold">{bookingData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Time:</span>
                      <span className="font-semibold">{bookingData.time}</span>
                    </div>
                    <div className="border-t-2 border-blue-200 pt-3 mt-3">
                      <div className="flex justify-between text-lg">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-blue-600">
                          ${selectedService.prices[bookingData.petSize as keyof typeof selectedService.prices] || selectedService.prices.small}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Confirmation */}
          {currentStep === 'confirmation' && (
            <div className="p-8 space-y-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>

              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Your appointment has been successfully scheduled. We have sent a confirmation email to {bookingData.email}.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 max-w-2xl mx-auto text-left">
                <h3 className="text-2xl font-bold mb-6 text-center text-blue-800">Appointment Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-blue-200">
                    <span className="text-gray-700 font-medium">Service:</span>
                    <span className="font-bold">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-blue-200">
                    <span className="text-gray-700 font-medium">Pet:</span>
                    <span className="font-bold">{bookingData.petName} ({bookingData.petSize})</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-blue-200">
                    <span className="text-gray-700 font-medium">Date & Time:</span>
                    <span className="font-bold">{bookingData.date} at {bookingData.time}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-blue-200">
                    <span className="text-gray-700 font-medium">Location:</span>
                    <span className="font-bold text-right">{bookingData.address}</span>
                  </div>
                  <div className="flex justify-between py-3 pt-6">
                    <span className="text-gray-700 font-medium text-lg">Total Price:</span>
                    <span className="font-bold text-2xl text-blue-600">
                      ${selectedService?.prices[bookingData.petSize as keyof typeof selectedService.prices]}
                    </span>
                  </div>
                </div>
              </div>

              <Link href="/">
                <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">
                  Return to Home
                </Button>
              </Link>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep !== 'confirmation' && (
            <div className="flex justify-between p-8 border-t border-gray-200 bg-gray-50">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={stepIndex === 0}
                className="h-12 px-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="h-12 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
