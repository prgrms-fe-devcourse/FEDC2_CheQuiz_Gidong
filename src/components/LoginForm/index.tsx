import { Formik, Form } from 'formik';

import InputBox from '@/components/Form/InputBox';
import Button from '@/components/Form/Button';

import { useAuthContext } from '@/contexts/AuthContext';

import { validationLogin } from '@/utils/validation';

import * as S from '@/components/Form/Title/styles';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginForm({ setModal }: Props) {
  const { login } = useAuthContext();

  return (
    <>
      <S.Title>로그인</S.Title>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationLogin}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          actions.resetForm();

          login(values);
          setModal(false);
        }}
      >
        <Form>
          <InputBox
            label="이메일"
            name="email"
            type="email"
            placeholder="hello@welcome.com"
          />
          <InputBox
            label="비밀번호"
            name="password"
            type="password"
            placeholder=""
          />
          <Button text="로그인" type="submit" />
        </Form>
      </Formik>
    </>
  );
}

export default LoginForm;
