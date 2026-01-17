import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from '../store/chatSlice.js';
import DropdownMenu from './dropdown.jsx';

const Channels = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.chat);
  // Обработчик выбора канала
  const handleChannelSelect = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };
  const isSystemChannel = (channelName) => {
    const baseChannelNames = ['general', 'random'];
    return baseChannelNames.includes(channelName.toLowerCase());
  }
  

  return (
    <>
      {/* Список каналов */}
      <ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
        {channels.map((channel) => (
          <li key={channel.id} className='nav-item w-100'>
            <div role='group' className='d-flex droupdown btn-group'>
            <button 
            type='button'
            name={channel.name}
            className={`w-100 rounded-0 text-start text-truncate btn ${channel.id === currentChannelId ? 'btn-secondary' : ''}`}
            onClick={() => handleChannelSelect(channel.id)}
            > 
              <span>
              <span className='me-1'>#</span>
              {channel.name}
              </span>
            </button>
            {!isSystemChannel(channel.name) && (
              <DropdownMenu
                channelId={channel.id}
                channelName={channel.name}
              />
            )
            }
            </div>
          </li>
))}
      </ul>
    </>
  );
};
export default Channels;
