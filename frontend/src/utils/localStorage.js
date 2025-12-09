// Ключи для LocalStorage
const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_DATA: 'user_data',
};

// Сервис для работы с LocalStorage
export const storage = {
  // Сохранить токен
  setToken: (token) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },
  // Получить токен
  getToken: () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },
  // Удалить токен (при logout)
  removeToken: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },
  // Сохранить данные пользователя
  setUserData: (userData) => {
    console.log('setUserData called with:', userData);
    if (!userData) {
      console.error('Invalid user data for storage:', userData);
      return;
    } else if (typeof userData === 'string') {
      console.log('user data string:', userData);
    }
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    console.log('userData is object, saved to localStorage');
  },
  // Получить данные пользователя
  getUserData: () => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    console.log('getUserData:', userData);

    if (!userData) return null;
    try {
      const parsedData = JSON.parse(userData);
      return parsedData && typeof parsedData === 'object' ? parsedData.user || parsedData.name || parsedData : null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      // Автоматически очищаем битые данные
      // localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      // return null;
      return userData;
    }
  },
  // Очистить все данные аутентификации
  clearAuth: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },
  // Проверить, авторизован ли пользователь
  isAuthenticated: () => {
    const token = storage.getToken();
    const userData = storage.getUserData();
    console.log('isAuthenticated check - token:', !!token, 'userData:', !!userData);
    return !!token && !!userData;
  },
};
