import { createStore, applyMiddleware, combineReducers } from 'redux';
<<<<<<< HEAD
import {thunk} from 'redux-thunk'; // redux-thunk doğru import ediliyor
=======
import {thunk} from 'redux-thunk';
>>>>>>> 53788646f71bbd2f86816460fe09050d2c71013b
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
<<<<<<< HEAD
const middleware = [thunk]; // thunk middleware

// Geliştirme ortamında logger ekleniyor
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger); // Logger sadece geliştirme ortamında aktif
=======
const middleware = [thunk];

// Geliştirme ortamında logger ekleniyor
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
>>>>>>> 53788646f71bbd2f86816460fe09050d2c71013b
}

// Store oluşturuluyor
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
