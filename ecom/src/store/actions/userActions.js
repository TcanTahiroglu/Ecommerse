import api, { setAuthToken } from '../../utils/api';
import { loginStart, loginSuccess, loginFailure, logout } from '../reducers/userSlice';

export const loginUser = (credentials, rememberMe = false) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const loginData = {
      email: credentials.email,
      password: credentials.password
    };

    const response = await api.post('/login', loginData);
    const { token, email, name, role_id } = response.data;

    // Token'ı sadece rememberMe true ise localStorage'a kaydet
    if (rememberMe) {
      setAuthToken(token);
    } else {
      // Sadece API header'ına ekle
      api.defaults.headers.common['Authorization'] = token;
    }

    dispatch(loginSuccess({ token, email, name, role_id }));
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data);
    const errorMessage = error.response?.data?.message || 'Login failed';
    dispatch(loginFailure(errorMessage));
    throw error;
  }
};

export const verifyToken = () => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await api.get('/verify');
    const { token, email, name, role_id } = response.data;

    // Token'ı yenile
    setAuthToken(token);

    dispatch(loginSuccess({ token, email, name, role_id }));
    return response.data;
  } catch (error) {
    console.error('Token verification error:', error);
    // Token geçersiz ise temizle
    setAuthToken(null);
    dispatch(logout());
    throw error;
  }
};
