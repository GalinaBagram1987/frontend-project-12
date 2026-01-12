import * as yup from 'yup';

const newChannelValidate = (t) => {
  return yup.object().shape({
  newChannel: yup.string().min(3, t('validationError.symbols')).max(20, t('validationError.symbols')).required(t('validationError.requiredChannel')),
});
};

export default newChannelValidate;
