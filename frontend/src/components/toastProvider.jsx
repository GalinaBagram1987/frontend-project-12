import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CustomCloseButton = ({ closeToast }) => (
  <button
    onClick={closeToast}
    style={{ background: 'none', color: 'gray', border: 'none' }}
  >
    ✕
  </button>
)

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      // Дополнительные настройки:
      limit={3} // максимум 3 тоста одновременно
      closeButton={CustomCloseButton}
    />
  )
}

export default ToastProvider
