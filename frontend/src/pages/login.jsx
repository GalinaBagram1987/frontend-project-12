
import { useFormik } from 'formik';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    //сюда надо будет вставть схему валидации
      // validate,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });
    return(
      <div className="card shadow-sm h-100 d-flex flex-column">
        <div className="card-body row p-5 flex-grow-1">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src="/assets/images/main_slack.jpg" className="rounded-circle" alt="Аватар" />
          </div>
            <form class='col-12 col-md-6 mt-3 mt-md-0'
              onSubmit={formik.handleSubmit}>
              <h1 class='text-center mb-4'>Войти</h1>
              <div class='form-floating mb-3'>
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
                  required placeholder='Пароль'
                  class='form-control' 
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <label htmlFor="password">Пароль</label>
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
              </div>
              <button
                type='submit'
                class='w-100 mb-3 btn btn-outline-primary'
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
    )
  };

export default Login;