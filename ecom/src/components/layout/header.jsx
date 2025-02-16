import React, { useState } from "react";
import data from "../../data";
import { FaUser, FaSearch, FaShoppingCart, FaBars, FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa"; // React Icons

const Header = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false); // Menü durumunu kontrol etmek için state
  const [shopMenuActive, setShopMenuActive] = useState(false); // Shop menüsünü kontrol etmek için state
  const { primary, secondary, tertiary, quaternary, menuBackground, menuText } = data.colors;
  const { phone, email, campaign } = data.contact; // Yeni eklediğimiz contact bilgileri
  const { shopCategories } = data; // Kategoriler

  return (
<header className="sm:fixed sm:top-0 sm:left-0 sm:w-full sm:z-50 relative">

      {/* Yeni Üst Bölüm */}
      <div
        style={{ backgroundColor: secondary, color: tertiary }}
        className="hidden sm:flex justify-between items-center p-2 text-sm"
      >
        <div className="flex space-x-8">
          <div>
            <span>Telefon: {phone}</span>
          </div>
          <div>
            <span>Email: {email}</span>
          </div>
          <div>
            <span>{campaign}</span>
          </div>
        </div>
        {/* Sosyal Medya İkonları */}
        <div className="flex space-x-4">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-tertiary" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-tertiary" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-2xl hover:text-tertiary" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl hover:text-tertiary" />
          </a>
        </div>
      </div>

      {/* Header kısmı */}
      <div
        style={{ backgroundColor: primary, color: tertiary }}
        className="flex items-center justify-between p-3"
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="text-lg font-bold">Logo</div>
        </div>

        {/* Navbar (Navigation) Menüsü */}
        <div className="flex-1 hidden sm:flex justify-center space-x-6 relative">
          <a href="/" className="text-sm hover:text-tertiary">
            Home
          </a>

          {/* Shop menüsünü*/}
          <div className="relative">
            <button
              onClick={() => setShopMenuActive(!shopMenuActive)}
              className="text-sm hover:text-tertiary"
            >
              Shop
            </button>
            {shopMenuActive && (
              <div
                style={{ backgroundColor: menuBackground, color: menuText }}
                className="absolute top-full left-0 mt-2 p-2 rounded-md w-48"
              >
                <div className="flex space-x-4">
                  {shopCategories.map((category, index) => (
                    <div key={index} className="w-1/3">
                      <div className="font-bold text-sm py-2">{category.name}</div>
                      <div className="space-y-2">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <a
                            key={subIndex}
                            href={subcategory.link}
                            className="block py-2 text-sm hover:text-tertiary"
                          >
                            {subcategory.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href="/about" className="text-sm hover:text-tertiary">
            About
          </a>
          <a href="/blog" className="text-sm hover:text-tertiary">
            Blog
          </a>
          <a href="/contact" className="text-sm hover:text-tertiary">
            Contact
          </a>
          <a href="/pages" className="text-sm hover:text-tertiary">
            Pages
          </a>
        </div>

        {/* Profil İkonları ve Hamburger Menü */}
        <div className="flex items-center space-x-6 ml-4">
          <button
            style={{ backgroundColor: secondary, color: tertiary }}
            className="p-2 rounded-full"
          >
            <FaUser />
          </button>

          <div className="relative">
            <button
              onClick={() => setSearchActive(!searchActive)}
              style={{ backgroundColor: secondary, color: tertiary }}
              className="p-2 rounded-full"
            >
              <FaSearch />
            </button>
            {searchActive && (
              <input
                type="text"
                placeholder="Arama yap..."
                style={{ backgroundColor: quaternary, color: primary }}
                className="absolute left-0 top-full mt-2 p-1 w-40 rounded-md text-sm"
              />
            )}
          </div>

          <button
            style={{ backgroundColor: secondary, color: tertiary }}
            className="p-2 rounded-full"
          >
            <FaShoppingCart />
          </button>

          {/* Hamburger Menü */}
          <button
            onClick={() => setMenuActive(!menuActive)} // Menü için toggling işlemi
            style={{ backgroundColor: secondary, color: tertiary }}
            className="p-2 rounded-full sm:hidden"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Navbar (Navigation) Menüsü Alt Satıra Alındı */}
      {/* Mobil Navbar */}
      <div className="sm:hidden mt-4">
        <a href="/" className="block text-sm py-2">
          Home
        </a>
        <a href="/product" className="block text-sm py-2">
          Product
        </a>
        <a href="/pricing" className="block text-sm py-2">
          Pricing
        </a>
        <a href="/contact" className="block text-sm py-2">
          Contact
        </a>
      </div>

      {/* Menü (Mobil İçin), içi boş */}
      {menuActive && (
        <div
          style={{ backgroundColor: quaternary, color: primary }}
          className="absolute top-full right-0 mt-2 p-2 rounded-md sm:hidden"
        >
          {/* Menü öğeleri boş bırakıldı */}
        </div>
      )}
    </header>
  );
};

export default Header;
