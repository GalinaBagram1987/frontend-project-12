import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChatData } from '../store/chatSlice.js'
import {
  addMessageFromServer,
  addChannelFromServer,
  removeChannelFromServer,
  renameChannelFromServer,
  removeMessageFromServer,
  renameMessageFromServer } from '../store/chatSlice.js'
import ChatForm from '../components/chatForm.jsx'
import Channels from '../components/channels.jsx'
import socket from '../library/socket.js'
import AddChannelButton from '../components/addChannelButton.jsx'
import { useTranslation } from 'react-i18next'

const Chat = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const token = useSelector(state => state.auth.token)
  const { channels, messages, currentChannelId, loading, error } = useSelector(state => state.chat)
  const { user: currentUserName } = useSelector(state => state.auth)

  // пустой реф для сокета
  const socketRef = useRef(null)

  useEffect(() => {
    if (!token) {
      return
    }
    dispatch(fetchChatData())
    // Подключаем сокет с токеном только один раз
    if (!socketRef.current) {
      socket.auth = { token }
      socket.connect()
      socketRef.current = socket
    }

    const subscribeEvents = () => {
    // подписаться на новые сообщения
      socket.on('newMessage', (payload) => {
        dispatch(addMessageFromServer(payload))
      })
      // подпишитесь на новый канал
      socket.on('newChannel', (payload) => {
        dispatch(addChannelFromServer(payload))
      })
      // подписаться на удаление канала
      socket.on('removeChannel', (payload) => {
        dispatch(removeChannelFromServer(payload.id))
      })
      // подписаться на переименование канала
      socket.on('renameChannel', (payload) => {
        dispatch(renameChannelFromServer(payload))
      })
      // подписаться на удаление сообщения
      socket.on('removeMessage', (payload) => {
        dispatch(removeMessageFromServer(payload.id))
      })
      // подписаться на переименование сообщения
      socket.on('renameMessage', (payload) => {
        dispatch(renameMessageFromServer(payload))
      })
    }
    subscribeEvents()

    // сокет подключен
    socket.on('connect', () => {
      console.log('WebSocket подключен')
    })
    // ошибка соединения
    socket.on('connect_error', (err) => {
      console.error('WebSocket ошибка подключения:', err.message)
    })
    // Обрабатываем потерю связи
    socket.on('disconnect', () => {
      console.log('Соединение потеряно.')
      socket.connect() // Автоматическое восстановление
    })

    // Отписка при размонтировании
    return () => {
      console.log('Отписываемся от сокетов')
      if (socketRef.current) {
        socket.off('newMessage')
        socket.off('newChannel')
        socket.off('removeChannel')
        socket.off('renameChannel')
        socket.off('renameMessage')
        socket.off('removeMessage')
        socket.off('disconnect')
        socket.off('connect')
        socket.off('connect_error')
      }
    }
  }, [dispatch, token])

  if (loading) return <div>{t('common.loading')}</div>
  if (error) return (
    <div>
      {t('common.error')}
      :
      {' '}
      {error}
    </div>
  )

  // выбираем текущий кканал
  const currentChannel = channels.find(channel => channel.id === currentChannelId)
  // Фильтруем сообщения для текущего канала
  const currentMessages = messages.filter(
    message => message.channelId === currentChannelId)
  // забираем из сторадже имя юзера
  const curUsername = currentUserName

  return (
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
                <p className="m-0">
                  <b>
                    #
                    {currentChannel.name}
                  </b>
                </p>
                <span className="text-muted">
                  {t('chat.count.messagesCount', { count: currentMessages.length })}
                </span>
              </div>
            )}
            {/* Вывод сообщений в канале */}
            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
              {currentMessages.length === 0
                ? ('')
                : (
                    currentMessages.map(message => (
                      <div
                        key={message.id}
                        className="text-break mb-2"
                      >
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
}

export default Chat
