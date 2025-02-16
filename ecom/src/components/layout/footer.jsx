import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 w-full mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start">
          {/* Sol Taraf - Logo */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">VitaClassic</h2>
          </div>

          {/* Sosyal Medya */}
          <div className="flex space-x-4 mb-6">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
          </div>
        </div>

        {/* Footer Link Grupları */}
        <div className="grid md:grid-cols-5 gap-8 mt-8 text-gray-400 text-sm">
          <div>
            <h3 className="text-white font-semibold mb-3">Company Info</h3>
            <ul>
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Career</li>
              <li className="hover:text-white cursor-pointer">We are Hiring</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul>
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Career</li>
              <li className="hover:text-white cursor-pointer">We are Hiring</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Features</h3>
            <ul>
              <li className="hover:text-white cursor-pointer">Business Marketing</li>
              <li className="hover:text-white cursor-pointer">Use Analytics</li>
              <li className="hover:text-white cursor-pointer">Live Chat</li>
              <li className="hover:text-white cursor-pointer">Unlimited Support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul>
              <li className="hover:text-white cursor-pointer">iOS & Android</li>
              <li className="hover:text-white cursor-pointer">Watch a Demo</li>
              <li className="hover:text-white cursor-pointer">Customers</li>
              <li className="hover:text-white cursor-pointer">API</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Get in Touch</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="p-2 rounded-l-md bg-gray-800 border border-gray-700 text-white outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
          Made with ❤️ by Finland - All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
