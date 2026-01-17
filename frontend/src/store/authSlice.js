import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../utils/localStorage.js';

const tokenFromStorage = storage.getToken();
const userFromStorage = storage.getUserData();

const initialState = {
  token: tokenFromStorage,
  user: userFromStorage,
  isAuthenticated: !!(tokenFromStorage && userFromStorage),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, username } = action.payload;
      console.log('loginSuccess received:', { token, username });
      if (token && username) {
        state.token = token;
        state.user = username;
        state.isAuthenticated = true;

        // Сохраняем в LocalStorage
        storage.setToken(token);
        storage.setUserData(username);
      }
      console.log('Auth state updated:', { token, username });
      console.log('state.user', state.user);
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      // Очищаем LocalStorage
      storage.clearAuth();
    },

    updateUser: (state, action) => {
      state.user = action.payload;

      // Обновляем LocalStorage
      storage.setUserData(action.payload);
    },
  },
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
