
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice.js';
import { authAPI } from '../api/api.js';
import { useNavigate } from 'react-router-dom';
// import loginSchema from '../library/yup/loginValidate.js';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Хук для навигации
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    
      // validationSchema: loginSchema,
      // validateOnChange: true,
      // validateOnBlur: true,

      onSubmit: async (values, { setSubmitting, setErrors }) => {
        try {
        // Отправляем запрос на сервер
        const response = await authAPI.login(values.username, values.password);
        // Сохраняем в Redux и LocalStorage
        dispatch(loginSuccess({
          token: response.token,
          username: response.username,
        }));
        
        // Редирект в чат
        navigate('/chat');
      } catch (error) {
        let errorMessage = 'Ошибка авторизации';
        if (error.response?.status === 401) {
        errorMessage = 'Неверное имя пользователя или пароль';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Сервер недоступен';
      }
        // Показываем ошибку пользователю
        setErrors({ 
          password: errorMessage 
        });
      } finally {
        setSubmitting(false);
      }
      },
    });
    return(
      <div className='container-fluid h-100'>
        <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card shadow-sm'>
            <div className='card-body row p-5'>
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src="/assets/images/main_slack.jpg" className="rounded-circle" alt="Аватар" />
          </div>
            <form className='col-12 col-md-6 mt-3 mt-md-0'
              onSubmit={formik.handleSubmit}>
              <h1 className='text-center mb-4'>Войти</h1>
              {/* Поле username */}
              <div className='form-floating mb-3'>
                <input
                  id='username'
                  name="username"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className={`form-control ${formik.submitCount > 0 ? 'is-invalid' : ''}`}
                  autoComplete='username'
                />
                <label htmlFor="username">Ваш ник</label>
              </div>
              {/* Поле password */}
              <div className='form-floating mb-4'>
                <input
                  id='password'
                  name='password'
                  autoComplete='current-password'
                  type='password'
                  required 
                  placeholder='Пароль'
                  className={`form-control ${formik.submitCount > 0 && formik.errors.password ? 'is-invalid' : ''}`}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <div className="invalid-tooltip">{(formik.errors.password || formik.errors.username) || ''}</div>
                <label htmlFor="password">Пароль</label>
              </div>
              <button
                type='submit'
                className='w-100 mb-3 btn btn-outline-primary'
                >
                Войти
              </button>
            </form>
            </div>
            <div className='card-footer p-4 mt-auto w-100'>
              <div className='text-center'>
                <span>Нет аккаунта? </span>
                <a href='/registration'>Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  };

export default Login;