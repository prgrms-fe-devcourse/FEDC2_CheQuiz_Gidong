import * as Yup from 'yup';

const REQUIRED_ERROR_TEXT = '반드시 작성해야합니다';
const EMAIL_ERROR_TEXT = '이메일 형식을 작성해주세요';
const PASSWORD_LENGTH_ERROR_TEXT = '비밀번호는 최소 8자리 이상이어야 합니다';
const PASSWORD_CONFIRM_ERROR_TEXT = '비밀번호가 일치하지 않습니다';

const validationRequired = () => Yup.string().required(REQUIRED_ERROR_TEXT);

const validationEmail = () => validationRequired().email(EMAIL_ERROR_TEXT);

const validationPassword = () =>
  validationRequired().min(8, PASSWORD_LENGTH_ERROR_TEXT);

const validationFullname = () => validationRequired();

const validationPasswordConfirm = () =>
  validationRequired().oneOf(
    [Yup.ref('password'), null],
    PASSWORD_CONFIRM_ERROR_TEXT
  );

export const validationLogin = () =>
  Yup.object({
    email: validationRequired(),
    password: validationRequired(),
  });

export const validationSignup = () =>
  Yup.object({
    email: validationEmail(),
    fullName: validationFullname(),
    password: validationPassword(),
    passwordConfirm: validationPasswordConfirm(),
  });

export const validationChangeName = () =>
  Yup.object({
    fullName: validationRequired(),
  });

export const validationChangePassword = () =>
  Yup.object({
    password: validationPassword(),
    passwordConfirm: validationPasswordConfirm(),
  });

//* QuizForm
export const validationQuizCreate = () =>
  Yup.array().of(
    Yup.object({
      _id: Yup.string(),
      category: Yup.string().trim().required('카테고리를 선택해주세요'),
      question: Yup.string().trim().required('문제를 입력해주세요'),
      difficulty: Yup.number().min(1).required('난이도를 선택해주세요'),
      importance: Yup.number().min(1).required('중요도를 선택해주세요'),
      answerType: Yup.string().trim().required('문제유형을 골라주세요'),
      answer: Yup.string().trim().required('정답을 선택해주세요'),
      answerDescription: Yup.string().trim().required('해설을 작성해주세요'),
    })
  );
