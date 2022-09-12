/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback, useEffect, useState } from 'react';

import { fetchUserData, fetchUserList, fetchUserQuiz } from '@/api/user';
import { DEFAULT_USER_DATA } from '@/assets/UserInfoDefault';
import { MAXEXP } from '@/common/number';
import { getUserImageByPoints } from '@/utils/getUserImage';

import * as Breakpoints from '../breakpoints';

import * as S from './styles';

import type { BadgeType } from '@/interfaces/BadgeType';
import type { PostAPIUserInfo } from '@/interfaces/PostAPI';
import type {
  CustomUserAPI,
  UserAPI,
  UserQuizCategory,
  UserSimpleType,
} from '@/interfaces/UserAPI';

const UserInfoCard = ({
  id,
  width = '40rem',
}: {
  id: string;
  width?: string;
}) => {
  const [userData, setUserData] = useState<CustomUserAPI>(DEFAULT_USER_DATA);
  const [userRank, setUserRank] = useState(0);
  const [userQuiz, setUserQuiz] = useState<UserQuizCategory[]>([]);

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
        .sort((userA: UserSimpleType, userB: UserSimpleType) => {
          if (userB.points === userA.points) {
            const isCreatedFirst =
              new Date(userB.createdAt ? userB.createdAt : '') <
              new Date(userA.createdAt ? userA.createdAt : '');
            return isCreatedFirst ? 1 : -1;
          }
          return userB.points - userA.points;
        });
      const rank =
        realData.findIndex((user: UserSimpleType) => user.id === id) + 1;
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
    updateUserQuiz();
  }, [id]);

  const level = userData.totalExp
    ? Math.floor(userData.totalExp / MAXEXP) + 1
    : 1;
  const currentExp = userData.totalExp
    ? userData.totalExp - (level - 1) * MAXEXP
    : 0;

  const expPercent = Math.floor((currentExp / MAXEXP) * 100);

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

    const userLevelBadges = Breakpoints.levelBreakpoints.filter(
      (badge) => badge.level <= level
    );
    const selectedLevelBadge = userLevelBadges[userLevelBadges.length - 1];
    badges.push({
      id: `badgeLevel${selectedLevelBadge.level}`,
      color: selectedLevelBadge.color,
      content: `${
        selectedLevelBadge.level !== 0
          ? `내가 레벨 ${selectedLevelBadge.level} 이라니!`
          : `뉴비라네`
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
        <S.UserCard width={width}>
          <S.UserBasicContent>
            <S.ImageWrapper>
              <S.UserImage
                src={getUserImageByPoints(
                  userData.totalExp ? userData.totalExp : 0
                )}
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
                  key={badge.id}
                  color={badge.color ? badge.color : '#fffff'}
                >
                  {badge.content}
                </S.Badge>
              ))}
            </S.BadgeContent>
          </S.UserRankContent>
        </S.UserCard>
      )}
      {userData.id === 'loading' && <S.UserCard width={width} />}
    </>
  );
};
export default UserInfoCard;
