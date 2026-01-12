import * as yup from 'yup';

const loginSchema = (t) => {
  return yup.object().shape({
  username: yup.string().min(3, t('validationError.nameLength')).required(t('login.nameLogin')),
  password: yup.string().min(6, t('validationError.passwordLength')).required(t('validationError.requiredPassword')),
});
};

export default loginSchema;
