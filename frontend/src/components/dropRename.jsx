import React, { useState } from 'react';
import { useDispatch  } from 'react-redux';
import { renameChannel } from '../store/chatSlice';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import renameChannelValidate from '../library/yup/renameChannelValidate.js';

const DropRename = ({channelId, onClose}) => {
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      newNameChannel: '',
    },
    validationSchema: renameChannelValidate,
    validateOnChange: true,
    validateOnBlur: true,
    
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        const response = await dispatch(renameChannel({ id: channelId, name: values.newNameChannel })).unwrap();

        console.log('Response from renameChannel:', response);

        resetForm(); // Сброс формы после успешной отправки
        toast.success('Канал успешно переименован!');
        onClose?.(); // Закрытие модального окна
      } catch (error) {
        console.log('Rename channel failed:', error);

         let errorMessage = 'Неизвестная ошибка';
        
        // 1. Ошибка из rejectWithValue
        if (error.payload) {
          errorMessage = error.payload?.message || error.payload;
        }
        // 2. Статус 409 - конфликт имени
        // else if (error?.response?.status === 409) {
          // errorMessage = 'Канал с таким именем уже существует';
        //}
        // 3. Сетевая ошибка
        else if (error?.code === 'ERR_NETWORK') {
          errorMessage = 'Сервер недоступен. Проверьте подключение.';
        }
        // 4. Любая другая ошибка
        else if (error?.message) {
          errorMessage = error.message;
        }

        setErrors({ newNameChannel: errorMessage });
        toast.error(`Не удалось переименовать канал: ${errorMessage}`); 
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose?.();
  }

  return (
    <>
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">Переименовать канал</div>
              <button type="button" onClick={onClose} aria-label="Close" data-bs-dismiss="modal" className="btn btn-close">
                </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={formik.handleSubmit} className="">
                    <div>
                      <input 
                      name="name" 
                      id="name" 
                      className={`mb-2 form-control ${formik.errors.newNameChannel ? 'is-invalid' : ''}`}
                      placeholder='Имя канала'
                      value={formik.values.newNameChannel}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={formik.isSubmitting}
                      autoFocus
                      />
                      <label className="visually-hidden" htmlFor="name">Имя канала</label>
                      {formik.errors.newNameChannel && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.newNameChannel}
                      </div>
                      )}
                      <div class="d-flex justify-content-end">
                        <button 
                        type="button" 
                        onClick={handleClose}
                        className="me-2 btn btn-secondary"
                        >
                        Отменить
                        </button>
                        <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={formik.isSubmitting || !formik.values.newNameChannel.trim()}
                        >
                        Отправить
                        </button>       
                    </div>
                  </div>
                </form>
              </div>
            </div>
        </div>
    </>
  )
};

export default DropRename;