import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: []
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.cart = [];
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;

// Add item to cart
export const addItemToCart = (product) => (dispatch) => {
  dispatch(addToCart(product));
};

// Remove item from cart
export const removeItemFromCart = (productId) => (dispatch) => {
  dispatch(removeFromCart(productId));
};

// Update item quantity
export const updateItemQuantity = (productId, quantity) => (dispatch) => {
  dispatch(updateQuantity({ id: productId, quantity }));
};

// Clear shopping cart
export const clearShoppingCart = () => (dispatch) => {
  dispatch(clearCart());
};