import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NavBar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  const isPathWithExit = location.pathname === '/chat'

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        {!isPathWithExit
          ? (
            <span
              className="navbar-brand"
              onClick={handleLogout}
            >
              {t('navBar.chat')}
            </span>
          )
          : (
            <>
              <span className="navbar-brand">{t('navBar.chat')}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-primary"
              >
                {t('navBar.exit')}
              </button>
            </>
          )}
      </div>
    </nav>
  )
}

export default NavBar
