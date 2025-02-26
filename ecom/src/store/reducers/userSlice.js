import { createSlice } from '@reduxjs/toolkit';

// localStorage veya sessionStorage'dan token ve user bilgisini al
const getStoredToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || null;
};

const getStoredUser = () => {
  const localUser = localStorage.getItem('user');
  const sessionUser = sessionStorage.getItem('user');
  if (localUser) return JSON.parse(localUser);
  if (sessionUser) return JSON.parse(sessionUser);
  return null;
};

const initialState = {
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      // Her iki storage'dan da temizle
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
