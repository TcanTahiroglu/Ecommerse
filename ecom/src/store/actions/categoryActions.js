import axios from 'axios';
import { 
  setCategoriesLoading,
  setCategoriesSuccess,
  setCategoriesError 
} from '../reducers/categorySlice';

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(setCategoriesLoading());
    
    const { data } = await axios.get('/categories');
    
    dispatch(setCategoriesSuccess(data));
  } catch (error) {
    dispatch(setCategoriesError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    ));
  }
};
