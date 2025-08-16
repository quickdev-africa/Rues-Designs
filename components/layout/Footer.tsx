import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-12 shadow-lg">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-accent via-accent/80 to-accent/50"></div>
      
      <div className="container mx-auto py-16 px-4 lg:px-8">
        {/* Logo and content section - centered on mobile, grid on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Brand column */}
                  <div>
          <Image 
            src="/assets/logos/white.png" 
            alt="Rues Design & Rental" 
            width={120} 
            height={45} 
            className="mb-3" 
          />
          <p className="text-white text-sm mb-2">&copy; {new Date().getFullYear()} Rues Design & Rental</p>
          <p className="text-white/80 text-xs">Making every event memorable.</p>
        </div>
          
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-white mb-4 text-lg relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent"></span>
            </h3>
            <ul className="space-y-3 mt-6">
              <li><Link href="/products" className="text-white/90 hover:text-accent transition-colors">Products</Link></li>
              <li><Link href="/bookings" className="text-white/90 hover:text-accent transition-colors">Bookings</Link></li>
              <li><Link href="/about" className="text-white/90 hover:text-accent transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-white/90 hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-white mb-4 text-lg relative inline-block">
              Contact
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent"></span>
            </h3>
            <div className="space-y-3 mt-6">
              <p className="text-white/90">123 Event Ave, Lagos, NG</p>
              <p className="text-white/90">+234 800 000 0000</p>
              <p className="text-white/90">info@ruesdesign.com</p>
              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                <a href="#" aria-label="Instagram" className="bg-white/10 p-2.5 rounded-full hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110 transform">
                  <svg width="20" height="20" fill="currentColor"><path d="M7 2C4.243 2 2 4.243 2 7v6c0 2.757 2.243 5 5 5h6c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h6c1.654 0 3 1.346 3 3v6c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm6 2a1 1 0 110 2 1 1 0 010-2zm-3 2a3 3 0 100 6 3 3 0 000-6zm0 2a1 1 0 110 2 1 1 0 010-2z"/></svg>
                </a>
                <a href="#" aria-label="Facebook" className="bg-white/10 p-2.5 rounded-full hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110 transform">
                  <svg width="20" height="20" fill="currentColor"><path d="M17 2H3C1.895 2 1 2.895 1 4v12c0 1.105.895 2 2 2h7v-7H7v-3h3V7c0-2.206 1.794-4 4-4h2v3h-2c-.552 0-1 .448-1 1v2h3l-1 3h-2v7h3c1.105 0 2-.895 2-2V4c0-1.105-.895-2-2-2z"/></svg>
                </a>
                <a href="#" aria-label="X" className="bg-white/10 p-2.5 rounded-full hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110 transform">
                  <svg width="20" height="20" fill="currentColor"><path d="M17.94 2.34a1.25 1.25 0 00-1.77 0l-4.17 4.17-4.17-4.17a1.25 1.25 0 00-1.77 1.77l4.17 4.17-4.17 4.17a1.25 1.25 0 101.77 1.77l4.17-4.17 4.17 4.17a1.25 1.25 0 101.77-1.77l-4.17-4.17 4.17-4.17a1.25 1.25 0 000-1.77z"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Business Hours */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-white mb-4 text-lg relative inline-block">
              Business Hours
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent"></span>
            </h3>
            <div className="space-y-3 mt-6">
              <div className="flex flex-col">
                <span className="text-accent/80 text-xs mb-1">Monday - Friday</span>
                <span className="text-white/90">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-accent/80 text-xs mb-1">Saturday</span>
                <span className="text-white/90">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-accent/80 text-xs mb-1">Sunday</span>
                <span className="text-white/90">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom copyright section with subtle separator */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 text-center text-white/60 text-sm">
          © {new Date().getFullYear()} Rues Design & Rental. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
