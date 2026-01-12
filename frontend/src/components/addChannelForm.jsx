import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '../store/chatSlice.js';
import { useFormik } from 'formik';
import newChannelValidate from '../library/yup/newChannelValidate.js';
import { useTranslation } from 'react-i18next';

const AddChannelForm = ({onClose}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.chat.channels);

  const formik = useFormik({
    initialValues: {
      newChannel: '',
    },
    validationSchema: newChannelValidate(t),
    validate: (values) => {
      const errors = {};
      const newName = values.newChannel.trim();
      
      if (newName) {
        const isNameExists = channels.some(channel => 
        channel.name.toLowerCase() === newName.toLowerCase()
      );
      if (isNameExists) {
          errors.newChannel = 'Канал с таким именем уже существует';
        }
    }
      return errors;
    },
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await dispatch(addChannel({ name: values.newChannel }));

        console.log('Response from addChannel:', response);

        formik.resetForm(); // Сброс формы после успешной отправки
        onClose?.(); // Закрытие модального окна
      } catch (error) {
        console.log('Add channel failed:', error);

        let errorMessage = error?.response?.data?.message;

        if (error?.response?.status === 409) {
          errorMessage = 'Канал с таким именем уже существует';
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.code === 'ERR_NETWORK') {
          errorMessage = 'Сервер недоступен. Проверьте подключение.';
        }

        setErrors({ newChannel: errorMessage });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    // {*Форма добавления каналов*} 
    <>
    <div className="fade modal-backdrop show"></div>
    <div role="dialog" aria-modal="true" className="fade modal show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">Добавить канал</div>
            <button type="button" onClick={onClose} aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
          </div>
          <div className="modal-body">
            <form className="" onSubmit={formik.handleSubmit}>
              <div>
                <label className="visually-hidden" htmlFor="name">Имя канала</label>
                <input
                  name="newChannel"
                  id="name"
                  className={`mb-2 form-control ${formik.touched.newChannel && formik.errors.newChannel ? 'is-invalid' : ''}`}
                  value={formik.values.newChannel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.newChannel && formik.errors.newChannel ? (
                  <div className="invalid-feedback">{formik.errors.newChannel}</div>
                ) : null}
              </div>

              <div className="d-flex justify-content-end mt-3">
                <button type="button" className="me-2 btn btn-secondary" onClick={onClose}>Отменить</button>
                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default AddChannelForm;
