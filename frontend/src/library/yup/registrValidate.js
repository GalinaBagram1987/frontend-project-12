import * as yup from 'yup';
const registrSchema = yup.object().shape({
  username: yup.string().min(3, 'Имя пользователя должно быть от 3 до 20 символов').max(20, 'Имя пользователя должно быть не более 20 символов').required('Обязательное поле'),
  password: yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Пароли должны совпадать'),
});

export default registrSchema;
