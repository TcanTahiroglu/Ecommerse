// actions/productActions.js

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
