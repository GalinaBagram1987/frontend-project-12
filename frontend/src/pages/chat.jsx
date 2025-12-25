import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchChatData, addChannel, addMessage, removeChannel, renameChannel } from "../store/chatSlice.js";
import ChatForm from '../components/chatForm.jsx';
import Channels from '../components/channels.jsx';
import socket from '../library/socket.js';
import AddChannelForm from '../components/addChannelForm.jsx';
import AddChannelButton from '../components/addChannelButton.jsx';

const Chat = () => {
	const dispatch = useDispatch();
	const token = useSelector(state => state.auth.token);
	const { channels, messages, currentChannelId, loading, error } =  useSelector(state =>state.chat)
    const { user: currentUserName } = useSelector(state => state.auth);   

	useEffect(() => {
		if (!token) {
			console.log('Токен не найден, пропускаем загрузку чата');
			return;
		}
		console.log('Токен есть, загружаем данные чата:', token);

	 // Подключаем сокет с токеном
    socket.auth = { token };
    socket.connect();

	  // подписаться на новые сообщения
    socket.on('newMessage', (payload) => {
      console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
      if (!payload.username) {
				console.warn('Username не пришел от сервера, добавляем из текущего пользователя');
        payload = { ...payload, username: currentUserName };
			}
			dispatch(addMessage(payload));
	  });
    // подпишитесь на новый канал
    socket.on('newChannel', (payload) => {
      console.log(payload); // { id: 6, name: "new channel", removable: true }
      dispatch(addChannel(payload));  
		});
    // подписаться на удаление канала
    socket.on('removeChannel', (payload) => {
      console.log(payload); // { id: 6 };
      dispatch(removeChannel(payload.id));  
		});
    // подписаться на переименование канала
    socket.on('renameChannel', (payload) => {
      console.log(payload); // { id: 7, name: "new name channel", removable: true }
      dispatch(renameChannel(payload));  
		});
		// Загружаем начальные данные
    dispatch(fetchChatData());

		// Отписка при размонтировании
		return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };

	}, [dispatch, token, currentUserName]);

	if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

	// выбираем текущий кканал
	const currentChannel = channels.find(channel => channel.id === currentChannelId);
    console.log(currentChannel);
	// Фильтруем сообщения для текущего канала
    const currentMessages = messages.filter(
    message => message.channelId === currentChannelId);
    console.log(currentMessages);
	// забираем из сторадже имя юзера
	const curUsername = currentUserName;
	console.log('curUsername', curUsername);
	
return(
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-wight flex-md-row">
			<div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
				<div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
					<b>Каналы</b>
					{/* Кнопка добавления каналов */}
					<AddChannelButton />
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
							className='text-break mb-2'>
								<b>{message.username}</b>
								{': '} 
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
