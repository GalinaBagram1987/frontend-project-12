import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatAPI } from '../api/api';

const fetchChatData = createAsyncThunk(
  'chat/fetchData', // Id отображается в dev tools и должен быть уникальный у каждого thunk
  async (__, { getState, rejectWithValue }) => {
    // здесь _ обозначает, что аргументы не используются.
    try {
      const { auth } = getState();
      const token = auth.token;
      if (!token) {
        throw new Error('Токен не найден');
      }
      const [channelsResponse, messagesResponse] = await Promise.all([chatAPI.getChannels(token), chatAPI.getMessages(token)]);
      return {
        channels: channelsResponse,
        messages: messagesResponse,
      };
    } catch (error) {
      console.error('Ошибка загрузки данных чата:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  channels: [], // все каналы
  messages: [], // все сообщения всех каналов
  currentChannelId: null, // id текущего канала
  loading: false, // флаг загрузки
  error: null,
  status: 'idle', // статус: 'idle' | 'loading' | 'succeeded' | 'failed'
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // СИНХРОННЫЕ действия
    // Установить текущий канал
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    // Добавить сообщение
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // Добавить канал
    addChannel: (state, action) => {
      state.channels.push(action.payload);
      // Автоматически выбираем новый канал
      if (!state.currentChannelId) {
        state.currentChannelId = action.payload.id;
      }
    },
    // Удалить канал
    removeChannel: (state, action) => {
      const channelId = action.payload;
      // Удаляем канал
      state.channels = state.channels.filter((ch) => ch.id !== channelId);
      // Удаляем все сообщения этого канала
      state.messages = state.messages.filter((msg) => msg.channelId !== channelId);
      // Если удалили активный канал, выбираем первый из оставшихся
      if (state.currentChannelId === channelId) {
        state.currentChannelId = state.channels[0]?.id || null;
      }
    },
    // Переименовать канал
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      // находим канал по id
      const channel = state.channels.find((ch) => ch.id === id);
      if (channel) {
        channel.name = name;
      }
    },
    // Очистить чат (при logout)
    clearChat: () => initialState,
  },
  // АСИНХРОННЫЕ редьюсеры (обработка thunk'ов)
  extraReducers: (builder) => {
    builder
      // Загрузка данных началась
      .addCase(fetchChatData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })

      // Данные успешно загружены
      .addCase(fetchChatData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.status = 'succeeded';

        // Сохраняем каналы и сообщения
        state.channels = action.payload.channels;
        state.messages = action.payload.messages;

        // Устанавливаем первый канал как активный
        if (action.payload.channels.length > 0 && !state.currentChannelId) {
          state.currentChannelId = action.payload.channels[0].id;
        }
      })

      // Ошибка загрузки
      .addCase(fetchChatData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { setCurrentChannel, addMessage, addChannel, removeChannel, renameChannel, clearChat } = chatSlice.actions;
export { fetchChatData };
export default chatSlice.reducer;
