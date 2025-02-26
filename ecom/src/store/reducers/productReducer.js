import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from '../constants/productConstants';

const initialState = {
  products: [],
  loading: false,
  error: null,
  totalProducts: 0,
  limit: 25,
  offset: 0
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts,
        limit: action.payload.limit,
        offset: action.payload.offset
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default productReducer;
