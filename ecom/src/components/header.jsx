import { useState } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header>
      <div>
        {/* Logo */}
        <a className="text-pink-200" href="/">E-Shop</a>

        {/* Menü */}
        <nav>
          <a href="#">Anasayfa</a>
          <a href="#">Ürünler</a>
          <a href="#">Kampanyalar</a>
          <a href="#">İletişim</a>
        </nav>

        {/* Sağ Taraf - Login, Sepet, Arama ve Menü */}
        <div>
          {/* Login / Register */}
          <a href="#">Login / Register</a>

          {/* Sepet */}
          <button>
            <ShoppingCart size={24} />
          </button>

          {/* Arama Butonu */}
          <div>
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Ürün ara..."
              />
            )}
            <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search size={24} />
            </button>
          </div>

          {/* Mobil Menü Butonu */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      {isMenuOpen && (
        <nav>
          <a href="#">Anasayfa</a>
          <a href="#">Ürünler</a>
          <a href="#">Kampanyalar</a>
          <a href="#">İletişim</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
