import axios from 'axios';
import { BASE_URL, API_ENDPOINTS } from './routes';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const authAPI = {
  login: async (username, password) => {
    try {
      console.log('Login endpoint:', API_ENDPOINTS.AUTH.LOGIN);
      console.log('Making login request for user:', username);

      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, { username, password });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  registr: async (username, password) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTR, { username, password });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
};

export const chatAPI = {
  getChannels: async (token) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.CHAT.GET_CHANNELS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Get channels failed:', error);
      throw error;
    }
  },

  addChannel: async (token, newChannel) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.CHAT.ADD_CHANNEL, newChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Add new channel failed:', error);
      throw error;
    }
  },

  editChannel: async (token, channelId, newNameChannel) => {
    try {
      const response = await axiosInstance.patch(
        `${API_ENDPOINTS.CHAT.EDIT_CHANNEL}/${channelId}`,
        { name: newNameChannel },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Edit channel failed:', error);
      throw error;
    }
  },

  removeChannel: async (token, channelId) => {
    try {
      const response = await axiosInstance.delete(`${API_ENDPOINTS.CHAT.REMOVE_CHANNEL}/${channelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Remove channel failed:', error);
      throw error;
    }
  },

  getMessages: async (token) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.CHAT.GET_MESSAGE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Get message failed:', error);
      throw error;
    }
  },

  addMessage: async (token, newMessage) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.CHAT.ADD_MESSAGE, newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Add new message failed:', error);
      throw error;
    }
  },

  editMessage: async (token, messageId, newNameMessage) => {
    try {
      const response = await axiosInstance.patch(
        `${API_ENDPOINTS.CHAT.EDIT_MESSAGE}/${messageId}`,
        { body: newNameMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Edit message failed:', error);
      throw error;
    }
  },

  removeMessage: async (token, messageId) => {
    try {
      const response = await axiosInstance.delete(`${API_ENDPOINTS.CHAT.REMOVE_MESSAGE}/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Remove message failed:', error);
      throw error;
    }
  },
};
