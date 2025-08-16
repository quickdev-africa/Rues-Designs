import { HiShoppingCart } from 'react-icons/hi';

export default function CartIcon() {
  // TODO: Connect to cart state
  return (
    <button className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Cart">
      <HiShoppingCart size={24} className="text-gray-500" />
      {/* Example badge for cart count */}
      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full px-1.5 py-0.5 font-bold">2</span>
    </button>
  );
}
