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
        initialValues={{
          email: '',
          fullName: '',
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={validationSignup}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          actions.resetForm();

          signUp(values);
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
            label="닉네임"
            name="fullName"
            type="text"
            placeholder="프롱이"
          />
          <InputBox
            label="비밀번호"
            name="password"
            type="password"
            placeholder=""
          />
          <InputBox
            label="비밀번호 확인"
            name="passwordConfirm"
            type="password"
            placeholder=""
          />
          <Button text="회원가입" type="submit" />
        </Form>
      </Formik>
    </>
  );
};

export default SignUpForm;
