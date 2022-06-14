import * as Yup from 'yup';

const REQUIRED_ERROR_TEXT = '반드시 작성해야합니다';
const EMAIL_ERROR_TEXT = '이메일 형식을 작성해주세요';
const PASSWORD_LENGTH_ERROR_TEXT = '비밀번호는 최소 8자리 이상이어야 합니다';
const PASSWORD_CONFIRM_ERROR_TEXT = '비밀번호가 일치하지 않습니다';

const validationEmail = () =>
  Yup.string().email(EMAIL_ERROR_TEXT).required(REQUIRED_ERROR_TEXT);

const validationPassword = () =>
  Yup.string().min(8, PASSWORD_LENGTH_ERROR_TEXT).required(REQUIRED_ERROR_TEXT);

const validationFullname = () => Yup.string().required(REQUIRED_ERROR_TEXT);

const validationPasswordConfirm = () =>
  Yup.string()
    .oneOf([Yup.ref('password'), null], PASSWORD_CONFIRM_ERROR_TEXT)
    .required(REQUIRED_ERROR_TEXT);

export const validationSignup = () =>
  Yup.object({
    email: validationEmail(),
    fullName: validationFullname(),
    password: validationPassword(),
    passwordConfirm: validationPasswordConfirm(),
  });
