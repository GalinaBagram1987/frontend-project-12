import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { chatAPI } from '../api/apiMethods.js'
// все асинхронные опер делаем через чанки
// Thunk для загрузки данных
const fetchChatDataThunk = createAsyncThunk(
  'chat/fetchData', // Id отображается в dev tools и должен быть уникальный у каждого thunk
  async (__, { rejectWithValue }) => {
    // здесь _ обозначает, что аргументы не используются.
    try {
      const [channelsResponse, messagesResponse] = await Promise.all([chatAPI.getChannels(), chatAPI.getMessages()])
      return {
        channels: channelsResponse,
        messages: messagesResponse,
      }
    }
    catch (error) {
      console.error('Ошибка загрузки данных чата:', error)
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

// Thunk для добавления канала
const addChannelThunk = createAsyncThunk('chat/addChannel', async (channelData, { rejectWithValue }) => {
  try {
    const response = await chatAPI.addChannel(channelData)
    return response // { id: '3', name: 'new channel', removable: true }
  }
  catch (error) {
    return rejectWithValue(error.response?.data || error.message)
  }
})
// Thunk для удаления канала
const removeChannelThunk = createAsyncThunk('chat/removeChannel', async (channelId, { rejectWithValue }) => {
  try {
    await chatAPI.removeChannel(channelId)
    return channelId
  }
  catch (error) {
    return rejectWithValue(error.response?.data || error.message)
  }
})

// Thunk для переименования канала
const editChannelThunk = createAsyncThunk('chat/editChannel', async ({ id, name }, { rejectWithValue }) => {
  try {
    const response = await chatAPI.editChannel(id, name)
    return response
  }
  catch (error) {
    return rejectWithValue(error.response?.data || error.message)
  }
})

// Thunk для добавления сообщения
const addMessageThunk = createAsyncThunk('chat/addMessage', async (message, { rejectWithValue }) => {
  try {
    const response = await chatAPI.addMessage(message)
    return response
  }
  catch (error) {
    return rejectWithValue(error.response?.data || error.message)
  }
})

// Thunk для изменения сообщения
const editMessageThunk = createAsyncThunk('chat/editMessage', async ({ messageId, body }, { rejectWithValue }) => {
  try {
    const response = await chatAPI.editMessage(messageId, body)
    return response
  }
  catch (error) {
    return rejectWithValue(error.response?.data || error.message)
  }
})

// Thunk для удаления сообщения
const removeMessageThunk = createAsyncThunk('chat/removeMessage', async (messageId, { rejectWithValue }) => {
  try {
    await chatAPI.removeMessage(messageId)
    return messageId
  }
  catch (error) {
    return rejectWithValue(error.response?.data || error.message)
  }
})

const initialState = {
  channels: [], // все каналы
  messages: [], // все сообщения всех каналов
  currentChannelId: null, // id текущего канала
  loading: false, // флаг загрузки
  error: null,
  status: 'idle', // статус: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {

    // сервер возвращает данные через сокет. мы их обраб синхронно
    // ==== СИНХРОННЫЕ обработчики для WebSocket ====
    //  добавить канал от сервера
    addChannelFromServer: (state, action) => {
      const exists = state.channels.some(ch => ch.id === action.payload.id) // существует
      if (!exists) {
        state.channels.push(action.payload)
      }
    },
    // добавить сообщ от сервера
    addMessageFromServer: (state, action) => {
      const exists = state.messages.some(msg => msg.id === action.payload.id)
      if (!exists) {
        state.messages.push(action.payload)
      }
    },
    // удаление канала от сервера
    removeChannelFromServer: (state, action) => {
      const channelId = action.payload
      state.channels = state.channels.filter(ch => ch.id !== channelId)
      state.messages = state.messages.filter(msg => msg.channelId !== channelId)
      if (state.currentChannelId === channelId) {
        state.currentChannelId = state.channels[0]?.id || null
      }
    },
    // переименование канала от сервера
    renameChannelFromServer: (state, action) => {
      const { id, name } = action.payload
      const channel = state.channels.find(ch => ch.id === id)
      if (channel) channel.name = name
    },

    // переименование сообщения от серевера
    renameMessageFromServer: (state, action) => {
      const updatedMessage = action.payload // { id: '...', body: '...', ... }
      // Находим и переимен сообщение
      const message = state.messages.find(ms => ms.id === updatedMessage.id)
      if (message) {
        message.body = updatedMessage.body
      }
    },
    // удаление сообщ от сервера
    removeMessageFromServer: (state, action) => {
      const messageId = action.payload
      state.messages = state.messages.filter(msg => msg.id !== messageId)
    },

    // СИНХРОННЫЕ действия
    // Установить текущий канал
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload
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
        state.loading = true
        state.error = null
        state.status = 'loading'
      })
      // Данные успешно загружены
      .addCase(fetchChatDataThunk.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.status = 'succeeded'
        // Сохраняем каналы и сообщения
        state.channels = action.payload.channels
        state.messages = action.payload.messages
        // Устанавливаем первый канал как активный
        if (action.payload.channels.length > 0 && !state.currentChannelId) {
          state.currentChannelId = action.payload.channels[0].id
        }
      })
      // Ошибка загрузки
      .addCase(fetchChatDataThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.status = 'failed'
      })
      // ====Добавление канала====
      // Загрузка данных началась
      .addCase(addChannelThunk.pending, (state) => {
        state.error = null
      })
      // Канал успешно добавлен
      .addCase(addChannelThunk.fulfilled, (state, action) => {
        state.error = null
        // Новый канал как активный
        state.currentChannelId = action.payload.id
      })
      // Ошибка загрузки
      .addCase(addChannelThunk.rejected, (state, action) => {
        state.error = action.payload
      })
      // ====Удаление канала====
      // Загрузка данных
      .addCase(removeChannelThunk.pending, (state) => {
        state.error = null
      })
      // Канал успешно удалён
      .addCase(removeChannelThunk.fulfilled, (state) => {
        state.error = null
      })
      // Ошибка загрузки
      .addCase(removeChannelThunk.rejected, (state, action) => {
        state.error = action.payload
      })
      // ====Переименование канала====
      // Загрузка данных
      .addCase(editChannelThunk.pending, (state) => {
        state.error = null
      })
      // Канал успешно переименован
      .addCase(editChannelThunk.fulfilled, (state) => {
        state.error = null
      })
      // Ошибка переименования
      .addCase(editChannelThunk.rejected, (state, action) => {
        state.error = action.payload
      })
      // ====Добавление сообщения====
      // Загрузка данных
      .addCase(addMessageThunk.pending, (state) => {
        state.error = null
      })
      // Сообщение добавлено
      .addCase(addMessageThunk.fulfilled, (state) => {
        state.error = null
        // state.messages.push(action.payload);
      })
      // Ошибка добавления сообщения
      .addCase(addMessageThunk.rejected, (state, action) => {
        state.error = action.payload
      })
      // ====Редактирование сообщения====
      // Загрузка данных
      .addCase(editMessageThunk.pending, (state) => {
        state.error = null
      })
      // Сообщение успешно переименовано
      .addCase(editMessageThunk.fulfilled, (state) => {
        state.error = null
      })
      // Ошибка переименования сообщения
      .addCase(editMessageThunk.rejected, (state, action) => {
        state.error = action.payload
      })
      // ====Удаление сообщения====
      // Загрузка данных
      .addCase(removeMessageThunk.pending, (state) => {
        state.error = null
      })
      .addCase(removeMessageThunk.fulfilled, (state) => {
        state.error = null
      })
      .addCase(removeMessageThunk.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const {
  setCurrentChannel,
  clearChat,
  addChannelFromServer,
  addMessageFromServer,
  removeChannelFromServer,
  renameChannelFromServer,
  removeMessageFromServer,
  renameMessageFromServer } = chatSlice.actions
export default chatSlice.reducer
// Алиасы для обратной совместимости
export const fetchChatData = fetchChatDataThunk
export const addChannel = addChannelThunk
export const removeChannel = removeChannelThunk
export const renameChannel = editChannelThunk
export const addMessage = addMessageThunk
export const renameMessage = editMessageThunk
export const removeMessage = removeMessageThunk
