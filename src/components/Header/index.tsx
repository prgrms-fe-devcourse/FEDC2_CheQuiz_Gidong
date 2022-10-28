/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from 'react';

import Icon from '@/components/Icon';
import Notification from '@/components/Notification';
import { Modal, ModalProvider, ModalTrigger } from '@/components/shared/Modal';
import { useAuthContext } from '@/contexts/AuthContext';

import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import { modals } from '../shared/Modal/Modals';
import useModals from '../shared/Modal/useModals';

import * as S from './styles';

const Header = (): JSX.Element => {
  const { user, isAuth, login, logout } = useAuthContext();
  const { openModal } = useModals();

  const [notiShow, setNotiShow] = useState(false);

  return (
    <>
      <S.HeaderContainer>
        <S.ContentContainer>
          <S.LinkButton
            color='point'
            logo='true'
            to='/'
          >
            CheQuiz
          </S.LinkButton>
          {isAuth ? (
            <S.ButtonGroup>
              <S.LinkButton
                color='primary'
                to='/create'
              >
                문제 만들기
              </S.LinkButton>
              <S.LinkButton
                color='primary'
                to='/ranking'
              >
                랭킹 보기
              </S.LinkButton>
              <S.LinkButton
                color='primary'
                to={`/user/${user._id}`}
              >
                내 정보
              </S.LinkButton>
              <S.Button
                color='primary'
                onClick={() => {
                  logout();
                  setNotiShow(false);
                }}
              >
                로그아웃
              </S.Button>
              <S.Button
                color='primary'
                onClick={() => {
                  setNotiShow(!notiShow);
                }}
              >
                <Icon
                  name='bell'
                  size={24}
                />
              </S.Button>
            </S.ButtonGroup>
          ) : (
            <S.ButtonGroup>
              <S.LinkButton
                color='primary'
                to='/ranking'
              >
                랭킹 보기
              </S.LinkButton>
              {/* <ModalProvider>
                <ModalTrigger>
                  <S.Button color='primary'>로그인</S.Button>
                </ModalTrigger>
                <Modal>
                  <LoginForm />
                </Modal>
              </ModalProvider> */}
              <S.Button
                color='primary'
                onClick={() => {
                  openModal(modals.login, {
                    onSubmit: (values: { email: string; password: string }) =>
                      login(values),
                  });
                }}
              >
                로그인 모달 열기
              </S.Button>
              <ModalProvider>
                <ModalTrigger>
                  <S.Button color='primary'>회원가입</S.Button>
                </ModalTrigger>
                <Modal>
                  <SignUpForm />
                </Modal>
              </ModalProvider>
            </S.ButtonGroup>
          )}
          {notiShow && <Notification />}
        </S.ContentContainer>
      </S.HeaderContainer>
      <S.HeaderSpacer />
    </>
  );
};

export default Header;
