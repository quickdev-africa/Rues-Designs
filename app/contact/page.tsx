'use client';

import React, { useState } from 'react';
import SimpleHeroSection from '@/components/layout/SimpleHeroSection';
import PageHeader from '@/components/ui/PageHeader';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    message: '',
  });

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormState('success');
      // In a real implementation, you would send the form data to your backend
      console.log('Form submitted:', formData);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: '',
        message: '',
      });
      // Reset form state after a delay
      setTimeout(() => {
        setFormState('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <main>
      <SimpleHeroSection
        imageUrl="/images/hero_pg5.jpg"
        title="Get in touch."
        subtitle="We’re here to help you bring your vision to life — beautifully and seamlessly."
        height="h-[50vh]"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form className="bg-white rounded-lg shadow-md p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-2">Rental Inquiry</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                </div>
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Event Date</label>
                  <input type="date" name="eventDate" id="eventDate" required value={formData.eventDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">Event Type</label>
                  <select name="eventType" id="eventType" required value={formData.eventType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-brand-primary focus:border-brand-primary">
                    <option value="">Select type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Social">Social</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-brand-primary focus:border-brand-primary" placeholder="Tell us about your event, rental needs, or any questions..." />
                </div>
              </div>
              <button type="submit" className="w-full py-3 px-6 bg-[#D4AF36] text-white font-semibold rounded-lg text-lg shadow hover:bg-[#bfa12e] transition disabled:opacity-60" disabled={formState === 'submitting'}>
                {formState === 'submitting' ? 'Submitting...' : 'Send Inquiry'}
              </button>
              {formState === 'success' && (
                <div className="text-green-600 text-center font-medium mt-2">Thank you! Your inquiry has been sent.</div>
              )}
            </form>
          </div>
          {/* Contact Information */}
          <div className="lg:pl-8 flex flex-col gap-6 justify-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="text-[#D4AF36]" size={22} />
                <span className="text-gray-700 font-medium">Luxury Event Rental Company based in the DMV</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Mail className="text-[#D4AF36]" size={22} />
                <a href="mailto:info@ruesdesigns.org" className="text-gray-700 font-medium hover:underline">info@ruesdesigns.org</a>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Phone className="text-[#D4AF36]" size={22} />
                <a href="tel:+12406018865" className="text-gray-700 font-medium hover:underline">+1 (240) 601-8865</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* DMV Region Image */}
      <div className="w-full h-80 bg-gray-200 relative overflow-hidden flex items-center justify-center">
        <img 
          src="/images/dmv-region.jpg" 
          alt="DMV Region Map" 
          className="object-cover w-full h-full" 
          style={{ maxHeight: '100%', maxWidth: '100%' }}
        />
      </div>
    </main>
  );
}
