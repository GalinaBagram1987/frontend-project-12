import * as yup from 'yup';
const loginSchema = yup.object().shape({
  username: yup.string().min(3, 'Имя пользователя должно быть не менее 3 символов').required('Введите имя пользователя'),
  password: yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Введите пароль'),
});

export default loginSchema;
