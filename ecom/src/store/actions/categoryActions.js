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
    const errorMessage = error.response?.data?.message || 'Failed to fetch categories';
    dispatch(fetchCategoriesFailure(errorMessage));
    throw error;
  }
};
