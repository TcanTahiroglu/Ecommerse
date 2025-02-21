import axios from 'axios';
import { toast } from 'react-toastify'; // Toaster mesajları için

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/login', { email, password });
    const { token, user } = response.data;

    // Kullanıcı bilgilerini reducer'a ekle
    dispatch({
      type: 'SET_USER',
      payload: { token, user },
    });

    // Token'ı localStorage'a kaydet (eğer remember me işaretlenmişse)
    localStorage.setItem('token', token);

    toast.success('Logged in successfully!');
  } catch (error) {
    toast.error('Login failed! Please check your credentials.');
  }
};
