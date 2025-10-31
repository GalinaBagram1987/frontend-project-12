import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/layout.jsx';
import Chat from './components/pages/chat.jsx';
import Home from './components/pages/home.jsx'
import Login from './components/pages/login.jsx'
import Page404 from './components/pages/page404.jsx'
import Registration from './components/pages/registration/jsx'

import { useEffect } from 'react';

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
          <Route path='/home' element={<Home />} />
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
