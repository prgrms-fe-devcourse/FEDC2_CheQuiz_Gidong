import { Formik, Form } from 'formik';

import Button from '@/components/Form/Button';
import InputBox from '@/components/Form/InputBox';
import * as S from '@/components/Form/Title/styles';
import { useAuthContext } from '@/contexts/AuthContext';
import { validationLogin } from '@/utils/validation';

interface Props {
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ setModalShow }: Props) => {
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
          setModalShow(false);
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
};

export default LoginForm;
