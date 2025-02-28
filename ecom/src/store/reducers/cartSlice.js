import { createSlice } from '@reduxjs/toolkit';

// Yerel depolamadan sepeti yükleme
const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Sepet verileri yüklenirken hata oluştu:', error);
    return [];
  }
};

// Sepeti yerel depolamaya kaydetme
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Sepet verileri kaydedilirken hata oluştu:', error);
  }
};

const initialState = {
  cart: loadCartFromStorage(),
  isOpen: false, // Dropdown'ın açık/kapalı durumu
  total: 0, // Toplam fiyat
};

// Toplam fiyatı hesaplayan yardımcı fonksiyon
const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + (item.checked ? Number(item.product.price) * item.count : 0);
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Gelen ürün
      const product = action.payload;
      
      if (!product || !product.id) {
        console.error('Geçersiz ürün verisi:', product);
        return;
      }
      
      console.log('Ürün sepete ekleniyor:', product);
      console.log('Mevcut sepet:', state.cart);
      
      // Ürün id'sine göre sepette arama yap
      const existingItemIndex = state.cart.findIndex(item => 
        item.product && item.product.id && item.product.id === product.id
      );
      
      console.log('Bulunan ürün indeksi:', existingItemIndex);

      if (existingItemIndex >= 0) {
        // Ürün zaten sepette varsa adedini artır
        state.cart[existingItemIndex].count += 1;
        console.log('Ürün sayısı artırıldı');
      } else {
        // Ürün sepette yoksa yeni ekle
        state.cart.push({
          count: 1,
          checked: true,
          product
        });
        console.log('Yeni ürün sepete eklendi');
      }

      // Toplam fiyatı güncelle
      state.total = calculateTotal(state.cart);
      
      // Sepeti yerel depolamaya kaydet
      saveCartToStorage(state.cart);
      
      // Ürün eklendiğinde dropdown'ı aç
      state.isOpen = true;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter(item => item.product.id !== productId);
      
      // Toplam fiyatı güncelle
      state.total = calculateTotal(state.cart);
      
      // Sepeti yerel depolamaya kaydet
      saveCartToStorage(state.cart);
    },
    updateItemCount: (state, action) => {
      const { productId, count } = action.payload;
      const item = state.cart.find(item => item.product.id === productId);
      
      if (item) {
        item.count = Math.max(1, count); // Count en az 1 olabilir
      }

      // Toplam fiyatı güncelle
      state.total = calculateTotal(state.cart);
      
      // Sepeti yerel depolamaya kaydet
      saveCartToStorage(state.cart);
    },
    toggleItemCheck: (state, action) => {
      const productId = action.payload;
      const item = state.cart.find(item => item.product.id === productId);
      
      if (item) {
        item.checked = !item.checked;
      }

      // Toplam fiyatı güncelle
      state.total = calculateTotal(state.cart);
      
      // Sepeti yerel depolamaya kaydet
      saveCartToStorage(state.cart);
    },
    toggleCartDropdown: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.cart = [];
      state.total = 0;
      
      // Sepeti yerel depolamadan temizle
      localStorage.removeItem('cart');
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateItemCount, 
  toggleItemCheck,
  toggleCartDropdown,
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
