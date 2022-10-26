/* eslint-disable @typescript-eslint/no-floating-promises */
import { Formik, Form } from 'formik';

import Button from '@/components/Form/Button';
import InputBox from '@/components/Form/InputBox';
import * as S from '@/components/Form/Title/styles';
import { useAuthContext } from '@/contexts/AuthContext';
import { validationLogin } from '@/utils/validation';

const LoginForm = () => {
  const { login } = useAuthContext();

  return (
    <>
      <S.Title>로그인</S.Title>
      <Formik
        validationSchema={validationLogin}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          actions.resetForm();

          login(values);
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
            label='비밀번호'
            name='password'
            placeholder=''
            type='password'
          />
          <Button
            text='로그인'
            type='submit'
          />
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
