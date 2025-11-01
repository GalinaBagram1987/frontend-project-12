import { Outlet } from 'react-router-dom';
import NavBar from '../components/navBar';

const Layout = () => {
  return (
    <div className='h-100'>
      <div className='h-100' id='chat'>
        <div className='d-flex flex-column h-100'>
          <NavBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;