import api from '../../utils/api';
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure
} from '../reducers/categorySlice';

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(fetchCategoriesStart());
    
    const response = await api.get('/categories');
    dispatch(fetchCategoriesSuccess(response.data));
  } catch (error) {
    console.error('Category fetch error:', error.message);
    dispatch(fetchCategoriesFailure('Failed to fetch categories'));
  }
};
