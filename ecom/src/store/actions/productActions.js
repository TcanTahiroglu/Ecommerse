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
    // Set default pagination values if not provided
    const paginatedParams = {
      limit: params.limit || 25,
      offset: params.offset || 0,
      ...params
    };
    const response = await api.get('/products', { params: paginatedParams });
    
    // API yanıtını işle
    const products = response.data.products || [];
    
    // Toplam ürün sayısını al
    const total = response.data.total_count || products.length;
    
    dispatch(fetchProductsSuccess({
      products,
      total,
      limit: paginatedParams.limit,
      offset: paginatedParams.offset
    }));
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error.response?.data?.message || 'Ürünler yüklenirken bir hata oluştu';
    dispatch(fetchProductsFailure(errorMessage));
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = (productId) => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const response = await api.get(`/products/${productId}`);
    const product = response.data;
    
    dispatch(fetchProductsSuccess({
      products: [product],
      total: 1,
      limit: 1,
      offset: 0
    }));
    return product;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Ürün yüklenirken bir hata oluştu';
    dispatch(fetchProductsFailure(errorMessage));
    throw error;
  }
};

// Clear selected product
export const clearProduct = () => (dispatch) => {
  // No changes made to this function
  // dispatch(clearSelectedProduct()); // This line was removed
};

// Fetch products by category
export const fetchProductsByCategory = (categoryId, params = {}) => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const response = await api.get(`/categories/${categoryId}/products`, { params });
    
    const products = response.data.products || [];
    const total = response.data.total_count || products.length;
    
    dispatch(fetchProductsSuccess({
      products,
      total,
      limit: params.limit || 25,
      offset: params.offset || 0
    }));
    return products;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Kategori ürünleri yüklenirken bir hata oluştu';
    dispatch(fetchProductsFailure(errorMessage));
    throw error;
  }
};
