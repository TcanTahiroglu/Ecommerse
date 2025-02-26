// actions/productActions.js

import axios from 'axios';
import { 
  FETCH_PRODUCTS_REQUEST, 
  FETCH_PRODUCTS_SUCCESS, 
  FETCH_PRODUCTS_FAILURE 
} from '../constants/productConstants';

// API URL'ini tanımlayalım
const API_URL = 'https://workintech-fe-ecommerce.onrender.com';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Fetch all products with pagination and optional query parameters
export const fetchProducts = (limit = 25, offset = 0) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    const { data } = await axiosInstance.get(`/products?limit=${limit}&offset=${offset}`);

    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: {
        products: data.products,
        totalProducts: data.total,
        limit,
        offset
      }
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      payload: error.message
    });
  }
};

// Fetch a single product by ID
export const fetchProductById = (productId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    const response = await axiosInstance.get(`/products/${productId}`);
    const product = response.data;
    
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: {
        products: [product],
        totalProducts: 1,
        limit: 1,
        offset: 0
      }
    });
    return product;
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      payload: error.message
    });
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
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    const response = await axiosInstance.get(`/products/category/${categoryId}`);
    
    const products = response.data || [];
    const total = products.length;
    
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: {
        products,
        totalProducts: total,
        limit: params.limit || 25,
        offset: params.offset || 0
      }
    });
    return products;
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      payload: error.message
    });
    throw error;
  }
};
