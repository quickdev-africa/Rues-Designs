import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#31473A] text-white mt-12 shadow-lg">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/80 to-[#D4AF37]/50"></div>
      
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
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <ul className="space-y-3 mt-6">
              <li><Link href="/" className="text-white/90 hover:text-[#D4AF37] transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-white/90 hover:text-[#D4AF37] transition-colors">About Us</Link></li>
              <li><Link href="/shop" className="text-white/90 hover:text-[#D4AF37] transition-colors">Shop</Link></li>
              <li><Link href="/collections" className="text-white/90 hover:text-[#D4AF37] transition-colors">Collections</Link></li>
              <li><Link href="/gallery" className="text-white/90 hover:text-[#D4AF37] transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="text-white/90 hover:text-[#D4AF37] transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="text-center md:text-left">
                        <h3 className="font-bold text-white mb-4 text-lg relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <div className="space-y-3 mt-6">
              <p className="text-white/90">123 Event Ave, Lagos, NG</p>
              <p className="text-white/90">+234 800 000 0000</p>
              <p className="text-white/90">info@ruesdesign.com</p>
              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                <Link href="https://www.instagram.com" aria-label="Instagram" className="bg-white/10 p-2.5 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300 hover:scale-110 transform">
                  <svg width="20" height="20" fill="currentColor"><path d="M7 2C4.243 2 2 4.243 2 7v6c0 2.757 2.243 5 5 5h6c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h6c1.654 0 3 1.346 3 3v6c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm6 2a1 1 0 110 2 1 1 0 010-2zm-3 2a3 3 0 100 6 3 3 0 000-6zm0 2a1 1 0 110 2 1 1 0 010-2z"/></svg>
                </Link>
                <Link href="https://www.facebook.com" aria-label="Facebook" className="bg-white/10 p-2.5 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300 hover:scale-110 transform">
                  <svg width="20" height="20" fill="currentColor"><path d="M17 2H3C1.895 2 1 2.895 1 4v12c0 1.105.895 2 2 2h7v-7H7v-3h3V7c0-2.206 1.794-4 4-4h2v3h-2c-.552 0-1 .448-1 1v2h3l-1 3h-2v7h3c1.105 0 2-.895 2-2V4c0-1.105-.895-2-2-2z"/></svg>
                </Link>
                <Link href="https://www.pinterest.com" aria-label="Pinterest" className="bg-white/10 p-2.5 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300 hover:scale-110 transform">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.33 1.781.742 2.281.082.099.093.185.069.288l-.278 1.134c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621 1.12.332 2.163.517 3.299.517 5.522 0 10-4.477 10-10S17.522 2 12 2z"/></svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Business Hours */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-white mb-4 text-lg relative inline-block">
              Business Hours
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <div className="space-y-3 mt-6">
              <div className="flex flex-col">
                <span className="text-[#D4AF37]/80 text-xs mb-1">Monday - Friday</span>
                <span className="text-white/90">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#D4AF37]/80 text-xs mb-1">Saturday</span>
                <span className="text-white/90">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#D4AF37]/80 text-xs mb-1">Sunday</span>
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
