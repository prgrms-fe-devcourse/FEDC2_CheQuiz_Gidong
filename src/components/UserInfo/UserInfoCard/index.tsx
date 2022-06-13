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

interface userProps {
  nickname: string;
  rank: number;
  exp: number;
  maxExp: number;
}

function UserInfoCard({ nickname, rank, exp, maxExp }: userProps) {
  let percent = Math.ceil((exp / maxExp) * 100);
  if (percent > 100) percent = 100;
  return (
    <UserCard>
      <UserBasicContent>
        <UserImage src="https://maplestory.io/api/GMS/210.1.1/mob/1110100/render/stand" />
        <Username>{nickname}</Username>
      </UserBasicContent>

      <UserRankContent>
        <Rank>Rank : {rank}</Rank>

        <ExpWrapper>
          <ExpContainer>
            <ExpDetail>
              {exp}/{maxExp}
            </ExpDetail>
            <ExpCurrentContainer percent={percent} />
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
