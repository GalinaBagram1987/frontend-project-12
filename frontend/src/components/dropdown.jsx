import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import DropRename from './dropRename.jsx'
import DropRemove from './dropRemove.jsx'

const DropdownMenu = ({ channelId, channelName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isRemoveModOpen, setIsRemoveModOpen] = useState(false)
  const [isRenameModOpen, setIsRenameModOpen] = useState(false)
  const menuRef = useRef(null)

  const currentChannelId = useSelector(state => state.chat.currentChannelId)
  const isActive = currentChannelId === channelId

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openRemoveModal = () => {
    setIsMenuOpen(false)
    setIsRemoveModOpen(true)
  }

  const openRenameModal = () => {
    setIsMenuOpen(false)
    setIsRenameModOpen(true)
  }

  const closeRemoveModal = () => {
    setIsMenuOpen(false)
    setIsRemoveModOpen(false)
  }

  const closeRenameModal = () => {
    setIsMenuOpen(false)
    setIsRenameModOpen(false)
  }

  return (
    <div className="dropdown" ref={menuRef}>
      {/* Кнопка открытия меню */}
      <button
        type="button"
        id="react-aria6368764644-:r0"
        aria-expanded="false"
        className={`flex-grow-0 dropdown-toggle dropdown-toggle-split rounded-start-0 rounded-end btn ${isActive ? 'btn-secondary' : ''}`}
        onClick={toggleMenu}
      >
        <span className="visually-hidden">Управление каналом</span>
      </button>

      {/* Выпадающее меню */}
      {isMenuOpen && (
        <div
          data-x-placement="bottom-end"
          aria-labelledby="react-aria6368764644-:r4:"
          className="dropdown-menu show"
          data-popper-reference-hidden="false"
          data-popper-escaped="false"
          data-popper-placement="bottom-end"
          style={{
            position: 'absolute',
            inset: '0px 0px auto auto',
            transform: 'translate3d(0px, 32px, 0px)',
          }}
        >
          <a
            data-rr-ui-dropdown-item=""
            className="dropdown-item"
            role="button"
            tabIndex="0"
            onClick={openRemoveModal}
          >
            Удалить
          </a>
          <a
            data-rr-ui-dropdown-item=""
            className="dropdown-item"
            role="button"
            tabIndex="0"
            onClick={openRenameModal}
          >
            Переименовать
          </a>
        </div>
      )}
      {/* Модальное окно удаления */}
      {isRemoveModOpen && (
        <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <DropRemove
                channelId={channelId}
                onClose={closeRemoveModal}
              />
            </div>
          </div>
        </div>
      )}
      {/* Модальное окно переименования */}
      {isRenameModOpen && (
        <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <DropRename
                channelId={channelId}
                currentName={channelName}
                onClose={closeRenameModal}

              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
