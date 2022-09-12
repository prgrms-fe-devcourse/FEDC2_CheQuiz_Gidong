/* eslint-disable @typescript-eslint/no-floating-promises */
import { useCallback } from 'react';

import { Form, Formik } from 'formik';

import { updateFullName } from '@/api/UserServices';
import { validationChangeName } from '@/utils/validation';

import Button from '../Form/Button';
import InputBox from '../Form/InputBox';

import * as S from './styles';

import type { UpdateNameFormData } from '@/interfaces/ChangeFormData';
import type { UserAPI } from '@/interfaces/UserAPI';

interface Props {
  user: UserAPI;
  isShown: boolean;
  onCloseNickname: () => void;
}

const NicknameModal = ({ user, isShown, onCloseNickname }: Props) => {
  const onSubmitFullName = useCallback(async (formData: UpdateNameFormData) => {
    try {
      const userInfo = await updateFullName(formData);
      if (Object.keys(userInfo).length !== 0) {
        // TODO: refresh 보다 나은 방법으로 변경
        window.location.reload();
      }
    } catch (error) {
      console.error('error occured at onSubmitFullName.');
    }
  }, []);
  return (
    <>
      {isShown && (
        <S.Wrapper onClick={onCloseNickname}>
          <S.Container
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <S.Title>닉네임 변경</S.Title>
            <Formik
              validationSchema={validationChangeName}
              initialValues={{
                fullName: '',
              }}
              onSubmit={(values, actions) => {
                actions.setSubmitting(false);
                actions.resetForm();
                const formData = {
                  ...values,
                  username: user.username ? user.username : '{}',
                };
                onSubmitFullName(formData);
                onCloseNickname();
              }}
            >
              <Form>
                <InputBox
                  label='새 닉네임'
                  name='fullName'
                  placeholder=''
                  type='text'
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

export default NicknameModal;
