import { Outlet } from 'react-router-dom';
import NavBar from '../components/navBar';

const Layout = () => {
  return (
    <div className="min-vh-100 d-flex flex-column" id="chat">
      <NavBar />
      <div class="flex-grow-1 d-flex align-items-center justify-content-center">
        <Outlet />
      </div>
      <div class="Toastify"></div>
    </div>
  );
}

export default Layout;