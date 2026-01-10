import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

const renameChannelValidate = yup.object().shape({
  newNameChannel: yup
  .string()
  .min(3, t(' validationError.symbols'))
  .max(20, t(' validationError.symbols'))
  .required(t('validationError.requiredChannel'))
});

export default renameChannelValidate;
