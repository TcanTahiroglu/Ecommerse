import { createSlice } from '@reduxjs/toolkit';
import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAIL } from '../constants/categoryConstants';

const initialState = {
  categories: [],
  womenCategories: [],
  menCategories: [],
  topCategories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoriesLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      
      // Kadın ve erkek kategorilerini ayır
      state.womenCategories = action.payload.filter(cat => cat.gender === 'k');
      state.menCategories = action.payload.filter(cat => cat.gender === 'e');
      
      // En yüksek rating'e sahip 5 kategoriyi al
      state.topCategories = [...action.payload]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
    },
    setCategoriesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setCategoriesLoading, setCategoriesSuccess, setCategoriesError } = categorySlice.actions;
export default categorySlice.reducer;
