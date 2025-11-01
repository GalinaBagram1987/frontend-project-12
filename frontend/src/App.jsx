import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout.jsx'
import Chat from './pages/chat.jsx'
import Login from './pages/login.jsx'
import Page404 from './pages/page404.jsx'
import Registration from './pages/registration.jsx'

import { useEffect } from 'react'

const App = () => {
  // Добавляем классы body
  useEffect(() => {
  document.body.classList.add('h-100', 'bg-light');
}, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* Все страницы внутри Layout */}
        <Route element={<Layout />}>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/chat' element={<Chat />} />
        </Route>
        {/* Страницы без Layout */}
        <Route path='*' element={<Page404 />} />
        <Route path='/Page404' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
