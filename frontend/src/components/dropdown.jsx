import React, { useState, useEffect, useRef } from 'react';
import { useDispatch  } from 'react-redux';
import DropRename from './dropRename.jsx';
import DropRemove from '/dropRemove.jsx'

const DropdownMenu = ({channelId}) => {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ isRemoveModOpen, setIsRemoveModOpen ] = useState(false);
  const [ isRenameModOpen, setIsRenameModOpen ] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
     const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
     return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openRemoveModal = () => {
    setIsMenuOpen(false);
    setIsRemoveModOpen(true);
  }

  const openRenameModal = () => {
    setIsMenuOpen(false);
    setIsRenameModOpen(true);
  }

  const closeRemoveModal = () => {
    setIsMenuOpen(false);
    setIsRemoveModOpen(false);
  }

  const cliseRenameModal = () => {
    setIsMenuOpen(false);
    setIsRenameModOpen(false);
  }

  return (
    <button type="button" 
      id="react-aria6368764644-:r4:" 
      aria-expanded="false" 
      className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary">
      <span className="visually-hidden">Управление каналом</span>
      onClick={toggleMenu}
    </button>

    {{setIsMenuOpen(true)} && (
      <div x-placement="bottom-end" 
      aria-labelledby="react-aria6368764644-:r4:" 
      className="dropdown-menu show" 
      data-popper-reference-hidden="false" 
      data-popper-escaped="false" 
      data-popper-placement="bottom-end" 
      style="position: absolute; inset: 0px 0px auto auto; transform: translate3d(0px, 32px, 0px);">
      <a data-rr-ui-dropdown-item="" 
        className="dropdown-item" 
        role="button" 
        tabindex="0" 
        href="#">Удалить</a>
        <a data-rr-ui-dropdown-item="" 
        className="dropdown-item" 
        role="button" 
        tabindex="0" 
        href="#">Переименовать</a>
        </div>
    )}
  )
};

export default DropdownMenu;