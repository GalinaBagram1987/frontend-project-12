import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice.js';
import { authAPI } from '../api/api.js';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Хук для навигации

  const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
        confirmPassword: '',
      },
      //сюда надо будет вставть схему валидации
      // validate,
      onSubmit: async (values, { setSubmitting, setErrors }) => {
        try {
        // Отправляем запрос на сервер
        const response = await authAPI.registr(values);
        
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
          <div className='card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5'>
            <div>
              <img src="/assets/images/registrat_slack.jpg" className="rounded-circle" alt="Регистрация" />
            </div>
            <form className='w-50'
              onSubmit={formik.handleSubmit}>
              <h1 className='text-center mb-4'>Регистрация</h1>
              <div className='form-floating mb-3'>
                <input
                  placeholder='От 3 до 20 символов'
                  name='username'
                  autoComplete='username'
                  required
                  id='username'
                  className='form-control'
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <label className='form-label' htmlFor='username'>
                  Имя пользователя
                </label>
                <div placement='right' className='invalid-tooltip'></div>
              </div>
              <div className='form-floating mb-3'>
                <input
                  placeholder='Не менее 6 символов'
                  name='password'
                  aria-describedby='passwordHelpBlock'
                  required
                  autoComplete='new-password'
                  type='password'
                  id='password'
                  className='form-control'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  aria-autocomplete='list'
                />
                <label className='form-label' htmlFor='password'>
                  Пароль
                </label>
                <div className='invalid-tooltip'></div>
              </div>
              <div className='form-floating mb-4'>
                <input
                  placeholder='Пароли должны совпадать'
                  name='confirmPassword'
                  required
                  autoComplete='new-password'
                  type='password'
                  id='confirmPassword'
                  className='form-control'
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
                <label className='form-label' htmlFor='confirmPassword'>
                  Подтвердите пароль
                </label>
                <div className='invalid-tooltip'></div>
              </div>
              <button type='submit' className='btn btn-outline-primary'>
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>
      </div>
  </div>
</div>
)
};

export default Registration;