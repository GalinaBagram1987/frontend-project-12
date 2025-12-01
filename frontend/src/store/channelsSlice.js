import { createSlice, current } from '@reduxjs/toolkit';
import { storage } from '../utils/localStorage.js';

const initialState = {
  channels: [],
  currentChannelId: null,
  loadihg: false,
  error: null,
};

const channelsSlice = createSlice({
	// the simple channel
	// [{ id: '1', name: 'general', removable: false }, ...]
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((channel) => channel.id !== action.payload);
      // Если удаляем активный канал, переключаем на первый
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = state.channels[0]?.id || null;
      }
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((ch) => ch.id === id);
      if (channel) {
        channel.name = name;
      }
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const { setChannels, addChannel, removeChannel, renameChannel, setCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
