// reducers/productReducer.js

const initialState = {
  categories: [],       // Kategoriler
  productList: [],      // Ürünler
  total: 0,             // Ürünlerin toplam sayısı
  limit: 25,            // Sayfa başına ürün sayısı
  offset: 0,            // Sayfa ofseti
  filter: "",           // Filtreleme durumu
  fetchState: "NOT_FETCHED",  // "NOT_FETCHED", "FETCHING", "FETCHED", "FAILED" gibi durumlar
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default productReducer;
