import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  console.log('PrivateRoute check:', { token: !!token, isAuthenticated });
  return isAuthenticated ? children : <Navigate to='/login' />;
};
