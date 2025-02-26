import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import categoryReducer from './reducers/categorySlice';
import productReducer from './reducers/productSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
