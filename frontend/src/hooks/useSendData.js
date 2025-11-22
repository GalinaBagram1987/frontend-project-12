import { useDispath } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess } from '../store/authSlice';
import { baseUrl } from '../api/routes.js';

export const useSendData = createAsyncThunk(
  const response = await baseUrl.login(formData);
  
);
