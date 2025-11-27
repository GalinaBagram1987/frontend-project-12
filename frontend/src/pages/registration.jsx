import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice.js';
import { authAPI } from '../api/api.js';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
return(
  <div className='container-fluid h-100'>
    <div className='row justify-content-center align-content-center h-100'>
      <div className='col-12 col-md-8 col-xxl-6'>
        <div className='card shadow-sm'>
          <div className='card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5'>
            <div>
              <img src="/assets/images/registrat_slack.jpg" className="rounded-circle" alt="Регистрация" />
            </div>
            <form className='w-50'>
              <h1 className='text-center mb-4'>Регистрация</h1>
              <div className='form-floating mb-3'>
                <input
                  placeholder='От 3 до 20 символов'
                  name='username'
                  autoComplete='username'
                  required
                  id='username'
                  className='form-control'
                  value
                  onChange
                />
                <label className='form-label' for='username'>
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
                  value
                  onChange
                  aria-autocomplete='list'
                />
                <label className='form-label' for='password'>
                  Пароль
                </label>
                <div className='invalid-tooltip'></div>
              </div>
              <div className='form-floating mb-4'>
                <input
                  placeholder='Пароли должны совпадать'
                  name='password'
                  required
                  autoComplete='new-password'
                  type='password'
                  id='confirmPassword'
                  className='form-control'
                  value
                  onChange
                />
                <label className='form-label' for='confirmPasword'>
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