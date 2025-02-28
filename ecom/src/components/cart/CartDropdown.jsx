import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateItemCount, toggleItemCheck, toggleCartDropdown } from '../../store/reducers/cartSlice';
import './CartDropdown.css';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const { cart, total, isOpen } = useSelector((state) => state.cart);

  // Debug log
  useEffect(() => {
    console.log('CartDropdown Render - Cart State:', cart);
    console.log('CartDropdown Render - isOpen:', isOpen);
  }, [cart, isOpen]);

  const handleRemoveItem = (e, productId) => {
    e.stopPropagation();
    dispatch(removeFromCart(productId));
  };

  const handleUpdateCount = (e, productId, newCount) => {
    e.stopPropagation();
    dispatch(updateItemCount({ productId, count: newCount }));
  };

  const handleToggleCheck = (e, productId) => {
    e.stopPropagation();
    dispatch(toggleItemCheck(productId));
  };

  if (!isOpen) return null;

  return (
    <div className="cart-dropdown" onClick={(e) => e.stopPropagation()}>
      <div className="cart-header">
        <h3>Sepetim ({cart.length} Ürün)</h3>
        <button 
          onClick={() => dispatch(toggleCartDropdown())}
          className="close-button"
        >
          ×
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Sepetinizde ürün bulunmamaktadır.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.product.images && item.product.images[0]?.url || 'https://placehold.co/100x100'} 
                    alt={item.product.name}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/100x100';
                      e.target.onerror = null;
                    }}
                  />
                </div>
                <div className="item-details">
                  <h4>{item.product.name}</h4>
                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button 
                        onClick={(e) => handleUpdateCount(e, item.product.id, item.count - 1)}
                        disabled={item.count <= 1}
                      >
                        -
                      </button>
                      <span>{item.count}</span>
                      <button 
                        onClick={(e) => handleUpdateCount(e, item.product.id, item.count + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="price">
                      {(item.product.price * item.count).toFixed(2)}₺
                    </div>
                    <button 
                      onClick={(e) => handleRemoveItem(e, item.product.id)}
                      className="remove-button"
                    >
                      Sil
                    </button>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => handleToggleCheck(e, item.product.id)}
                  className="item-checkbox"
                />
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="total">
              <span>Toplam:</span>
              <span className="total-price">{total.toFixed(2)}₺</span>
            </div>
            <Link 
              to="/cart" 
              className="checkout-button"
              onClick={() => dispatch(toggleCartDropdown())}
            >
              Sepete Git
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
