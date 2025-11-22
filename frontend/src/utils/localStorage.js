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
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  },
  // Получить данные пользователя
  getUserData: () => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },
  // Очистить все данные аутентификации
  clearAut: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },
  // Проверить, авторизован ли пользователь
  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
  },
};
