// actions/productActions.js

import axios from 'axios';
import { 
  setProductsLoading,
  setProductsSuccess,
  setProductsError,
  appendProducts
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

    // Zorunlu parametreler
    queryParams.append('limit', limit);
    queryParams.append('offset', offset);

    // Opsiyonel parametreler
    if (category) queryParams.append('category', category);
    if (filter) queryParams.append('filter', filter);
    if (sort) queryParams.append('sort', sort);
    
    console.log('Loading more products with params:', queryParams.toString());
    const { data } = await axios.get(`/products?${queryParams.toString()}`);
    console.log('Received more products data:', data);
    
    dispatch(appendProducts(data));
  } catch (error) {
    console.error('Error loading more products:', error);
    dispatch(setProductsError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    ));
  }
};

// Fetch a single product by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (categoryId, params = {}) => {
  try {
    const response = await axios.get(`/products/category/${categoryId}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Clear selected product
export const clearProduct = () => (dispatch) => {
  // No changes made to this function
  // dispatch(clearSelectedProduct()); // This line was removed
};
