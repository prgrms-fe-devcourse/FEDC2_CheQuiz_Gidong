import {
  HeaderContainer,
  ContentContainer,
  Title,
  Button,
  HeaderSpacer,
} from './styles';

interface HeaderProps {
  isLogin?: boolean;
}

function Header({ isLogin }: HeaderProps): JSX.Element {
  return (
    <>
      <HeaderContainer>
        <ContentContainer>
          <Title>CheQuiz</Title>
          {isLogin && (
            <div>
              <Button href="#">문제 만들기</Button>
              <Button href="#">랭킹 보기</Button>
              <Button href="#">내 정보</Button>
              <Button href="#">로그아웃</Button>
            </div>
          )}
          {!isLogin && (
            <div>
              <Button href="#">랭킹 보기</Button>
              <Button href="#">로그인</Button>
              <Button href="#">회원가입</Button>
            </div>
          )}
        </ContentContainer>
      </HeaderContainer>
      <HeaderSpacer />
    </>
  );
}

export default Header;
