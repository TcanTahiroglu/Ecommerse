<<<<<<< HEAD
// reducers/productReducer.js

const initialState = {
  products: [],
  total: 0,
  isLoading: false, // Loading durumu
=======
const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: "",
  fetchState: "NOT_FETCHED", // "NOT_FETCHED", "FETCHING", "FETCHED", "FAILED"
>>>>>>> 53788646f71bbd2f86816460fe09050d2c71013b
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
<<<<<<< HEAD
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
=======
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_PRODUCT_LIST":
      return { ...state, productList: action.payload };
    case "SET_TOTAL":
      return { ...state, total: action.payload };
    case "SET_FETCH_STATE":
      return { ...state, fetchState: action.payload };
    case "SET_LIMIT":
      return { ...state, limit: action.payload };
    case "SET_OFFSET":
      return { ...state, offset: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
>>>>>>> 53788646f71bbd2f86816460fe09050d2c71013b
    default:
      return state;
  }
};

export default productReducer;
