import { Formik, Form } from 'formik';

import Button from '@/components/Form/Button';
import InputBox from '@/components/Form/InputBox';
import * as S from '@/components/Form/Title/styles';
import { useAuthContext } from '@/contexts/AuthContext';
import { validationSignup } from '@/utils/validation';

interface Props {
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm = ({ setModalShow }: Props) => {
  const { signUp } = useAuthContext();

  return (
    <>
      <S.Title>회원가입</S.Title>
      <Formik
        validationSchema={validationSignup}
        initialValues={{
          email: '',
          fullName: '',
          password: '',
          passwordConfirm: '',
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          actions.resetForm();

          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          signUp(values);
          setModalShow(false);
        }}
      >
        <Form>
          <InputBox
            label='이메일'
            name='email'
            placeholder='hello@welcome.com'
            type='email'
          />
          <InputBox
            label='닉네임'
            name='fullName'
            placeholder='프롱이'
            type='text'
          />
          <InputBox
            label='비밀번호'
            name='password'
            placeholder=''
            type='password'
          />
          <InputBox
            label='비밀번호 확인'
            name='passwordConfirm'
            placeholder=''
            type='password'
          />
          <Button
            text='회원가입'
            type='submit'
          />
        </Form>
      </Formik>
    </>
  );
};

export default SignUpForm;
