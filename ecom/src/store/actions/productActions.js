// actions/productActions.js

import api from '../../utils/api';
import { 
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure
} from '../reducers/productSlice';

// Fetch all products with pagination and optional query parameters
export const fetchProducts = (params = {}) => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const response = await api.get('/products', { params });
    dispatch(fetchProductsSuccess({
      products: response.data.products,
      total: response.data.total,
      limit: params.limit || 25,
      offset: params.offset || 0
    }));
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Ürünler yüklenirken bir hata oluştu';
    dispatch(fetchProductsFailure(errorMessage));
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (categoryId, params = {}) => {
  try {
    const response = await api.get(`/products/category/${categoryId}`, { params });
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
