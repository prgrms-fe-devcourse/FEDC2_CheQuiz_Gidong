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
import * as Breakpoints from './breakpoints';

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
    Breakpoints.imageBreakpoints.forEach((breakpoint) => {
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
    Breakpoints.levelBreakpoints.forEach((badge, index) => {
      if (level > badge.level) {
        levelBadgeId = index;
      }
    });

    badges.push({
      id: `badgeLevel${levelBadgeId}`,
      color: Breakpoints.levelBreakpoints[levelBadgeId].color,
      content: `${
        levelBadgeId !== 0
          ? `내가 레벨 ${Breakpoints.levelBreakpoints[levelBadgeId].level} 이라니!`
          : `뉴비`
      }`,
    });
    // TODO: 퀴즈 별 뱃지 => typescript에 익숙하지 않아 추후 구현 예정..

    // 좋아요, 댓글 당 뱃지

    Breakpoints.commentBreakpoints.forEach((breakpoint, index) => {
      if (breakpoint.exact) {
        if (userData.comments.length === breakpoint.count) {
          badges.push({
            id: `badgeComment${index}`,
            color: breakpoint.color,
            content: breakpoint.text,
          });
        }
      } else if (userData.comments.length >= breakpoint.count) {
        badges.push({
          id: `badgeComment${index}`,
          color: breakpoint.color,
          content: breakpoint.text,
        });
      }
    });

    Breakpoints.likeBreakpoints.forEach((breakpoint, index) => {
      if (breakpoint.exact) {
        if (userData.likes.length === breakpoint.count) {
          badges.push({
            id: `badgeLike${index}`,
            color: breakpoint.color,
            content: breakpoint.text,
          });
        }
      } else if (userData.likes.length >= breakpoint.count) {
        badges.push({
          id: `badgeLike${index}`,
          color: breakpoint.color,
          content: breakpoint.text,
        });
      }
    });

    Breakpoints.likeAndCommentBreakpoints.forEach((breakpoint, index) => {
      if (breakpoint.exact) {
        if (
          userData.likes.length === breakpoint.count &&
          userData.comments.length === breakpoint.count
        ) {
          badges.push({
            id: `badgeLikeComment${index}`,
            color: breakpoint.color,
            content: breakpoint.text,
          });
        }
      } else if (
        userData.likes.length >= breakpoint.count &&
        userData.comments.length >= breakpoint.count
      ) {
        badges.push({
          id: `badgeLikeComment${index}`,
          color: breakpoint.color,
          content: breakpoint.text,
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
