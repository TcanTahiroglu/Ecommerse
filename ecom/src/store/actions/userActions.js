import api from '../../utils/api';
import { loginStart, loginSuccess, loginFailure } from '../reducers/userSlice';

export const loginUser = (credentials, rememberMe = false) => async (dispatch) => {
  try {
    dispatch(loginStart());

    // API'nin beklediği formatta veri gönderiyoruz
    const loginData = {
      email: credentials.email,
      password: credentials.password
    };

    console.log('Login request:', loginData);
    const response = await api.post('/login', loginData);
    console.log('Login response:', response.data);
    
    const { token, user } = response.data;

    // If remember me is checked, save token to localStorage
    if (rememberMe) {
      localStorage.setItem('token', token);
    }

    dispatch(loginSuccess({ user, token }));
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data);
    const errorMessage = error.response?.data?.message || 'Login failed';
    dispatch(loginFailure(errorMessage));
    throw error;
  }
};
