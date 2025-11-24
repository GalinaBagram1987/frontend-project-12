
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice.js';
import { authAPI } from '../api/api.js';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Хук для навигации
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    //сюда надо будет вставть схему валидации
      // validate,
      onSubmit: async (values, { setSubmitting, setErrors }) => {
        try {
        // Отправляем запрос на сервер
        const response = await authAPI.login(values);
        
        // Сохраняем в Redux и LocalStorage
        dispatch(loginSuccess({
          token: response.token,
          user: response.user
        }));
        
        // Редирект в чат
        navigate('/chat');
      } catch (error) {
        console.error('Login failed:', error);
        // Показываем ошибку пользователю
        setErrors({ 
          password: error.response?.data?.message || 'Ошибка авторизации' 
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
              onSubmit={formik.onSubmit}>
              <h1 className='text-center mb-4'>Войти</h1>
              <div className='form-floating mb-3'>
                <input
                  id='username'
                  name="username"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className='form-control'
                  autoComplete='username'
                />
                <label htmlFor="username">Ваш ник</label>
              {formik.errors.username ? <div>{formik.errors.username}</div> : null}
              </div>
              <div className='form-floating mb-4'>
                <input
                  id='password'
                  name='password'
                  autoComplete='current-password'
                  type='password'
                  required 
                  placeholder='Пароль'
                  className='form-control' 
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <label htmlFor="password">Пароль</label>
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
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
                <Link href='/registration'>Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  };

export default Login;