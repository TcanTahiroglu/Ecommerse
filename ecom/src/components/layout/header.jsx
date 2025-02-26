import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaSearch, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducers/userSlice";
import { fetchCategories } from "../../store/actions/categoryActions";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const { categories, loading, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Kategorileri cinsiyete göre ayır
  const womenCategories = categories.filter(cat => cat.gender === 'k');
  const menCategories = categories.filter(cat => cat.gender === 'e');

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#23856D] text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Contact Info */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                <span>(225) 555-0118</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>michelle.rivera@example.com</span>
              </div>
            </div>

            {/* Follow Us */}
            <div className="flex items-center">
              <span className="mr-2">Follow Us:</span>
              <div className="flex space-x-4">
                <FaInstagram />
                <FaYoutube />
                <FaFacebookF />
                <FaTwitter />
              </div>
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
            <div className="relative group">
              <button className="text-[#737373] hover:text-[#23A6F0] flex items-center">
                Kategoriler
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-[400px] bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Kadın Kategorileri */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-[#23A6F0]">Kadın</h3>
                      <ul className="space-y-2">
                        {womenCategories.map((category) => (
                          <li key={category.id}>
                            <Link
                              to={`/shop/kadin/${category.code.split(':')[1]}/${category.id}`}
                              className="block text-gray-600 hover:text-[#23A6F0] transition-colors"
                            >
                              {category.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Erkek Kategorileri */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-[#23A6F0]">Erkek</h3>
                      <ul className="space-y-2">
                        {menCategories.map((category) => (
                          <li key={category.id}>
                            <Link
                              to={`/shop/erkek/${category.code.split(':')[1]}/${category.id}`}
                              className="block text-gray-600 hover:text-[#23A6F0] transition-colors"
                            >
                              {category.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
