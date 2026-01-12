import * as yup from 'yup';

const renameChannelValidate = (t) => {
  return yup.object().shape({
  newNameChannel: yup
  .string()
  .min(3, t(' validationError.symbols'))
  .max(20, t(' validationError.symbols'))
  .required(t('validationError.requiredChannel'))
});
};

export default renameChannelValidate;
