// actions/productActions.js

import axios from 'axios';
import { 
  setProductsLoading,
  setProductsSuccess,
  setProductsError,
  appendProducts,
  setCurrentProductLoading,
  setCurrentProductSuccess,
  setCurrentProductError,
  clearCurrentProduct
} from '../reducers/productSlice';

// API base URL'ini ayarla
axios.defaults.baseURL = 'https://workintech-fe-ecommerce.onrender.com';

// Fetch all products with pagination and optional query parameters
export const fetchProducts = (params = {}) => async (dispatch) => {
  try {
    dispatch(setProductsLoading());
    
    const { limit = 25, offset = 0, category, filter, sort } = params;
    const queryParams = new URLSearchParams();

    // Zorunlu parametreler
    queryParams.append('limit', limit);
    queryParams.append('offset', offset);

    // Opsiyonel parametreler
    if (category) queryParams.append('category', category);
    if (filter) queryParams.append('filter', filter);
    if (sort) queryParams.append('sort', sort);
    
    console.log('Fetching products with params:', queryParams.toString());
    const { data } = await axios.get(`/products?${queryParams.toString()}`);
    console.log('Received products data:', data);
    
    dispatch(setProductsSuccess(data));
  } catch (error) {
    console.error('Error fetching products:', error);
    dispatch(setProductsError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    ));
  }
};

export const loadMoreProducts = (params = {}) => async (dispatch) => {
  try {
    dispatch(setProductsLoading());
    
    const { limit = 25, offset = 0, category, filter, sort } = params;
    const queryParams = new URLSearchParams();

    queryParams.append('limit', limit);
    queryParams.append('offset', offset);
    if (category) queryParams.append('category', category);
    if (filter) queryParams.append('filter', filter);
    if (sort) queryParams.append('sort', sort);
    
    const { data } = await axios.get(`/products?${queryParams.toString()}`);
    dispatch(appendProducts(data));
  } catch (error) {
    dispatch(setProductsError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    ));
  }
};

// Fetch a single product by ID
export const fetchProductById = (productId) => async (dispatch) => {
  try {
    dispatch(setCurrentProductLoading());
    const { data } = await axios.get(`/products/${productId}`);
    dispatch(setCurrentProductSuccess(data));
  } catch (error) {
    dispatch(setCurrentProductError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    ));
  }
};

// Clear current product from state
export const clearProduct = () => (dispatch) => {
  dispatch(clearCurrentProduct());
};
