import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import CategoryDropdown from '../CategoryDropdown';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md">
      {/* Top Bar */}
      <div className="hidden md:flex justify-between items-center px-6 py-2 bg-gray-100">
        <div className="flex space-x-6 text-sm text-gray-600">
          <span>Phone: +1 234 567 890</span>
          <span>Email: info@ecommerce.com</span>
          <span>Free shipping for orders over $50</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-4 md:px-6">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="text-xl font-bold text-gray-800">
            E-Commerce
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <FaBars size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <CategoryDropdown />
          <Link to="/shop" className="text-gray-600 hover:text-gray-900">
            Shop
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <FaSearch size={20} />
          </button>
          <Link to="/cart" className="p-2 text-gray-600 hover:text-gray-900">
            <FaShoppingCart size={20} />
          </Link>
          <Link to="/profile" className="p-2 text-gray-600 hover:text-gray-900">
            <FaUser size={20} />
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden w-full">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <CategoryDropdown />
              <Link
                to="/shop"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex space-x-4 px-4 py-2">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FaSearch size={20} />
                </button>
                <Link to="/cart" className="text-gray-600 hover:text-gray-900">
                  <FaShoppingCart size={20} />
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                  <FaUser size={20} />
                </Link>
              </div>
            </nav>
          </div>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4">
            <div className="max-w-3xl mx-auto flex">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700">
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
