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
  UserInfoMockData as userMockData,
} from '@/assets/UserInfoMockData';

interface userProps {
  id: string;
}
function UserInfoCard({ id }: userProps) {
  // TODO: id를 기반으로 비동기 API요청> userData 가져오기
  const userData = {
    id: userMockData._id,
    fullName: userMockData.fullName,
    likes: userMockData.likes,
    posts: userMockData.posts,
    comments: userMockData.comments,
    totalExp: JSON.parse(userMockData.username).totalPoints,
  };

  const level = Math.floor(userData.totalExp / MAXEXP) + 1;
  const currentExp = userData.totalExp - (level - 1) * MAXEXP;
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
      id: `badgeLv${levelBadgeId}`,
      color: levelBreakpoints[levelBadgeId].color,
      content: `${
        levelBadgeId !== 0
          ? `내가 레벨 ${levelBreakpoints[levelBadgeId].level} 이라니!`
          : `뉴비`
      }`,
    });
    // TODO: 퀴즈 별 뱃지 => typescript에 익숙하지 않아 추후 구현 예정..

    // 좋아요, 댓글 당 뱃지
    console.log(userData.comments.length, userData.likes.length);

    // 댓글 10개 이상 & 좋아요 10개 이상 소통왕.. 댓글 10개 이상 투머치토커..
    // 좋아요 10개 이상 사랑꾼, 좋아요 없음 무뚝뚝그자체, 댓글 없음 묵언수행중,
    // 댓글 없음 & 좋아요 없음 혼자가좋아

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

        <Username>{userData.fullName}</Username>
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
