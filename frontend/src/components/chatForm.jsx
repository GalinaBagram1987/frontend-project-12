import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
// import { chatAPI } from '../api/api.js';
import { addMessage } from '../store/chatSlice.js';
import { useTranslation } from 'react-i18next';
import filter from '../utils/profanityFilter.js';

const ChatForm = () => {
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { user: currentUserName } = useSelector(state => state.auth);
  const curentUsername = currentUserName;
  // выбираем текущий кканал
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  // console.log('curentUserName', curentUsername);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.body.trim()) {
        errors.body = t('message.mesNotEmpty');
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      if (!currentChannel || !token) {
        setSubmitting(false);
        return;
      }
      try {
        const cleanMessage = filter.clean(values.body.trim(), '*');
        
        const newMessage = {
          // body: values.body.trim(),
          body: cleanMessage,
          channelId: currentChannelId,
          username: curentUsername,
        };
        console.log('newMessage', newMessage);
        // Отправляем запрос на сервер
        const response = await dispatch(addMessage(newMessage)).unwrap();;
        if (response) {
          formik.resetForm();
        }
      } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
        // Показываем ошибку пользователю
        formik.setErrors({
          body: t('message.mesErrorSend'),
          error,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form 
      onSubmit={formik.handleSubmit}
      noValidate
      className='py-1 border rounded-2'
      >
      <div className='input-group has-validation'>
        <input
          name='body'
          type='text'
          aria-label='Новое сообщение'
          placeholder={t('message.interNewMes')}
          className='border-0 p-0 ps-2 form-control'
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!currentChannelId || formik.isSubmitting}
          onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            formik.handleSubmit();
            console.log('Enter pressed, current value:', e.target.value);
            }
          }}
        />
        <button type='submit' disabled={!currentChannelId || !formik.values.body.trim() || formik.isSubmitting} className='btn btn-group-vertical'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='20' height='20' fill='currentColor' className='bi bi-arrow-right-square'>
            <path
              fillRule='evenodd'
              d='M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z'
            ></path>
          </svg>
          <span className='visually-hidden'>{t('chat.send')}</span>
        </button>
      </div>
    </form>
  );
};
export default ChatForm;
