import { v4 } from 'uuid';

import { updateTotalPoint as updateUserScore } from '@/api/UserServices';
import { POINTS } from '@/constants';

import type { UserAPI, UserQuizInfo } from '@/interfaces/UserAPI';

/**
 * @description
 * userQuizInfo를 반환하는 QuizSolvePage의 helper 함수입니다.
 * @param user UserAPI 인터페이스를 갖는 유저 정보
 * @param point 이번 퀴즈를 해결해서 얻은 점수
 * @returns UserQuizInfo 객체
 */
export const getUserScore = (user: UserAPI, point: number) => {
  // 유저가 처음 문제를 해결하면 정보가 없기 때문에, 이를 반환하는 객체가 필요하다.
  const newInfo: UserQuizInfo = {
    _id: v4(),
    points: point,
  };

  if (user.username) {
    const prevUserInfo = JSON.parse(user.username) as Partial<UserQuizInfo>;

    if (prevUserInfo._id) newInfo._id = prevUserInfo._id;

    if (prevUserInfo.points) newInfo.points = point + prevUserInfo.points;
  }

  return newInfo;
};

// totalPoint를 받아와 이를 서버에 반영한다.
export const updateUserPoint = async (user: UserAPI, totalPoint: number) => {
  try {
    sessionStorage.setItem(POINTS, JSON.stringify(totalPoint));

    // user 정보 업데이트
    const newUserInfo = await updateUserScore({
      fullName: user.fullName,
      username: getUserScore(user, totalPoint),
    });

    return newUserInfo;
  } catch {
    throw new Error('error occurred at updateUserPoint.');
  }
};
