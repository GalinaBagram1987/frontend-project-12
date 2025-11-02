import { useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const isPathWithExit = location.pathname === '/chat';

  return (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      {!isPathWithExit ? (
        <span className="navbar-brand"
          onClick={handleLogout}>
          Hexlet Chat
          </span>
      ) : (
        <>
          <span className="navbar-brand">Hexlet Chat</span>
          <button 
            type="button"
            onClick={handleLogout}
            className="btn btn-primary"
          >
            Выйти
          </button>
        </>
      )}
    </div>
  </nav>
);
};

export default NavBar;