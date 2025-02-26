import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import userReducer from './reducers/userSlice';
import categoryReducer from './reducers/categorySlice';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';

const getMiddleware = () => {
  const middlewares = [];

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      collapsed: true,
    });
    middlewares.push(logger);
  }

  return middlewares;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
    products: productReducer,
    shoppingCart: shoppingCartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getMiddleware()),
});
