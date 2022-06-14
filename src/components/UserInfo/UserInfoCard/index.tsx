import { MAXEXP } from '@/common/number';
import {
  UserCard,
  Username,
  UserImage,
  LevelText,
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
  totalExp: number;
}
// 데이터를 보여주는 곳. 바뀌지 않는다!
// 경험치, 레벨 관련 처리
function UserInfoCard({ nickname, totalExp }: userProps) {
  const level = Math.floor(totalExp / MAXEXP);
  const currentExp = totalExp - level * MAXEXP;
  const expPercent = Math.floor((currentExp / MAXEXP) * 100);

  return (
    <UserCard>
      <UserBasicContent>
        <UserImage src="https://maplestory.io/api/GMS/210.1.1/mob/1110100/render/stand" />
        <Username>{nickname}</Username>
        <LevelText>Lv.{level}</LevelText>
      </UserBasicContent>

      <UserRankContent>
        <Rank>Rank : {1}</Rank>

        <ExpWrapper>
          <ExpContainer>
            <ExpDetail>
              {currentExp}/{MAXEXP}
            </ExpDetail>
            <ExpCurrentContainer percent={expPercent} />
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
