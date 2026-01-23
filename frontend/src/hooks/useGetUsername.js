import { useSelector } from 'react-redux'

export const useAuth = () => {
  const { token, user } = useSelector(state => state.auth)

  return {
    token,
    username: user?.username,
    isAuthenticated: !!token,
  }
}
