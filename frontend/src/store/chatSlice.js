import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatAPI } from '../api/api';
import { response } from 'express';
import { console } from 'inspector';
import { act } from 'react';

// Thunk для загрузки данных
const fetchChatDataThunk = createAsyncThunk(
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
      console.log('channels Response', channelsResponse);
      console.log('messages Response', messagesResponse);

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

// Thunk для добавления канала
const addChannelThunk = createAsyncThunk('chat/addChannel', async (channelData, { rejectWithValue }) => {
  try {
    const response = await chatAPI.addChannel(channelData);
    return response; // { id: '3', name: 'new channel', removable: true }
  } catch (error) {
    return rejectWithValue(response?.data || error.message);
  }
});
// Thunk для удаления канала
const removeChannelThunk = createAsyncThunk('chat/removeChannel', async (channelId, { rejectWithValue }) => {
  try {
    await chatAPI.removeChannel(channelId);
    return channelId;
  } catch (error) {
    return rejectWithValue(response?.data || error.message);
  }
});

// Thunk для переименования канала
const editChannelThunk = createAsyncThunk('chat/editChannel', async ({ id, name }, { rejectWithValue }) => {
  try {
    const response = await chatAPI.editChannel(id, name);
    return response;
  } catch (error) {
    return rejectWithValue(response?.data || error.message);
  }
});

// Thunk для добавления сообщения
const addMessageThunk = createAsyncThunk('chat/addMessage', async (message, { rejectWithValue }) => {
  try {
    const response = await chatAPI.addMessage(message);
    return response;
  } catch (error) {
    return rejectWithValue(response?.data || error.message);
  }
});

// Thunk для изменения сообщения
const editMessageThunk = createAsyncThunk('chat/aditMessage', async ({ messageId, body }, { rejectWithValue }) => {
  try {
    const response = await chatAPI.editMessage(messageId, body);
    return response;
  } catch (error) {
    return rejectWithValue(response?.data || error.message);
  }
});

// Thunk для удаления сообщения
const removeMessageThunk = createAsyncThunk('chat/removeMessage', async (messageId, { rejectWithValue }) => {
  try {
    await chatAPI.removeMessage(messageId);
    return messageId;
  } catch (error) {
    return rejectWithValue(response?.data || error.message);
  }
});

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
    // Очистить чат (при logout)
    clearChat: () => initialState,
  },
  // АСИНХРОННЫЕ редьюсеры (обработка thunk'ов)
  extraReducers: (builder) => {
    builder
      // ====Получение данных чата====
      // Загрузка данных началась
      .addCase(fetchChatDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      // Данные успешно загружены
      .addCase(fetchChatDataThunk.fulfilled, (state, action) => {
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
      .addCase(fetchChatDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      // ====Добавление канала====
      // Загрузка данных началась
      .addCase(addChannelThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      // Канал успешно добавлен
      .addCase(addChannelThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.status = 'succeeded';
        // Сохраняем канал
        state.channels.push(action.payload);
        // Новый канал как активный
        state.currentChannelId = action.payload.id;
      })
      // Ошибка загрузки
      .addCase(addChannelThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // ====Удаление канала====
      // Загрузка данных
      .addCase(removeChannelThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      // Канал успешно удалён
      .addCase(addChannelThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const channelId = action.payload;
        // Удаляем канал и его соощения
        state.channels = state.channels.filter((ch) => ch.id !== channelId);
        state.messages = state.messages.filter((msg) => msg.channelId !== channelId);
        // Если удалили активный канал, устанавливаем новый
        if (state.currentChannelId === channelId) {
          state.currentChannelId = state.channels[0].id || null;
        }
      })
      // Ошибка загрузки
      .addCase(removeChannelThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // ====Переименование канала====
      // Загрузка данных
      .addCase(editChannelThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      // Канал успешно переименован
      .addCase(editChannelThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { id, name } = action.payload;
        // Находим и переименовываем канал
        const channel = state.channels.find((ch) => ch.id === id);
        if (channel) {
          channel.name = name;
        }
      })
      // Ошибка переименования
      .addCase(editChannelThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // ====Добавление сообщения====
      // Загрузка данных
      .addCase(addMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      // Сообщение добавлено
      .addCase(addMessageThunk.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.loading = false;
      })
      // Ошибка добавления сообщения
      .addCase(addMessageThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// export const { setCurrentChannel, addMessage, addChannel, removeChannel, renameChannel, clearChat } = chatSlice.actions;
export { fetchChatDataThunk, addChannelThunk, removeChannelThunk, editChannelThunk, addMessageThunk, editMessageThunk, removeMessageThunk };
export default chatSlice.reducer;
