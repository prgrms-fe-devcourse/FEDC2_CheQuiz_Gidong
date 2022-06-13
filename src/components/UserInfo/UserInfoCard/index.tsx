import {
  UserCard,
  Username,
  UserImage,
  UserBasicContent,
  UserRankContent,
  Rank,
  ExpContainer,
  ExpCurrentContainer,
  ExpWrapper,
  ExpDetail,
  BadgeContent,
  Badge,
} from './styles';

function UserInfoCard() {
  return (
    <UserCard>
      <UserBasicContent>
        <UserImage src="https://maplestory.io/api/GMS/210.1.1/mob/1110100/render/stand" />
        <Username>블랑슈베리</Username>
      </UserBasicContent>
      <UserRankContent>
        <Rank>Rank : 315</Rank>
        <ExpWrapper>
          <ExpContainer>
            <ExpDetail>3150/9999</ExpDetail>
            <ExpCurrentContainer percent={70} />
          </ExpContainer>
        </ExpWrapper>
        <BadgeContent>
          <Badge color="#ffe96e">내가 레벨 100이라니!</Badge>
          <Badge color="#ffc77e">CheQuiz 은행장</Badge>
          <Badge color="#8cd1ff">React Lv.1</Badge>
          <Badge color="#c7c4f7">이거 한 번 풀어볼래?</Badge>
        </BadgeContent>
      </UserRankContent>
    </UserCard>
  );
}
export default UserInfoCard;
