import { useCallback } from 'react';
import { MAXEXP } from '@/common/number';
import {
  UserCard,
  Username,
  UserImage,
  ImageWrapper,
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
import { UserInfoMockList as userList } from '@/assets/UserInfoMockData';

interface userProps {
  id: string;
  totalExp: number;
  nickname: string;
}
function UserInfoCard({ id, totalExp, nickname }: userProps) {
  const level = Math.floor(totalExp / MAXEXP) + 1;
  const currentExp = totalExp - (level - 1) * MAXEXP;
  const expPercent = Math.floor((currentExp / MAXEXP) * 100);

  const levelBreakpoints = [
    { level: 50000, color: '#FF1809' },
    { level: 10000, color: '#F30E5C' },
    { level: 5000, color: '#FAFF00' },
    { level: 1000, color: '#FFBEB8' },
    { level: 500, color: '#0D99FF' },
    { level: 100, color: '#00FFAB' },
    { level: 50, color: '#6D8B74' },
    { level: 10, color: '#5f7161' },
  ];

  // TODO: 유저리스트 비동기 처리
  const getRank = useCallback(() => {
    const sortedUserList = userList
      .map((user) => ({
        id: user._id,
        fullName: user.fullName,
        points: JSON.parse(user.username).totalPoints,
      }))
      .sort((a, b) => {
        return b.points - a.points;
      });
    const rank = sortedUserList.findIndex((data) => data.id === id) + 1;
    return rank;
  }, [id]);

  const getImage = () => {
    if (level < 10) return '100120';
    if (level < 50) return '100121';
    if (level < 100) return '100122';
    if (level < 500) return '100123';
    if (level < 1000) return '100124';
    if (level < 5000) return '2510000';
    if (level < 10000) return '8600006';
    return '6400006';
  };
  interface badgeType {
    id: string;
    color: string;
    content: string;
  }

  const getBadges = () => {
    const badges: badgeType[] = [];
    // 레벨 별 뱃지
    levelBreakpoints.forEach((badge, index) => {
      if (level > badge.level) {
        badges.push({
          id: `badge${index}`,
          color: levelBreakpoints[index].color,
          content: `내가 레벨 ${levelBreakpoints[index].level} 이라니!`,
        });
      }
    });
    return badges;
  };
  getBadges();
  return (
    <UserCard>
      <UserBasicContent>
        <ImageWrapper>
          <UserImage
            src={`https://maplestory.io/api/GMS/210.1.1/mob/${getImage()}/render/stand`}
          />
        </ImageWrapper>

        <Username>{nickname}</Username>
        <LevelText>Lv.{level}</LevelText>
      </UserBasicContent>

      <UserRankContent>
        <Rank>Rank : {getRank()}</Rank>

        <ExpWrapper>
          <ExpContainer>
            <ExpDetail>
              {currentExp}/{MAXEXP}
            </ExpDetail>
            <ExpCurrentContainer percent={expPercent} />
          </ExpContainer>
        </ExpWrapper>

        <BadgeContent>
          {/* <Badge color="#ffe96e">내가 레벨 100이라니!</Badge>
          <Badge color="#ffc77e">CheQuiz 은행장</Badge>
          <Badge color="#8cd1ff">React Lv.1</Badge>
          <Badge color="#c7c4f7">이거 한 번 풀어볼래?</Badge> */}
          {getBadges().map((badge) => (
            <Badge color={badge.color} key={badge.id}>
              {badge.content}
            </Badge>
          ))}
        </BadgeContent>
      </UserRankContent>
    </UserCard>
  );
}
export default UserInfoCard;
