import { Form, Formik } from 'formik';
import { validationChangeName } from '@/utils/validation';
import * as S from './styles';
import InputBox from '../Form/InputBox';
import Button from '../Form/Button';
import { UserAPI } from '@/interfaces/UserAPI';
import { updateFullName } from '@/api/UserServices';

interface Props {
  user: UserAPI;
  isShown: boolean;
  onCloseNickname: () => void;
}

function NicknameModal({ user, isShown, onCloseNickname }: Props) {
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
              initialValues={{
                fullName: '',
              }}
              validationSchema={validationChangeName}
              onSubmit={(values, actions) => {
                actions.setSubmitting(false);
                actions.resetForm();
                const formData = {
                  ...values,
                  username: user.username ? user.username : '{}',
                };
                updateFullName(formData);
                onCloseNickname();
              }}
            >
              <Form>
                <InputBox
                  label="새 닉네임"
                  name="fullName"
                  type="text"
                  placeholder=""
                />
                <Button text="저장" type="submit" />
              </Form>
            </Formik>
          </S.Container>
        </S.Wrapper>
      )}
      {isShown && null}
    </>
  );
}

export default NicknameModal;
