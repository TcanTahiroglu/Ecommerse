import { combineReducers } from 'redux';
import clientReducer from './Clientreducer';
import productReducer from './productReducer';
import shoppingCartReducer from './shoppingCartReducer';

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  cart: shoppingCartReducer,
});

export default rootReducer;