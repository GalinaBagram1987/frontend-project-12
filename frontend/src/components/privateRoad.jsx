import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.authenticated);

  console.log('Auth state:', isAuthenticated); // Отладка

  return isAuthenticated ? children : <Navigate to='/login' />;
};
