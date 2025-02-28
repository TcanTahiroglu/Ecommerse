import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import categoryReducer from './reducers/categorySlice';
import productReducer from './reducers/productSlice';
import cartReducer from './reducers/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    user: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Burada bazı durumlar için serializableCheck devre dışı bırakıldı
        // Özellikle tarih ve karmaşık nesneler için
        ignoredActions: ['products/fetchProducts/fulfilled'],
        ignoredPaths: ['products.items'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
