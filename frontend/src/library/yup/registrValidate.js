import * as yup from 'yup';

const registrSchema = (t) => yup.object().shape({
  username: yup.string().min(3, t('validationError.symbols')).max(20, t('validationError.symbols')).required(t('validationError.requiredField')),
  password: yup.string().min(6, t('validationError.passwordLength')).required(t('validationError.requiredField')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], t('validationError.confirmPassword'))
    .required(t('validationError.confirmPassword')),
});

export default registrSchema;
