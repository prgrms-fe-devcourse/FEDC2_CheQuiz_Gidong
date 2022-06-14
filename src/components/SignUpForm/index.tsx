import { Formik, Form } from 'formik';

import Button from '@/components/Form/Button';
import InputBox from '@/components/Form/InputBox';

import { validationSignup } from '@/utils/validation';
import { useAuthContext } from '@/contexts/AuthContext';

function SignUpForm() {
  const { signUp } = useAuthContext();

  return (
    <>
      <h1>회원가입</h1>
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
        }}
      >
        <Form>
          <InputBox
            label="이메일"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
          <InputBox
            label="닉네임"
            name="fullName"
            type="text"
            placeholder="Jane Doe"
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
}

export default SignUpForm;
