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
          <div className='card-body d-flex flex-column flex-md-row jstify-content-around align-items p-5'>
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
                />
              </div>
              <div className='form-floating mb-4'>
                <input
                />
              </div>
            </form>
          </div>
        </div>
      </div>
  </div>
</div>
)
};

export default Registration;