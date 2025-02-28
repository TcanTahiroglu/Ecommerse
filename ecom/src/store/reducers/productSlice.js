// src/store/reducers/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 25,
    hasMore: true
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.pagination = {
        ...state.pagination,
        totalItems: action.payload.total,
        hasMore: action.payload.total > state.pagination.itemsPerPage * state.pagination.currentPage
      };
    },
    setProductsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    appendProducts: (state, action) => {
      state.loading = false;
      state.products = [...state.products, ...action.payload.products];
      state.pagination = {
        ...state.pagination,
        totalItems: action.payload.total,
        hasMore: action.payload.total > state.pagination.itemsPerPage * state.pagination.currentPage
      };
    },
    // New reducers for single product
    setCurrentProductLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setCurrentProductSuccess: (state, action) => {
      state.loading = false;
      state.currentProduct = action.payload;
    },
    setCurrentProductError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    }
  },
});

export const {
  setProductsLoading,
  setProductsSuccess,
  setProductsError,
  setCurrentPage,
  appendProducts,
  setCurrentProductLoading,
  setCurrentProductSuccess,
  setCurrentProductError,
  clearCurrentProduct
} = productSlice.actions;

export default productSlice.reducer;