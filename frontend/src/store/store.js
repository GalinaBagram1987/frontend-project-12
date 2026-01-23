import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import chatSliceReduser from './chatSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatSliceReduser,
    // другие редюсеры
  },
})
