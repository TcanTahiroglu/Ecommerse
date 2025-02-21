import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  // Mock cart data - replace with actual cart state
  const [cartItems, setCartItems] = React.useState([
    {
      id: 1,
      name: 'Classic T-Shirt',
      price: 29.99,
      quantity: 2,
      size: 'M',
      color: 'White',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Denim Jeans',
      price: 59.99,
      quantity: 1,
      size: '32',
      color: 'Blue',
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cartItems.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <Link
                  to="/shop"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="ml-6 flex-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-600">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <div className="mt-2 flex items-center">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-2 border-x">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-4 text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="ml-6 text-right">
                        <p className="text-lg font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-gray-600">${item.price} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
                Proceed to Checkout
              </button>
              <Link
                to="/shop"
                className="block text-center mt-4 text-blue-600 hover:text-blue-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
