import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

const loginSchema = yup.object().shape({
  username: yup.string().min(3, t('validationError.nameLength')).required(t('login.nameLogin')),
  password: yup.string().min(6, t('validationError.passwordLength')).required(t('validationError.requiredPassword')),
});

export default loginSchema;
