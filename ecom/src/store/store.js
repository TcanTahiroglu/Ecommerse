import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; // redux-thunk doğru import ediliyor
import logger from 'redux-logger';

// Reducer'lar
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';

// Root reducer
const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
});

// Middleware'lar
const middleware = [thunk]; // thunk middleware

// Geliştirme ortamında logger ekleniyor
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger); // Logger sadece geliştirme ortamında aktif
}

// Store oluşturuluyor
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
