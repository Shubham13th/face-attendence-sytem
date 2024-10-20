import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // if using React Router
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle';
import './Navbar.css'; // or use Tailwind directly

const Navbar = ({ isAuthenticated, isAdmin, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              FaceRecognition<span className="text-indigo-500">System</span>
            </Link>
          </div>

          {/* Menu items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Home</Link>
              <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">About</Link>
              
              {/* Only visible if authenticated */}
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Dashboard</Link>
                  {isAdmin && (
                    <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Admin</Link>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Theme toggle & User Menu */}
          <div className="flex items-center">
            <ThemeToggle />
            {isAuthenticated ? (
              <UserMenu user={user} />
            ) : (
              <Link to="/login" className="px-3 py-2 bg-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-700">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Home</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About</Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Dashboard</Link>
                {isAdmin && (
                  <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Admin</Link>
                )}
              </>
            )}
            {!isAuthenticated && (
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-500 hover:bg-gray-700">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
