import * as yup from 'yup';
const renameChannelValidate = yup.object().shape({
  newNameChannel: yup
  .string()
  .min(3, 'От 3 до 20 символов')
  .max(20, 'От 3 до 20 символов')
  .required('Название канала обязательно')
  .when(state.channels.forEach(ch => {
    ch.name !== newNameChannel
  })),
});

export default renameChannelValidate;
