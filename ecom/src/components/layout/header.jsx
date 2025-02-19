import React, { useState, useEffect } from "react";
import data from "../../data";
import { FaUser, FaSearch, FaShoppingCart, FaBars, FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const Header = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [shopMenuActive, setShopMenuActive] = useState(false);
  const [profileMenuActive, setProfileMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Giriş durumu için state ekledim

  const { primary, secondary, tertiary, quaternary, menuBackground, menuText } = data.colors;
  const { phone, email, campaign } = data.contact;
  const { shopCategories } = data;

  // Arama kutusu dışına tıklanınca kapanmasını sağlamak için useEffect
  useEffect(() => {
    const closeSearchOnClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setSearchActive(false);
      }
    };

    document.addEventListener("click", closeSearchOnClickOutside);

    return () => {
      document.removeEventListener("click", closeSearchOnClickOutside);
    };
  }, []);

  return (
    <header className="sm:fixed sm:top-0 sm:left-0 sm:w-full sm:z-50 relative">
      {/* Üst Bölüm */}
      <div
        style={{ backgroundColor: secondary, color: tertiary }}
        className="hidden sm:flex justify-between items-center p-2 text-sm"
      >
        <div className="flex space-x-8">
          <div><span>Telefon: {phone}</span></div>
          <div><span>Email: {email}</span></div>
          <div><span>{campaign}</span></div>
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

      {/* Header */}
      <div style={{ backgroundColor: primary, color: tertiary }} className="flex items-center justify-between p-3">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="text-lg font-bold">Logo</div>
        </div>

        {/* Navbar */}
        <div className="flex-1 hidden sm:flex justify-center space-x-6 relative">
          <a href="/" className="text-sm hover:text-tertiary">Home</a>

          {/* Shop Menü */}
          <div className="relative">
            <button onClick={() => setShopMenuActive(!shopMenuActive)} className="text-sm hover:text-tertiary">
              Shop
            </button>
            {shopMenuActive && (
              <div style={{ backgroundColor: menuBackground, color: menuText }} className="absolute top-full left-0 mt-2 p-2 rounded-md w-48">
                <div className="flex space-x-4">
                  {shopCategories.map((category, index) => (
                    <div key={index} className="w-1/3">
                      <div className="font-bold text-sm py-2">{category.name}</div>
                      <div className="space-y-2">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <a key={subIndex} href={subcategory.link} className="block py-2 text-sm hover:text-tertiary">
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

          <a href="/about" className="text-sm hover:text-tertiary">About</a>
          <a href="/blog" className="text-sm hover:text-tertiary">Blog</a>
          <a href="/contact" className="text-sm hover:text-tertiary">Contact</a>
          <a href="/pages" className="text-sm hover:text-tertiary">Pages</a>
        </div>

        {/* Profil İkonu ve Hamburger Menü */}
        <div className="flex items-center space-x-6 ml-4">
          {/* Profil Butonu */}
          <button style={{ backgroundColor: secondary, color: tertiary }} className="p-2 rounded-full" onClick={() => setProfileMenuActive(!profileMenuActive)}>
            <FaUser />
          </button>

          {/* Profil Dropdown Menü */}
          {profileMenuActive && isLoggedIn && ( // Sadece giriş yapan kullanıcı için gösterilecek
            <div style={{ backgroundColor: menuBackground, color: menuText }} className="absolute top-full right-0 mt-2 p-2 rounded-md">
              <a href="/profile" className="block py-2 text-sm">Profile</a>
              <a href="/logout" className="block py-2 text-sm" onClick={() => setIsLoggedIn(false)}>Logout</a>
            </div>
          )}
          {profileMenuActive && !isLoggedIn && ( // Giriş yapmamışsa Login butonu gösterilir
            <div style={{ backgroundColor: menuBackground, color: menuText }} className="absolute top-full right-0 mt-2 p-2 rounded-md">
              <a href="/login" className="block py-2 text-sm">Login</a>
              <a href="/signup" className="block py-2 text-sm">Sign Up</a>
            </div>
          )}

          {/* Arama Butonu */}
          <div className="relative search-container">
            <button onClick={() => setSearchActive(!searchActive)} style={{ backgroundColor: secondary, color: tertiary }} className="p-2 rounded-full">
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

          <button style={{ backgroundColor: secondary, color: tertiary }} className="p-2 rounded-full">
            <FaShoppingCart />
          </button>

          {/* Hamburger Menü */}
          <button onClick={() => setMenuActive(!menuActive)} style={{ backgroundColor: secondary, color: tertiary }} className="p-2 rounded-full sm:hidden">
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobil Navbar */}
      <div className="sm:hidden mt-4">
        <a href="/" className="block text-sm py-2">Home</a>
        <a href="/product" className="block text-sm py-2">Product</a>
        <a href="/pricing" className="block text-sm py-2">Pricing</a>
        <a href="/contact" className="block text-sm py-2">Contact</a>
      </div>

      {/* Menü (Mobil İçin) */}
      {menuActive && (
        <div style={{ backgroundColor: quaternary, color: primary }} className="absolute top-full right-0 mt-2 p-2 rounded-md sm:hidden">
          {/* Menü öğeleri boş bırakıldı */}
        </div>
      )}
    </header>
  );
};

export default Header;
