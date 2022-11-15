import type React from 'react';
import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { Redirect, useHistory } from 'react-router';
import { v4 } from 'uuid';

import * as QuizServices from '@/api/QuizServices';
import { updateTotalPoint } from '@/api/UserServices';
import { POINTS, POST_IDS, USER_ANSWERS } from '@/constants';
import { useAuthContext } from '@/contexts/AuthContext';
import { useQuizContext } from '@/contexts/QuizContext';
import { Layout, QuizContentArea, QuizSubmitArea } from '@components/QuizSolve';
import useLoading from '@hooks/shared/useLoading';

import type { Quiz as QuizInterface } from '@/interfaces/Quiz';
import type { UserQuizInfo } from '@/interfaces/UserAPI';

const QuizSolvePage = () => {
  const history = useHistory();
  const { user, setUser, isAuth } = useAuthContext();
  const { channelId, randomQuizCount, setChannelId, setRandomQuizCount } =
    useQuizContext();

  const [quizzes, setQuizzes] = useState<QuizInterface[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isLoading, startTransition] = useLoading(true);

  const handleUserAnswers = useCallback((index: number, value: string) => {
    setUserAnswers((prev) =>
      prev.map((answer, idx) => (idx === index ? value : answer))
    );
  }, []);

  // totalPoint를 받아와 이를 서버에 반영한다.
  const updateUserPoint = async (totalPoint: number) => {
    const getNewUserQuizInfo = () => {
      // userInfo에 들어갈 임시 데이터
      const newInfo: UserQuizInfo = {
        _id: v4(),
        points: totalPoint,
      };

      if (user.username) {
        const prevUserInfo = JSON.parse(user.username) as Partial<UserQuizInfo>;

        if (prevUserInfo._id) newInfo._id = prevUserInfo._id;

        if (prevUserInfo.points)
          newInfo.points = totalPoint + prevUserInfo.points;
      }

      return newInfo;
    };

    try {
      sessionStorage.setItem(POINTS, JSON.stringify(totalPoint));

      // user의 퀴즈 정보가 username에 저장되어 있기 때문에, user.username을 호출한다.
      // 첫 호출시에는 없을 수 있기 때문에 확인해야 한다.

      // user 정보 업데이트
      const newUserInfo = await updateTotalPoint({
        fullName: user.fullName,
        username: getNewUserQuizInfo(),
      });

      setUser(newUserInfo);
    } catch {
      throw new Error('error occurred at updateUserPoint.');
    }
  };

  const validate = () => {
    if (quizzes.length !== userAnswers.filter((answer) => answer).length)
      throw new Error('모든 정답을 선택해 주세요!');
  };

  // form event 발생 시 호출될 함수
  // 1) validation - 모든 퀴즈 정답을 선택했는지 확인
  // 2) 모든 정답을 선택하면 유저가 선택한 정답과 퀴즈 id 배열을 세션 스토리지에 저장
  // 3) 로그인 했다면, 점수를 계산해서 반영
  // 4) context 정보 초기화
  // 5) go to result page
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      validate();

      // 모든 정답을 선택하면 유저가 선택한 정답과 퀴즈 id 배열을 세션 스토리지에 저장
      sessionStorage.setItem(USER_ANSWERS, JSON.stringify(userAnswers));
      sessionStorage.setItem(
        POST_IDS,
        JSON.stringify(quizzes.map((quiz) => quiz._id))
      );
    } catch (error) {
      alert(error);
      return;
    }

    // 점수 계산
    const totalPoint = QuizServices.caculateScore(quizzes, userAnswers);

    // 로그인했다면, 사용자의 점수를 반영
    if (isAuth) {
      try {
        await updateUserPoint(totalPoint);
      } catch (error) {
        console.error(error);
      }
    }

    // context 초기화
    setRandomQuizCount(null);
    setChannelId(null);

    // go to result page
    history.push('/result');
  };

  useEffect(() => {
    // initialize
    sessionStorage.removeItem(POST_IDS);
    sessionStorage.removeItem(USER_ANSWERS);
    sessionStorage.removeItem(POINTS);
  }, []);

  useEffect(() => {
    // randomQuizCount가 0보다 클 경우 -> shuffle된 퀴즈를 가져온다.
    // channelId가 있다면 -> 퀴즈 세트를 가져온다
    // 두 함수를 분리하는 것이 좋을 듯 하다.

    // randomQuizCount로 부터 shuffled된 퀴즈를 불러와 상태에 저장하는 함수
    // 동시에 user answer 배열의 길이를 초기화
    const getRandomQuizzes = async (count: number) => {
      try {
        const randomQuizzes = await QuizServices.getShuffledQuizzes(count);

        setQuizzes(randomQuizzes);
        setUserAnswers(Array(randomQuizzes.length).fill(''));
      } catch (error) {
        console.error('error occurred at getRandomQuizzes.');
        console.error(error);
      }
    };

    // channelId로부터 퀴즈를 가져와 이를 반영하는 함수
    // 동시에 user answer 배열의 길이를 초기화
    const getSetQuizzes = async (channel: string) => {
      try {
        const quizSet = await QuizServices.getQuizzesFromChannel(channel);

        setQuizzes(quizSet);
        setUserAnswers(Array(quizSet.length).fill(''));
      } catch (error) {
        console.error('error occurred at getSetQuizzes.');
        console.error(error);
      }
    };

    startTransition(
      (async () => {
        try {
          if (randomQuizCount && randomQuizCount > 0) {
            await getRandomQuizzes(randomQuizCount);
          } else if (channelId) {
            await getSetQuizzes(channelId);
          }
        } catch (error) {
          console.error('error occurred at QuizSolvePage.');
          console.error(error);
        }
      })()
    );
  }, [channelId, randomQuizCount, startTransition]);

  const disabled =
    userAnswers.filter((answer) => answer).length < quizzes.length;

  if (isLoading) return null;
  if (!(channelId || randomQuizCount)) {
    return <Redirect to='/error' />;
  }
  return (
    <Layout backgroundColor='#E9ECEF'>
      <form onSubmit={handleSubmit}>
        <Container>
          <QuizContentArea
            quizzes={quizzes}
            onClickAnswer={handleUserAnswers}
          />
          <QuizSubmitArea disabled={disabled} />
        </Container>
      </form>
    </Layout>
  );
};

export default QuizSolvePage;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  marginTop: '5rem',
});
