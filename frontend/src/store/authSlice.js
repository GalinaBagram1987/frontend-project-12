import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../utils/localStorage.js';

const initialState = {
  token: storage.getToken(),
  user: storage.getUserData(),
  isAuthenticated: !!storage.isAuthenticated(),
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

    Logout: (state) => {
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

export const { loginSuccess, Logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
