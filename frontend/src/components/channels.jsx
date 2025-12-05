import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from '../store/chatSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.chat);
  // Обработчик выбора канала
  const handleChannelSelect = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

  return (
    <>
      {/* Список каналов */}
      <ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
        {channels.map((channel) => (
          <li key={channel.id} className='nav-item w-100'>
            <button type='button' className={`w-100 rounded-0 text-start btn ${channel.id === currentChannelId ? 'btn-secondary' : ''} `} onClick={() => handleChannelSelect(channel.id)}>
              <span className='me-1'>#</span>
              {channel.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Channels;
