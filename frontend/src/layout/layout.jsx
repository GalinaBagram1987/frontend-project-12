import { Outlet } from 'react-router-dom'
import NavBar from '../components/navBar'

const Layout = () => {
  return (
    <div className="h-100 d-flex flex-column" id="chat">
      <NavBar />
      <Outlet />
      <div className="Toastify"></div>
    </div>
  )
}

export default Layout
