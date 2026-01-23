import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { renameChannel } from '../store/chatSlice.js'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'

import renameChannelValidate from '../library/yup/renameChannelValidate.js'

const DropRename = ({ channelId, currentName = '', onClose }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(state => state.chat.channels)

  const formik = useFormik({
    initialValues: {
      newNameChannel: currentName,
    },
    validationSchema: renameChannelValidate(t),
    validate: () => {
      const errors = {}
      const newName = newNameChannel.value.trim()
      // 1. Проверка на изменение
      if (newName === currentName) {
        errors.newNameChannel = t('renameCh.noChangeName')
        return errors
      }
      // 2. Проверка уникальности из состояния
      const isNameExists = channels.some(channel =>
        channel.id !== channelId // Исключаем переименуемый канал
        && channel.name.toLowerCase() === newName.toLowerCase(),
      )
      if (isNameExists) {
        errors.newNameChannel = t('renameCh.unigName')
      }
      return errors
    },
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        const response = await dispatch(renameChannel({ id: channelId, name: values.newNameChannel })).unwrap()
        console.log('Response from renameChannel:', response)

        resetForm() // Сброс формы после успешной отправки
        toast.success(t('toastify.remaneChannekOk'))
        onClose?.() // Закрытие модального окна
      }
      catch (error) {
        console.log('Rename channel failed:', error)

        let errorMessage = t('error.unknownError')

        // 1. Ошибка из rejectWithValue
        if (error.payload) {
          errorMessage = error.payload?.message || error.payload
        }
        // 2. Сетевая ошибка
        else if (error?.code === 'ERR_NETWORK') {
          errorMessage = t('error.networkError')
        }
        // 3. Любая другая ошибка
        else if (error?.message) {
          errorMessage = error.message
        }

        setErrors({ newNameChannel: errorMessage })
        toast.error(`Не удалось переименовать канал: ${errorMessage}`)
      }
      finally {
        setSubmitting(false)
      }
    },
  })

  const handleClose = () => {
    formik.resetForm()
    onClose?.()
  }

  return (
    <>
      <div className="modal-header">
        <div className="modal-title h4">{t('renameCh.renameCh')}</div>
        <button type="button" onClick={handleClose} aria-label="Close" data-bs-dismiss="modal" className="btn btn-close">
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={formik.handleSubmit} className="">
          <div>
            <input
              name="newNameChannel"
              id="newNameChannel"
              className={`mb-2 form-control ${formik.errors.newNameChannel ? 'is-invalid' : ''}`}
              placeholder="Имя канала"
              value={formik.values.newNameChannel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              autoFocus
            />
            <label className="visually-hidden" htmlFor="newNameChannel">{t('renameCh.chnName')}</label>
            {formik.errors.newNameChannel && (
              <div className="invalid-feedback d-block">
                {formik.errors.newNameChannel}
              </div>
            )}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={handleClose}
                className="me-2 btn btn-secondary"
              >
                {t('chat.cancel')}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting || !formik.values.newNameChannel.trim()}
              >
                {t('chat.send')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default DropRename
