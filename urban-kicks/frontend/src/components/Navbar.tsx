import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const { email, logout, isAuthenticated } = useAuthStore();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                Urban<span className="text-gray-900">Kicks</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/catalog" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Shop All
              </Link>
              <Link to="/catalog?search=sneaker" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Sneakers
              </Link>
              <Link to="/catalog?search=formal" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Formal
              </Link>
              <Link to="/catalog?search=athletic" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Athletic
              </Link>
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {isAuthenticated() ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                  {email}
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
