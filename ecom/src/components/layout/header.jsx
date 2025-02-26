import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaSearch, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducers/userSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
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
          <Link to="/" className="text-2xl font-bold text-gray-800">
            E-Ticaret
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          {/* Category Dropdown */}
          <div className="relative group ml-6">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
              <span>Category</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-screen max-w-4xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <CategoryDropdown />
            </div>
          </div>
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
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <FaSearch size={20} />
              </button>
              {isAuthenticated && user && (
                <span className="text-sm font-medium text-gray-700">
                  {user.name || user.email.split('@')[0]}
                </span>
              )}
            </div>
            <Link to="/cart" className="p-2 text-gray-600 hover:text-gray-900">
              <FaShoppingCart size={20} />
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <FaUser size={20} />
              </button>
              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline-block mr-2" />
                      Çıkış Yap
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Giriş Yap
                      </Link>
                      <Link
                        to="/signup"
                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 border-t"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Üye Ol
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#252B42]">Bandage</Link>

          {/* Navigation */}
          <nav className={`lg:flex items-center space-x-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
            <Link to="/" className="text-[#737373] hover:text-[#23A6F0]">Home</Link>
            <Link to="/shop" className="text-[#737373] hover:text-[#23A6F0]">Shop</Link>
            <Link to="/about" className="text-[#737373] hover:text-[#23A6F0]">About</Link>
            <Link to="/blog" className="text-[#737373] hover:text-[#23A6F0]">Blog</Link>
            <Link to="/contact" className="text-[#737373] hover:text-[#23A6F0]">Contact</Link>
            <Link to="/pages" className="text-[#737373] hover:text-[#23A6F0]">Pages</Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-[#23A6F0]">
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-[#252B42]">{user.name || user.email}</span>
                  <FaUser className="text-[#23A6F0]" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-[#E74040] hover:text-[#E74040]/80"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="flex items-center hover:text-[#23A6F0]/80">
                    <FaUser className="mr-2" />
                    <span>Login</span>
                  </Link>
                  <span className="mx-2">/</span>
                  <Link to="/signup" className="hover:text-[#23A6F0]/80">Register</Link>
                </>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/wishlist" className="text-[#23A6F0] hover:text-[#23A6F0]/80">
                <FaHeart />
              </Link>
              <Link to="/cart" className="text-[#23A6F0] hover:text-[#23A6F0]/80">
                <FaShoppingCart />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-[#737373] hover:text-[#23A6F0]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
