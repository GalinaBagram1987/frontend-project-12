import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
// import { useEffect } from 'react';
import { loginSuccess } from '../store/authSlice.js'
import { authAPI } from '../api/apiMethods.js'
import { useNavigate } from 'react-router-dom'
import loginSchema from '../library/yup/loginValidate.js'

const Login = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate() // Хук для навигации

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Отправляем запрос на сервер
      const response = await authAPI.login(values.username.trim(), values.password)
      //  Сохраняем в Redux и LocalStorage
      dispatch(loginSuccess({
        token: response.token,
        username: response.username,
      }))
      navigate('/chat')
      // throw { response: { status: 401 } };
    }
    catch (error) {
      let errorMessage = 'Ошибка авторизации'
      if (error.response?.status === 401) {
        errorMessage = t('error.errorPassword')
      }
      else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }
      else if (error.code === 'ERR_NETWORK') {
        errorMessage = t('error.networkError')
      }
      // Показываем ошибку пользователю
      setErrors({
        password: errorMessage,
      })
    }
    finally {
      setSubmitting(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    validationSchema: loginSchema(t),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  })

  const handleFormSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    formik.handleSubmit(e)
  }
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="/assets/images/main_slack.jpg" className="rounded-circle" alt="Аватар" />
              </div>
              <form
                className="col-12 col-md-6 mt-3 mt-md-0"
                onSubmit={handleFormSubmit}
              >
                <h1 className="text-center mb-4">{t('login.title')}</h1>
                {/* Поле username */}
                <div className="form-floating mb-3">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                    autoComplete="new-name"
                  />
                  <label htmlFor="username">{t('login.nameLogin')}</label>
                  {formik.touched.username && formik.errors.username && (
                    <div className="invalid-tooltip">
                      {formik.errors.username}
                    </div>
                  )}
                </div>
                {/* Поле password */}
                <div className="form-floating mb-4">
                  <input
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    type="password"
                    required
                    placeholder={t('login.passwordLogin')}
                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <label htmlFor="password">{t('login.passwordLogin')}</label>
                  {formik.errors.password && (
                    <div className="invalid-tooltip">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary"
                  disabled={formik.isSubmitting}
                >
                  {t('login.login')}
                </button>
              </form>
            </div>
            <div className="card-footer p-4 mt-auto w-100">
              <div className="text-center">
                <span>
                  {t('login.text')}
                  {' '}
                </span>
                <a href="/signup">{t('login.link')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
