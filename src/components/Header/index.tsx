import * as S from './styles';

interface HeaderProps {
  isLogin?: boolean;
}

function Header({ isLogin }: HeaderProps): JSX.Element {
  return (
    <>
      <S.HeaderContainer>
        <S.ContentContainer>
          <S.Title>CheQuiz</S.Title>
          {isLogin && (
            <div>
              <S.Button href="#">문제 만들기</S.Button>
              <S.Button href="#">랭킹 보기</S.Button>
              <S.Button href="#">내 정보</S.Button>
              <S.Button href="#">로그아웃</S.Button>
            </div>
          )}
          {!isLogin && (
            <div>
              <S.Button href="#">랭킹 보기</S.Button>
              <S.Button href="#">로그인</S.Button>
              <S.Button href="#">회원가입</S.Button>
            </div>
          )}
        </S.ContentContainer>
      </S.HeaderContainer>
      <S.HeaderSpacer />
    </>
  );
}

export default Header;
