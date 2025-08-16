import Link from 'next/link';
import Image from 'next/image';
import NavbarMenu from './NavbarMenu';
import SearchBar from '../ui/SearchBar';
import UserMenu from '../ui/UserMenu';
import CartIcon from '../ui/CartIcon';
import WishlistIcon from '../ui/WishlistIcon';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-8">
        {/* Logo section */}
        <div className="flex shrink-0">
          <Link href="/" className="mr-6">
            <Image src="/assets/logos/logo.png" alt="Rues Design & Rental" width={138} height={55} className="h-14 w-auto" />
          </Link>
        </div>
        
        {/* Main navigation - centered on desktop */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <NavbarMenu />
        </div>
        
        {/* Right side icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <SearchBar />
          <WishlistIcon />
          <CartIcon />
          <UserMenu />
        </div>
        
        {/* Mobile navigation menu button - only visible on mobile */}
        <div className="lg:hidden flex items-center ml-4">
          <NavbarMenu />
        </div>
      </div>
    </header>
  );
}
