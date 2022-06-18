import * as S from './styles';

function UserInfoTab({ id }: { id: string }) {
  return (
    <S.TabWrapper>
      <S.TabItemContainer>
        <S.TabItem selected>만든 문제</S.TabItem>
        <S.TabItem>댓글</S.TabItem>
        <S.TabItem>좋아요 한 문제</S.TabItem>
      </S.TabItemContainer>

      <S.TabContent>
        <S.ButtonWrapper>
          <S.Button color="#5B9785">퀴즈 수정</S.Button>
          <S.Button color="#CE4C4C">퀴즈 삭제</S.Button>
        </S.ButtonWrapper>
      </S.TabContent>
    </S.TabWrapper>
  );
}

export default UserInfoTab;
