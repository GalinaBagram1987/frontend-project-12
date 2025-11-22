import axios from 'axios';
import { BASE_URL, API_ENDPOINTS } from './routes';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const authAPI = {
  login: async (username, password) => {
    try {
      const response = await instance.post(API_ENDPOINTS.LOGIN, { username, password });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  registr: async (username, password) => {
    try {
      const response = await instance.post(API_ENDPOINTS.REGISTR, { username, password });
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
      const response = await instance.get(API_ENDPOINTS.GET_CHANNELS, {
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
      const response = await instance.post(API_ENDPOINTS.ADD_CHANNEL, newChannel, {
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

  editChannel: async (token, newNameChannel) => {
    try {
      const response = await instance.patch(API_ENDPOINTS.EDIT_CHANNEL, newNameChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Edit channel failed:', error);
      throw error;
    }
  },

  removeChannel: async (token) => {
    try {
      const response = await instance.delete(API_ENDPOINTS.REMOVE_CHANNEL, {
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

  getMessage: async (token) => {
    try {
      const response = await instance.get(API_ENDPOINTS.GET_MESSAGE, {
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
      const response = await instance.post(API_ENDPOINTS.ADD_MESSAGE, newMessage, {
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

  editMessage: async (token, newNameMessage) => {
    try {
      const response = await instance.patch(API_ENDPOINTS.EDIT_MESSAGE, newNameMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Edit message failed:', error);
      throw error;
    }
  },

  removeMessage: async (token) => {
    try {
      const response = await instance.delete(API_ENDPOINTS.REMOVE_MESSAGE, {
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
