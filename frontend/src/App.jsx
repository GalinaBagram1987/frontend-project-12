import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout.jsx'
import Chat from './pages/chat.jsx'
import Login from './pages/login.jsx'
import Page404 from './pages/page404.jsx'
import Registration from './pages/registration.jsx'

const App = () => {
  return (
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
  );
}

export default App
