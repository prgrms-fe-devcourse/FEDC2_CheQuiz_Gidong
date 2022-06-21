import { useState } from 'react';

import { useAuthContext } from '@/contexts/AuthContext';

import Modal from '@/components/Modal';
import Icon from '@/components/Icon';
import Notification from '@/components/Notification';

import * as S from './styles';

function Header(): JSX.Element {
  const { user, isAuth } = useAuthContext();

  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [notiShow, setNotiShow] = useState(true);

  return (
    <>
      <S.HeaderContainer>
        <S.ContentContainer>
          <S.LinkButton to="/" color="point" logo="true">
            CheQuiz
          </S.LinkButton>
          {isAuth ? (
            <S.ButtonGroup>
              <S.LinkButton to="/create" color="primary">
                문제 만들기
              </S.LinkButton>
              <S.LinkButton to="/ranking" color="primary">
                랭킹 보기
              </S.LinkButton>
              <S.LinkButton to={`/user/${user._id}`} color="primary">
                내 정보
              </S.LinkButton>
              <S.Button color="primary">로그아웃</S.Button>
              <S.Button
                color="primary"
                onClick={() => {
                  setNotiShow(!notiShow);
                }}
              >
                <Icon name="bell" size={24} />
              </S.Button>
            </S.ButtonGroup>
          ) : (
            <S.ButtonGroup>
              <S.LinkButton to="/ranking" color="primary">
                랭킹 보기
              </S.LinkButton>
              <S.Button
                color="primary"
                onClick={() => {
                  setModal(true);
                  setModalContent('login');
                }}
              >
                로그인
              </S.Button>
              <S.Button
                color="primary"
                onClick={() => {
                  setNotiShow(!notiShow);
                }}
              >
                회원가입
              </S.Button>
            </S.ButtonGroup>
          )}
          {notiShow && <Notification />}
        </S.ContentContainer>
      </S.HeaderContainer>
      <S.HeaderSpacer />
      {modal && <Modal setModal={setModal} content={modalContent} />}
    </>
  );
}

export default Header;
