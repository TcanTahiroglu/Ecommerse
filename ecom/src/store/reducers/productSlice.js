// src/store/reducers/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    limit: 25,
    offset: 0,
    currentPage: 1
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.pagination = {
        ...state.pagination,
        total: action.payload.total || action.payload.products.length,
        limit: action.payload.limit || state.pagination.limit,
        offset: action.payload.offset || 0,
        currentPage: Math.floor((action.payload.offset || 0) / (action.payload.limit || state.pagination.limit)) + 1
      };
      state.error = null;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.products = [];
      state.pagination = {
        ...initialState.pagination
      };
    }
  }
});

export const { 
  fetchProductsStart, 
  fetchProductsSuccess, 
  fetchProductsFailure 
} = productSlice.actions;

export default productSlice.reducer;