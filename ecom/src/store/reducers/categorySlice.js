import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  loading: false,
  error: null,
  lastFetched: null
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loading = false;
      // Ensure we always store an array
      state.categories = Array.isArray(action.payload) ? action.payload : [];
      state.error = null;
      state.lastFetched = new Date().toISOString();
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.categories = [];
    },
    clearCategories: (state) => {
      state.categories = [];
      state.error = null;
      state.loading = false;
      state.lastFetched = null;
    }
  }
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  clearCategories
} = categorySlice.actions;

export default categorySlice.reducer;
