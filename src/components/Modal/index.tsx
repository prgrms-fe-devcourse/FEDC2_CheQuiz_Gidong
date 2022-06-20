import * as S from './styles';

function Modal() {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>비밀번호 변경</S.Title>
        <form>
          <S.Label htmlFor="password">새 비밀번호</S.Label>
          <S.TextInput id="password" />

          <S.Label htmlFor="password_validation">비밀번호 확인</S.Label>
          <S.TextInput id="password_validation" />

          <S.ButtonContainer>
            <S.ButtonInput type="submit" value="저장" />
          </S.ButtonContainer>
        </form>
      </S.Container>
    </S.Wrapper>
  );
}

export default Modal;
