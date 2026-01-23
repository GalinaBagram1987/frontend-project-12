import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { removeChannel } from '../store/chatSlice.js'
import { toast } from 'react-toastify'

const DropRemove = ({ channelId, onClose }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const submitRemove = async () => {
    setIsLoading(true)
    try {
      await dispatch(removeChannel(channelId)).unwrap()
      toast.success(t('toastify.removeChannelOk'))
      onClose()
    }
    catch (error) {
      console.error('Ошибка при удалении:', error)
      toast.error(`Не удалось удалить канал: ${error.message}`)
    }
    finally {
      setIsLoading(false)
    }
  }
  const handleCancel = () => {
    onClose()
  }

  return (
    <>
      <div className="modal-header">
        <div className="modal-title h4">{t('removeCh.removeCh')}</div>
        <button type="button" onClick={handleCancel} aria-label="Close" data-bs-dismiss="modal" className="btn btn-close">
        </button>
      </div>
      <div className="modal-body">
        <p className="lead">{t('removeCh.youOk')}</p>
        <div className="d-flex justify-content-end">
          <button type="button" onClick={handleCancel} disabled={isLoading} className="me-2 btn btn-secondary">{t('removeCh.cancel')}</button>
          <button type="button" onClick={submitRemove} disabled={isLoading} className="btn btn-danger">{t('removeCh.remove')}</button>
        </div>
      </div>
    </>
  )
}

export default DropRemove
