import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import categoryReducer from './reducers/categorySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
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
