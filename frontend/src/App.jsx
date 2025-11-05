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
    <div className="min-vh-100 d-flex flex-column" id="chat">
      <BrowserRouter>
      <Routes>
        {/* Все страницы внутри Layout */}
        <Route path="/" element={<Layout />} >
          <Route index element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='registration' element={<Registration />} />
          <Route path='chat' element={<Chat />} />
          <Route path='page404' element={<Page404 />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App
