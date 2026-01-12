import apiWithIterceptors from './axiosInstance.js';
import { API_ENDPOINTS } from './routes.js';

export const authAPI = {
  login: async (username, password) => {
    try {
      console.log('Login endpoint:', API_ENDPOINTS.AUTH.LOGIN);
      console.log('Making login request for user:', username);

      const response = await apiWithIterceptors.post(API_ENDPOINTS.AUTH.LOGIN, { username, password });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  registr: async (username, password) => {
    try {
      const response = await apiWithIterceptors.post(API_ENDPOINTS.AUTH.REGISTR, { username, password });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
};

export const chatAPI = {
  getChannels: async () => {
    try {
      const response = await apiWithIterceptors.get(API_ENDPOINTS.CHAT.GET_CHANNELS);
      console.log('getChannels response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Get channels failed:', error);
      throw error;
    }
  },

  addChannel: async (newChannel) => {
    try {
      const response = await apiWithIterceptors.post(API_ENDPOINTS.CHAT.ADD_CHANNEL, newChannel);
      return response.data;
    } catch (error) {
      console.error('Add new channel failed:', error);
      throw error;
    }
  },

  editChannel: async (channelId, newNameChannel) => {
    try {
      const url = API_ENDPOINTS.CHAT.EDIT_CHANNEL.replace(':id', channelId);
      const response = await apiWithIterceptors.patch(
        url,
        { name: newNameChannel }
      );
      return response.data;
    } catch (error) {
      console.error('Edit channel failed:', error);
      throw error;
    }
  },

  removeChannel: async (channelId) => {
    try {
      const url = API_ENDPOINTS.CHAT.REMOVE_CHANNEL.replace(':id', channelId);
      console.log('=== EDIT remove DEBUG ===');
      console.log('URL:', url); // Должно быть: /api/v1/channels/4
      console.log('channelId:', channelId);
      console.log('========================');
      const response = await apiWithIterceptors.delete(
        url);
      return response.data;
    } catch (error) {
      console.error('Remove channel failed:', error);
      throw error;
    }
  },

  getMessages: async () => {
    try {
      const response = await apiWithIterceptors.get(API_ENDPOINTS.CHAT.GET_MESSAGE);
      console.log('getMessages response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Get message failed:', error);
      throw error;
    }
  },
  addMessage: async (newMessage) => {
    try {
      console.log('Отправляем сообщение:', newMessage);
      const response = await apiWithIterceptors.post(API_ENDPOINTS.CHAT.ADD_MESSAGE, newMessage);
      console.log('Ответ от сервера на отправку сообщения:', response.data);
      return response.data;
    } catch (error) {
      console.error('Add new message failed:', error);
      throw error;
    }
  },

  editMessage: async (messageId, newNameMessage) => {
    try {
      const response = await apiWithIterceptors.patch(
        `${API_ENDPOINTS.CHAT.EDIT_MESSAGE}/${messageId}`,
        { body: newNameMessage }
      );
      return response.data;
    } catch (error) {
      console.error('Edit message failed:', error);
      throw error;
    }
  },

  removeMessage: async (messageId) => {
    try {
      const response = await apiWithIterceptors.delete(`${API_ENDPOINTS.CHAT.REMOVE_MESSAGE}/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Remove message failed:', error);
      throw error;
    }
  },
};
