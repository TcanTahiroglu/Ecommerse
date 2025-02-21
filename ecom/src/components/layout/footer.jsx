import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
          {/* Company Info */}
          <div className="flex flex-col space-y-4 md:w-1/4">
            <h2 className="text-xl font-bold text-white">E-Commerce</h2>
            <p className="text-sm">
              Your one-stop shop for all your fashion needs. Quality products at competitive prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <Link to="/" className="text-sm hover:text-white">Home</Link>
            <Link to="/shop" className="text-sm hover:text-white">Shop</Link>
            <Link to="/about" className="text-sm hover:text-white">About Us</Link>
            <Link to="/contact" className="text-sm hover:text-white">Contact</Link>
          </div>

          {/* Categories */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <Link to="/shop/men" className="text-sm hover:text-white">Men's Fashion</Link>
            <Link to="/shop/women" className="text-sm hover:text-white">Women's Fashion</Link>
            <Link to="/shop/kids" className="text-sm hover:text-white">Kids' Fashion</Link>
            <Link to="/shop/accessories" className="text-sm hover:text-white">Accessories</Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-4 md:w-1/4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span className="text-sm">123 Fashion Street, City, Country</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span className="text-sm">+1 234 567 890</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span className="text-sm">info@ecommerce.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              {new Date().getFullYear()} E-Commerce. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm hover:text-white">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-sm hover:text-white">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
