// actions/productActions.js

import api from '../../utils/api';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSelectedProduct,
  clearSelectedProduct
} from '../reducers/productReducer';

// Fetch all products
export const fetchProducts = (params = {}) => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const response = await api.get('/products', { params });
    dispatch(fetchProductsSuccess(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch products';
    dispatch(fetchProductsFailure(errorMessage));
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = (productId) => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const response = await api.get(`/products/${productId}`);
    dispatch(setSelectedProduct(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch product';
    dispatch(fetchProductsFailure(errorMessage));
    throw error;
  }
};

// Clear selected product
export const clearProduct = () => (dispatch) => {
  dispatch(clearSelectedProduct());
};

// Fetch products by category
export const fetchProductsByCategory = (categoryId, params = {}) => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const response = await api.get(`/categories/${categoryId}/products`, { params });
    dispatch(fetchProductsSuccess(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch products by category';
    dispatch(fetchProductsFailure(errorMessage));
    throw error;
  }
};
