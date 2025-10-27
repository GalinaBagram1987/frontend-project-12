import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Current location is ', location);
  }, [location]);

  return (
    <>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigate('/pageOne', { replace: false })}>Page One</button>
          </li>
          <li>
            <button onClick={() => navigate('/pageLogin', { replace: false })}>Login Page</button>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </>
  );
};

export default MainPage;
