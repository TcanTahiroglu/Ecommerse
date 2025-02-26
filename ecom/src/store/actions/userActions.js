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
    console.log('Login response:', response.data);
    
    // API'den gelen user bilgisini kontrol et
    const { token, email, role_id } = response.data;
    const user = {
      name: email.split('@')[0], // email'den kullanıcı adını al
      email,
      role_id
    };

    // Token'ı sadece remember me seçiliyse localStorage'a kaydet
    if (rememberMe) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      // Remember me seçili değilse sessionStorage'a kaydet
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
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
