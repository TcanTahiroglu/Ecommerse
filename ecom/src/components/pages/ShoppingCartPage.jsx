import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from 'react-icons/fa';
import { removeFromCart, updateItemCount, toggleItemCheck, clearCart } from '../../store/reducers/cartSlice';
import '../../styles/ShoppingCartPage.css';

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.cart);
  // Sabit kargo ücreti ve indirim değerlerini state olarak tutuyoruz (gerçek uygulamada bunlar API'den alınabilir)
  const [shippingCost] = useState(29.99);
  const [discount] = useState(total > 500 ? 29.99 : 0); // Örnek indirim mantığı: Sepet 500₺ üzeriyse kargo bedava

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateCount = (productId, newCount) => {
    dispatch(updateItemCount({ productId, count: newCount }));
  };

  const handleToggleCheck = (productId) => {
    dispatch(toggleItemCheck(productId));
  };

  const handleClearCart = () => {
    if (window.confirm('Sepetteki tüm ürünler silinecek. Emin misiniz?')) {
      dispatch(clearCart());
    }
  };

  const handleCreateOrder = () => {
    // İleriki aşamada uygulanacak sipariş oluşturma fonksiyonu
    alert('Sipariş oluşturma işlevi henüz uygulanmadı.');
  };

  // Toplam ürün sayısı
  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);
  
  // Seçili ürün sayısı
  const selectedItems = cart.filter(item => item.checked).reduce((sum, item) => sum + item.count, 0);

  // Genel toplam tutarı (ürün toplamı + kargo - indirim)
  const grandTotal = total + shippingCost - discount;

  if (cart.length === 0) {
    return (
      <div className="empty-cart-container">
        <h2>Alışveriş Sepetiniz</h2>
        <div className="empty-cart-message">
          <p>Sepetinizde ürün bulunmamaktadır.</p>
          <Link to="/shop" className="continue-shopping-btn">
            <FaArrowLeft /> Alışverişe Devam Et
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-cart-container">
      <div className="cart-header">
        <h2>Alışveriş Sepetiniz ({totalItems} Ürün)</h2>
        <button onClick={handleClearCart} className="clear-cart-btn">
          Sepeti Temizle
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-main-content">
          <div className="cart-table-container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th className="select-column">Seç</th>
                  <th className="product-column">Ürün</th>
                  <th className="price-column">Fiyat</th>
                  <th className="quantity-column">Adet</th>
                  <th className="total-column">Toplam</th>
                  <th className="actions-column">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.product.id} className={item.checked ? 'selected-row' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleToggleCheck(item.product.id)}
                        className="item-checkbox"
                      />
                    </td>
                    <td className="product-info">
                      <div className="product-image">
                        <img 
                          src={item.product.images && item.product.images[0]?.url || 'https://placehold.co/100x100'} 
                          alt={item.product.name}
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/100x100';
                            e.target.onerror = null;
                          }}
                        />
                      </div>
                      <div className="product-details">
                        <h4>{item.product.name}</h4>
                        <p className="product-categories">
                          {item.product.categories?.map(cat => cat.name).join(', ') || 'Kategori Bilgisi Yok'}
                        </p>
                      </div>
                    </td>
                    <td className="price-cell">{Number(item.product.price).toFixed(2)}₺</td>
                    <td>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => handleUpdateCount(item.product.id, item.count - 1)}
                          disabled={item.count <= 1}
                          className="quantity-btn"
                        >
                          <FaMinus />
                        </button>
                        <span className="quantity-display">{item.count}</span>
                        <button 
                          onClick={() => handleUpdateCount(item.product.id, item.count + 1)}
                          className="quantity-btn"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td className="total-cell">{(item.product.price * item.count).toFixed(2)}₺</td>
                    <td>
                      <button 
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="remove-btn"
                        title="Ürünü Sil"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-actions-bottom">
            <Link to="/shop" className="continue-shopping-btn">
              <FaArrowLeft /> Alışverişe Devam Et
            </Link>
          </div>
        </div>

        {/* Sipariş Özeti Bölümü */}
        <div className="order-summary">
          <div className="order-summary-box">
            <h3 className="summary-title">Sipariş Özeti</h3>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Ürünlerin Toplamı</span>
                <span className="price">{total.toFixed(2)}₺</span>
              </div>
              
              <div className="summary-row">
                <span>Kargo Toplam</span>
                <span className="price">{shippingCost.toFixed(2)}₺</span>
              </div>
              
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>İndirim</span>
                  <span className="price">-{discount.toFixed(2)}₺</span>
                </div>
              )}
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Toplam</span>
                <span className="price grand-total">{grandTotal.toFixed(2)}₺</span>
              </div>
            </div>
            
            <button 
              className="create-order-btn" 
              onClick={handleCreateOrder}
              disabled={selectedItems === 0}
            >
              Sipariş Oluştur
            </button>
            
            {selectedItems === 0 && (
              <p className="order-warning">Sipariş oluşturmak için ürün seçmelisiniz.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
