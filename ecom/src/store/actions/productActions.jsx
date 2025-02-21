// actions/productActions.js

// Ürünleri API'den çekme eylemi
export const fetchProducts = () => async (dispatch) => {
  dispatch(setFetchState(true));  // Loading spinner'ı başlat

  try {
    const response = await fetch('/products'); // API isteği
    const data = await response.json();

    dispatch(setTotal(data.total));  // Toplam ürün sayısını set et
    dispatch(setProductList(data.products));  // Ürünleri set et
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    dispatch(setFetchState(false));  // Loading spinner'ı durdur
  }
};

// Diğer eylemler
export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  payload: categories,
});

export const setProductList = (products) => ({
  type: 'SET_PRODUCT_LIST',
  payload: products,
});

export const setTotal = (total) => ({
  type: 'SET_TOTAL',
  payload: total,
});

export const setFetchState = (state) => ({
  type: 'SET_FETCH_STATE',
  payload: state,
});

export const setLimit = (limit) => ({
  type: 'SET_LIMIT',
  payload: limit,
});

export const setOffset = (offset) => ({
  type: 'SET_OFFSET',
  payload: offset,
});

export const setFilter = (filter) => ({
  type: 'SET_FILTER',
  payload: filter,
});
