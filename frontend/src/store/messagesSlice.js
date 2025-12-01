import { createSlice, current } from '@reduxjs/toolkit';
import { storage } from '../utils/localStorage.js';

const initialState = {
  messages: [],
  loadihg: false,
  error: null,
};

const messagesSlice = createSlice({
  // the simple message
  // [{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessagesByChannelId: (state, action) => {
      state.messages = state.messages.filter((msg) => msg.channelId !== action.payload);
    },
  },
});

export const { setMessages, addMessage, removeMessagesByChannelId } = messagesSlice.actions;
export default messagesSlice.reducer;
