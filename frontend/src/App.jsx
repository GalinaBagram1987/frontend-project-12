import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './layout/layout.jsx'
import Chat from './pages/chat.jsx'
import Login from './pages/login.jsx'
import Page404 from './pages/page404.jsx'
import Registration from './pages/registration.jsx'
import { useDispatch } from 'react-redux'
import { PrivateRoute } from './components/privateRoute.jsx'
import ToastProvider from './components/toastProvider.jsx'
import { storage } from './utils/localStorage.js'
import { loginSuccess } from './store/authSlice.js'

const App = () => {
  const dispatch = useDispatch()

  // При загрузке приложения проверяем токен
  useEffect(() => {
    const token = storage.getToken()
    const userData = storage.getUserData()

    if (token && userData) {
      dispatch(loginSuccess({ token, username: userData }))
    }
  }, [dispatch])

  return (
    <>
      <ToastProvider />
      <BrowserRouter>
        <Routes>
          {/* Все страницы внутри Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Registration />} />
            <Route
              path="chat"
              element={(
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              )}
            />
            <Route path="page404" element={<Page404 />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
