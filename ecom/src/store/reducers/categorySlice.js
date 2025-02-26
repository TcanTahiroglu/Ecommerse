import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  topCategories: [],
  loading: false,
  error: null
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
      // API'den gelen veriyi düzenle
      const formattedCategories = action.payload.map(category => ({
        id: category.id,
        name: category.name || category.title,
        code: category.code || category.name?.toLowerCase().replace(/\s+/g, '-'),
        gender: category.gender || 'u', // unisex varsayılan olarak
        rating: category.rating || 0,
        image: category.image || category.img
      }));
      
      state.categories = formattedCategories;
      // En yüksek rating'e sahip 5 kategoriyi seç
      state.topCategories = [...formattedCategories]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5);
      state.error = null;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.categories = [];
      state.topCategories = [];
    }
  }
});

export const { 
  fetchCategoriesStart, 
  fetchCategoriesSuccess, 
  fetchCategoriesFailure 
} = categorySlice.actions;

export default categorySlice.reducer;
