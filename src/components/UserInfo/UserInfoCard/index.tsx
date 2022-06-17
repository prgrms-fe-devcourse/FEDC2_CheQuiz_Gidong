import { useCallback, useEffect, useState } from 'react';
import { MAXEXP } from '@/common/number';
import * as S from './styles';
import * as Breakpoints from './breakpoints';
import { BadgeType } from '@/interfaces/BadgeType';
import {
  customUserAPI,
  UserAPI,
  userQuizCategory,
  userSimpleType,
} from '@/interfaces/UserAPI';
import { fetchUserData, fetchUserList, fetchUserQuiz } from '@/api/user';
import { DEFAULT_USER_DATA } from '@/assets/UserInfoDefault';
import { PostAPIUserInfo } from '@/interfaces/PostAPI';

<<<<<<< HEAD
interface userProps {
  id: string;
}

function UserInfoCard({ id }: userProps) {
<<<<<<< HEAD
  // TODO: id를 기반으로 비동기 API요청> userData 가져오기
  const userData = {
    id: userMockData._id,
    fullName: userMockData.fullName,
    likes: userMockData.likes,
    posts: userMockData.posts,
    comments: userMockData.comments,
    totalExp:
      userMockData && userMockData.username
        ? JSON.parse(userMockData.username).totalPoints
        : 0,
  };
=======
=======
function UserInfoCard({ id }: { id: string }) {
>>>>>>> 8a5e13a ([feat] 카테고리 뱃지 API 연동)
  const [userData, setUserData] = useState<customUserAPI>(DEFAULT_USER_DATA);
  const [userRank, setUserRank] = useState(0);
  const [userQuiz, setUserQuiz] = useState<userQuizCategory[]>([]);

  useEffect(() => {
    const updateUserData = async () => {
      const apiData = await fetchUserData(id);
      const realData = {
        id: apiData._id,
        fullName: apiData.fullName,
        likes: apiData.likes,
        posts: apiData.posts,
        comments: apiData.comments,
        totalExp: apiData.username ? JSON.parse(apiData.username).points : 0,
      };
      setUserData(realData);
    };
<<<<<<< HEAD
    updateUserData();
  }, [id]);
>>>>>>> afd5a80 ([feat] 유저 기본 정보 api 연결)

  // TODO: 유저리스트 비동기 API요청 필요
  const getRank = useCallback(() => {
    const sortedUserList = userList
      .map((user) => ({
        id: user._id,
        fullName: user.fullName,
        points:
          user && user.username ? JSON.parse(user.username).totalPoints : 0,
      }))
      .sort((a, b) => {
        return b.points - a.points;
      });
    const rank = sortedUserList.findIndex((data) => data.id === id) + 1;
    return rank;
=======

    const updateUserRank = async () => {
      const apiData = await fetchUserList();
      const realData = apiData
        .filter((user: UserAPI) => user.role !== 'SuperAdmin')
        .map((user: UserAPI) => ({
          id: user._id,
          fullName: user.fullName,
          points: user.username ? JSON.parse(user.username).points : 0,
          createdAt: user.createdAt,
        }))
        .sort((userA: userSimpleType, userB: userSimpleType) => {
          if (userB.points === userA.points) {
            const isCreatedFirst =
              new Date(userB.createdAt ? userB.createdAt : '') <
              new Date(userA.createdAt ? userA.createdAt : '');
            return isCreatedFirst ? 1 : -1;
          }
          return userB.points - userA.points;
        });
      const rank =
        realData.findIndex((user: userSimpleType) => user.id === id) + 1;
      setUserRank(rank);
    };

    // TODO: 퀴즈 데이터가 충분히 쌓이면, 제대로 카테고리가 반영되는지 확인TEST 필요
    const updateUserQuiz = async () => {
      const apiData = await fetchUserQuiz(id);

      const realData = apiData.map((quiz: PostAPIUserInfo) => {
        const customData = JSON.parse(quiz.title);
        return {
          id: quiz._id,
          category: customData.category,
        };
      });
      setUserQuiz(realData);
    };
    updateUserData();
    updateUserRank();
<<<<<<< HEAD
>>>>>>> 105dcb6 ([feat] 유저 랭크 정보 api 연결)
=======
    updateUserQuiz();
>>>>>>> 8a5e13a ([feat] 카테고리 뱃지 API 연동)
  }, [id]);

  const level = userData.totalExp
    ? Math.floor(userData.totalExp / MAXEXP) + 1
    : 1;
  const currentExp = userData.totalExp
    ? userData.totalExp - (level - 1) * MAXEXP
    : 0;

  const expPercent = Math.floor((currentExp / MAXEXP) * 100);

  const getImage = useCallback(() => {
    let selectedId = Breakpoints.imageBreakpoints[0].imageId;
    Breakpoints.imageBreakpoints.forEach((breakpoint) => {
      if (level >= breakpoint.level) {
        selectedId = breakpoint.imageId;
      }
    });
    return selectedId;
  }, [level]);

  const getQuizCategoryCount = useCallback(() => {
    const categoryMap = new Map();

    userQuiz.forEach((quiz) => {
      const { category } = quiz;
      const count = categoryMap.get(category);
      if (count) {
        categoryMap.set(category, count + 1);
      } else {
        categoryMap.set(category, 1);
      }
    });

    const categoryQuiz = Array.from(categoryMap).sort((a, b) => {
      if (a[1] <= b[1]) return 1;
      return -1;
    });

    return categoryQuiz;
  }, [userQuiz]);

  const getBadges = useCallback(() => {
    const badges: BadgeType[] = [];

    const userLevelBadges = Breakpoints.levelBreakpoints.filter((badge) => {
      return badge.level <= level;
    });
    const selectedLevelBadge = userLevelBadges[userLevelBadges.length - 1];
    badges.push({
      id: `badgeLevel${selectedLevelBadge.level}`,
      color: selectedLevelBadge.color,
      content: `${
        selectedLevelBadge.level !== 0
          ? `내가 레벨 ${selectedLevelBadge.level} 이라니!`
          : `뉴비`
      }`,
    });

    getQuizCategoryCount().forEach((quiz: [string, number], index) => {
      if (quiz[1] >= 10) {
        badges.push({
          id: `badgeCategory${index}`,
          content: `${quiz[0]}을 ${quiz[1] >= 50 ? '정복' : '시작'}한 자`,
        });
      }
    });

    // 댓글과 좋아요로 뱃지 가져오기
    Breakpoints.commentBreakpoints.forEach((breakpoint, index) => {
      const badge = {
        id: `badgeComment${index}`,
        color: breakpoint.color,
        content: breakpoint.text,
      };
      if (breakpoint.exact) {
        if (userData.comments.length === breakpoint.count) {
          badges.push(badge);
        }
      } else if (userData.comments.length >= breakpoint.count) {
        badges.push(badge);
      }
    });

    Breakpoints.likeBreakpoints.forEach((breakpoint, index) => {
      const badge = {
        id: `badgeLike${index}`,
        color: breakpoint.color,
        content: breakpoint.text,
      };
      if (breakpoint.exact) {
        if (userData.likes.length === breakpoint.count) {
          badges.push(badge);
        }
      } else if (userData.likes.length >= breakpoint.count) {
        badges.push(badge);
      }
    });

    Breakpoints.likeAndCommentBreakpoints.forEach((breakpoint, index) => {
      const badge = {
        id: `badgeLikeComment${index}`,
        color: breakpoint.color,
        content: breakpoint.text,
      };
      if (breakpoint.exact) {
        if (
          userData.likes.length === breakpoint.count &&
          userData.comments.length === breakpoint.count
        ) {
          badges.push(badge);
        }
      } else if (
        userData.likes.length >= breakpoint.count &&
        userData.comments.length >= breakpoint.count
      ) {
        badges.push(badge);
      }
    });
    return badges;
  }, [
    userData.comments.length,
    userData.likes.length,
    level,
    getQuizCategoryCount,
  ]);

  return (
    <>
      {userData.id !== 'loading' && (
        <S.UserCard>
          <S.UserBasicContent>
            <S.ImageWrapper>
              <S.UserImage
                src={`https://maplestory.io/api/GMS/210.1.1/mob/${getImage()}/render/stand`}
              />
            </S.ImageWrapper>

            <S.Username>{userData.fullName}</S.Username>
            <S.LevelText>Lv.{level}</S.LevelText>
          </S.UserBasicContent>

          <S.UserRankContent>
            <S.Rank>Rank : {userRank}</S.Rank>

            <S.ExpWrapper>
              <S.ExpContainer>
                <S.ExpDetail>
                  {currentExp}/{MAXEXP}
                </S.ExpDetail>
                <S.ExpCurrentContainer percent={expPercent} />
              </S.ExpContainer>
            </S.ExpWrapper>

            <S.BadgeContent>
              {getBadges().map((badge) => (
                <S.Badge
                  color={badge.color ? badge.color : '#fffff'}
                  key={badge.id}
                >
                  {badge.content}
                </S.Badge>
              ))}
            </S.BadgeContent>
          </S.UserRankContent>
        </S.UserCard>
      )}
      {userData.id === 'loading' && <S.UserCard />}
    </>
  );
}
export default UserInfoCard;
