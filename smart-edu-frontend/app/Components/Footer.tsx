'use client'
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import Link from 'next/link';
import React from 'react';
  import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGithub, FaMedium, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

  const Footer = () => {
  
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <footer className="bg-teal-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">SmartEdu</h3>
              <p className="text-gray-400 mb-4">
                Empowering Sri Lankan students with quality O/L education. Making learning accessible, engaging, and effective for everyone.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="https://facebook.com" className="hover:text-blue-400 transition-colors">
                  <FaFacebook size={24} />
                </Link>
                <Link href="https://youtube.com" className="hover:text-red-400 transition-colors">
                  <FaYoutube size={24} />
                </Link>
                <Link href="https://instagram.com" className="hover:text-pink-400 transition-colors">
                  <FaInstagram size={24} />
                </Link>
                <Link href="https://twitter.com" className="hover:text-blue-400 transition-colors">
                  <FaTwitter size={24} />
                </Link>
              </div>
              <div className='mt-4'>
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    <span>123 Education Avenue<br />Colombo 03, Sri Lanka</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaPhone />
                    <span>Hotline: 011-234-5678<br />WhatsApp: 077-123-4567</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaEnvelope />
                    <span>info@smartedu.lk<br />support@smartedu.lk</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Study Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/subjects" className="text-gray-400 hover:text-white transition-colors">
                    Subjects
                  </Link>
                </li>
                <li>
                  <Link href="/past-papers" className="text-gray-400 hover:text-white transition-colors">
                    Past Papers
                  </Link>
                </li>
                <li>
                  <Link href="/model-papers" className="text-gray-400 hover:text-white transition-colors">
                    Model Papers
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials" className="text-gray-400 hover:text-white transition-colors">
                    Video Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/notes" className="text-gray-400 hover:text-white transition-colors">
                    Study Notes
                  </Link>
                </li>
              </ul>
              
              <div className="mt-4">
                  <h4 className="font-semibold mb-2">Support Hours</h4>
                  <p className="text-gray-400">
                    Monday - Friday: 8:00 AM - 8:00 PM<br />
                    Saturday: 9:00 AM - 5:00 PM<br />
                    Sunday: 9:00 AM - 1:00 PM
                  </p>
                </div>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to receive study tips, exam updates, and free resources for O/L students.
              </p>
              <form className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 bg-teal-950 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="submit"
                  className=""
                >
                  Join Now
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                By joining, you agree to receive educational updates from SmartEdu. You can unsubscribe anytime.
              </p>
            </div>

            {/* Calendar */}
              <div className="mt-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-none"
                />
              </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} SmartEdu Team. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Use
                </Link>
                <Link href="/help" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;