import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import userReducer from './reducers/userSlice';
import categoryReducer from './reducers/categorySlice';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';

// Create logger middleware
const loggerMiddleware = process.env.NODE_ENV === 'development' ? createLogger() : null;

// Define middleware array
const middleware = (getDefaultMiddleware) => {
  const middlewares = getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
  });

  // Only add logger in development
  if (loggerMiddleware) {
    middlewares.push(loggerMiddleware);
  }

  return middlewares;
};

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
    products: productReducer,
    shoppingCart: shoppingCartReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
