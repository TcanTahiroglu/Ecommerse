import api from '../../utils/api';
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } from '../reducers/categorySlice';

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(fetchCategoriesStart());
    const response = await api.get('/categories');
    
    // Log the full response structure
    console.log('Categories API Full Response:', response);
    console.log('Categories Data Structure:', {
      data: response.data,
      type: typeof response.data,
      isArray: Array.isArray(response.data),
      firstItem: response.data?.[0]
    });

    // Ensure we have an array of categories
    const categories = Array.isArray(response.data) ? response.data :
                      response.data?.categories ? response.data.categories :
                      [];

    dispatch(fetchCategoriesSuccess(categories));
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', {
      error,
      response: error.response,
      message: error.message,
      data: error.response?.data
    });
    
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Failed to fetch categories';
                        
    dispatch(fetchCategoriesFailure(errorMessage));
    throw error;
  }
};
