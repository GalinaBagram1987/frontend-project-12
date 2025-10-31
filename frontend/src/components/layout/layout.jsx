import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='h-100'>
      <div className='h-100 id="chat"'>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;