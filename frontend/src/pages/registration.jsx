import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/authSlice.js'
import { authAPI } from '../api/apiMethods.js'
import { useNavigate } from 'react-router-dom'
import registrSchema from '../library/yup/registrValidate.js'

const Registration = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate() // Хук для навигации

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    // сюда надо будет вставть схему валидации
    validationSchema: registrSchema(t),
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        console.log('Sending data:',
          { username: values.username, password: values.password })
        // Отправляем запрос на сервер

        const { username, password } = values
        const response = await authAPI.registr(username, password)

        console.log('Server response:', response)

        // Сохраняем в Redux и LocalStorage
        dispatch(loginSuccess({
          token: response.token,
          username: response.username,
        }))

        // Редирект в чат
        navigate('/chat')
      }
      catch (error) {
        console.error('registration failed:', error)
        // Показываем ошибку пользователю
        let errorMessage = t('error.errorBase')

        if (error.response?.status === 409) {
          errorMessage = t('error.userExists')
        }
        else if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        }
        else if (error.code === 'ERR_NETWORK') {
          errorMessage = t('error.networkError')
        }

        setErrors({
          password: errorMessage,
        })
      }
      finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src="/assets/images/registrat_slack.jpg" className="rounded-circle" alt="Регистрация" />
              </div>
              <form
                className="w-50"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">{t('registr.registration')}</h1>
                {/* Поле username */}
                <div className="form-floating mb-3">
                  <input
                    placeholder="От 3 до 20 символов"
                    name="username"
                    autoComplete="username"
                    required
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                  />
                  <label className="form-label" htmlFor="username">
                    {t('registr.userRegist')}
                  </label>
                  <div className="invalid-tooltip">{formik.errors.username || ''}</div>
                </div>
                {/* Поле password */}
                <div className="form-floating mb-3">
                  <input
                    placeholder={t('validationError.PasswordLength')}
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    aria-autocomplete="list"
                    onBlur={formik.handleBlur}
                  />
                  <div className="invalid-tooltip">{formik.errors.password || ''}</div>
                  <label className="form-label" htmlFor="password">
                    {t('registr.passwordRegist')}
                  </label>
                </div>
                {/* Поле confirmPassword */}
                <div className="form-floating mb-4">
                  <input
                    placeholder={t('validationError.confirmPassword')}
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                  />
                  <div className="invalid-tooltip">{formik.errors.confirmPassword || ''}</div>
                  <label className="form-label" htmlFor="confirmPassword">
                    {t('registr.confirmPassword')}
                  </label>
                </div>
                <button type="submit" className="btn btn-outline-primary">
                  {t('registr.register')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration
