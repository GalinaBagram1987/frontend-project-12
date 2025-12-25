import * as yup from 'yup';
const newChannelValidate = yup.object().shape({
  newChannel: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Название канала обязательно'),
});

export default newChannelValidate;
