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
import {
  UserInfoMockList as userList,
  userQuizMockList as userQuizList,
} from '@/assets/UserInfoMockData';

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
    { level: 0, color: '#977C37' },
    { level: 10, color: '#5f7161' },
    { level: 50, color: '#6D8B74' },
    { level: 100, color: '#00FFAB' },
    { level: 500, color: '#0D99FF' },
    { level: 1000, color: '#FFBEB8' },
    { level: 5000, color: '#FAFF00' },
    { level: 10000, color: '#F30E5C' },
    { level: 50000, color: '#FF1809' },
  ];

  const imageBreakpoints = [
    { level: 10, imageId: '100120' },
    { level: 50, imageId: '100121' },
    { level: 100, imageId: '100122' },
    { level: 500, imageId: '100123' },
    { level: 1000, imageId: '100124' },
    { level: 5000, imageId: '2510000' },
    { level: 10000, imageId: '8600006' },
    { level: 50000, imageId: '6400006' },
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
    let imageId = '100120';
    imageBreakpoints.forEach((breakpoint) => {
      if (level >= breakpoint.level) {
        imageId = breakpoint.imageId;
      }
    });
    return imageId;
  };

  const getQuiz = () => {
    const modifiedQuiz = userQuizList.map((quiz) => {
      const customData = JSON.parse(quiz.title);
      return {
        id: quiz._id,
        category: customData.tag,
      };
    });
    return modifiedQuiz;
  };

  console.log(getQuiz());
  interface badgeType {
    id: string;
    color: string;
    content: string;
  }

  const getBadges = () => {
    const badges: badgeType[] = [];
    // 레벨 별 뱃지

    let levelBadgeId = 0;
    levelBreakpoints.forEach((badge, index) => {
      if (level > badge.level) {
        levelBadgeId = index;
      }
    });

    badges.push({
      id: `badge${levelBadgeId}`,
      color: levelBreakpoints[levelBadgeId].color,
      content: `${
        levelBadgeId !== 0
          ? `내가 레벨 ${levelBreakpoints[levelBadgeId].level} 이라니!`
          : `뉴비`
      }`,
    });
    // 퀴즈 별 뱃지

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
