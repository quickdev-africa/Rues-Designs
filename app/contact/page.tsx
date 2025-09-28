'use client';

import React, { useState } from 'react';
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
      setFormState('error');
    }
  };
  
  return (
    <main>
      <PageHeader
        title="Contact Us"
        subtitle="Reach out to our team to discuss your event rental needs"
        bgImage="/images/stock/category-tables.png"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and our team will get back to you within 24-48 hours to discuss your event needs.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                >
                  <option value="">Select an event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="social">Social Gathering</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="holiday">Holiday Party</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                  placeholder="Tell us about your event and rental needs..."
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className={`w-full flex justify-center items-center px-6 py-3 rounded-md text-white font-medium transition-colors ${
                    formState === 'submitting' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D4AF37] hover:bg-[#C09F27]'
                  }`}
                >
                  {formState === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
                
                {/* Form state messages */}
                {formState === 'success' && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-md">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
                
                {formState === 'error' && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
                    There was an error sending your message. Please try again or contact us directly.
                  </div>
                )}
              </div>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="lg:pl-8">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <p className="text-gray-600 mb-8">
              Have questions about our rental items or need assistance planning your event? 
              Contact us using the information below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mt-1 mr-4 bg-[#F8F4E8] p-3 rounded-full">
                  <Phone size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                  <p className="text-sm text-gray-500">Monday-Friday, 9am-5pm</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 bg-[#F8F4E8] p-3 rounded-full">
                  <Mail size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">hello@ruesdesign.com</p>
                  <p className="text-sm text-gray-500">We'll respond within 24-48 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 bg-[#F8F4E8] p-3 rounded-full">
                  <MapPin size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-semibold">Showroom</h3>
                  <p className="text-gray-600">123 Design Street</p>
                  <p className="text-gray-600">San Francisco, CA 94110</p>
                  <p className="text-sm text-gray-500">By appointment only</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 bg-[#F8F4E8] p-3 rounded-full">
                  <Clock size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-gray-600">Monday-Friday: 9am-5pm</p>
                  <p className="text-gray-600">Saturday: 10am-3pm (by appointment)</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'pinterest', 'linkedin'].map((platform) => (
                  <a 
                    key={platform} 
                    href={`https://www.${platform}.com/ruesdesign`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-2 rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors"
                  >
                    <span className="sr-only">{platform}</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Google Map (placeholder) */}
      <div className="w-full h-80 bg-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">Interactive map would be embedded here</p>
            <p className="text-sm text-gray-400">(Google Maps integration)</p>
          </div>
        </div>
      </div>
    </main>
  );
}
