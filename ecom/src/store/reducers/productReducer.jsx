// reducers/productReducer.js

const initialState = {
  products: [],
  total: 0,
  isLoading: false, // Loading durumu
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    case 'SET_TOTAL':
      return {
        ...state,
        total: action.payload,
      };
    case 'SET_FETCH_STATE':
      return {
        ...state,
        isLoading: action.payload, // Loading durumu
      };
    default:
      return state;
  }
};

export default productReducer;
