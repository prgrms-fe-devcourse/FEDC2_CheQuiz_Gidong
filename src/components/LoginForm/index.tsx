/* eslint-disable @typescript-eslint/no-floating-promises */
import { Formik, Form } from 'formik';
import ReactModal from 'react-modal';

import Button from '@/components/Form/Button';
import InputBox from '@/components/Form/InputBox';
import * as S from '@/components/Form/Title/styles';
import { validationLogin } from '@/utils/validation';

interface Props {
  onSubmit: (values: { email: string; password: string }) => void;
  onClose: () => void;
}
const LoginForm = ({ onSubmit, onClose }: Props) => (
  <ReactModal isOpen>
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

        onSubmit(values);
        onClose();
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
        <Button
          text='취소'
          type='button'
          onClick={() => onClose()}
        />
      </Form>
    </Formik>
  </ReactModal>
);

export default LoginForm;
