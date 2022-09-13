/* eslint-disable @typescript-eslint/no-floating-promises */
import { useCallback } from 'react';

import { Form, Formik } from 'formik';

import { updatePassword } from '@/api/UserServices';
import { validationChangePassword } from '@/utils/validation';

import Button from '../Form/Button';
import InputBox from '../Form/InputBox';

import * as S from './styles';

import type { UpdatePasswordFormData } from '@/interfaces/ChangeFormData';

interface Props {
  isShown: boolean;
  onClosePassword: () => void;
}

const PasswordModal = ({ isShown, onClosePassword }: Props) => {
  const onSubmitPassword = useCallback(
    async (formData: UpdatePasswordFormData) => {
      try {
        const response = await updatePassword(formData);
        // TODO: 비밀번호가 변경되었습니다 TOAST 현재 변경됨을 알기 어려워서 콘솔 찍어두었습니다.
        console.log(response);
      } catch (error) {
        console.error('error occured at onSubmitFullName.');
      }
    },
    []
  );
  return (
    <>
      {isShown && (
        <S.Wrapper onClick={onClosePassword}>
          <S.Container
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <S.Title>비밀번호 변경</S.Title>
            <Formik
              validationSchema={validationChangePassword}
              initialValues={{
                password: '',
                passwordConfirm: '',
              }}
              onSubmit={(values, actions) => {
                actions.setSubmitting(false);
                actions.resetForm();
                const formData = {
                  password: values.password,
                };
                onSubmitPassword(formData);
                onClosePassword();
              }}
            >
              <Form>
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
                  text='저장'
                  type='submit'
                />
              </Form>
            </Formik>
          </S.Container>
        </S.Wrapper>
      )}
      {isShown && null}
    </>
  );
};

export default PasswordModal;
