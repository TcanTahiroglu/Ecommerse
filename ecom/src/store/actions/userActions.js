import api from '../../utils/api';
import { loginStart, loginSuccess, loginFailure } from '../reducers/userSlice';

export const loginUser = (credentials, rememberMe = false) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await api.post('/login', credentials);
    const { token, user } = response.data;

    // If remember me is checked, save token to localStorage
    if (rememberMe) {
      localStorage.setItem('token', token);
    }

    dispatch(loginSuccess({ user, token }));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    dispatch(loginFailure(errorMessage));
    throw error;
  }
};
