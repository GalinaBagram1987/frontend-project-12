import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchChatData } from "../store/chatSlice.js";
import ChatForm from '../components/chatForm.jsx';
import Channels from '../components/channels.jsx';

const Chat = () => {
	const dispatch = useDispatch();
	const token = useSelector(state => state.auth.token);
	const { channels, messages, currentChannelId, loading, error } =  useSelector(state =>state.chat)

	useEffect(() => {
		if (!token) {
			console.log('Токен не найден, пропускаем загрузку чата');
			return;
		}
		console.log('Токен есть, загружаем данные чата:', token);
    dispatch(fetchChatData());
	}, [dispatch, token]);

	if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

	// выбираем текущий кканал
	const currentChannel = channels.find(channel => channel.id === currentChannelId);

	// Фильтруем сообщения для текущего канала
  const currentMessages = messages.filter(
    message => message.channelId === currentChannelId
  );

return(
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-wight flex-md-row">
			<div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
				<div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
					<b>Каналы</b>
					<button type='button' className="p-0 text-primary btn btn-group-vertical">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
						<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
							<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
						</svg>
						<span className="visually-hidden">+</span>
					</button>
			</div>
			{/* Список каналов */}
      <Channels />
			</div>
			<div className="col p-0 h-100">
				{/* Заголовок канала с количеством сообщений */}
				<div className="d-flex flex-column h-100">
						{currentChannel && (
						<div className="bg-light mb-4 p-3 shadow-sm small">
							<p className="m-0"><b># {currentChannel.name}</b></p>
						<span className="text-muted">{currentMessages.length} сообщений</span>
						</div>
						)}
				{/* Вывод сообщений в канале */}
				<div id="messages-box" className="chat-messages overflow-auto px-5 ">
					{currentMessages.length === 0 ? ('') : (
						currentMessages.map(message => (
							<div key = {message.id}
							className='text-berak mb-2'>
								<b>{message.username}</b>
								: 
                {message.body}
								</div>
						))
					)}
				</div>
        {/* Форма для ввода сообщений */}
				<div className="mt-auto px-5 py-3">
					<ChatForm />
				</div>
			</div>
	</div>
	</div>
  </div>
  )
};

export default Chat;
