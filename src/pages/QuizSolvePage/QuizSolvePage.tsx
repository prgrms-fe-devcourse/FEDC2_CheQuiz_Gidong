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

  const updateUserPoint = useCallback(async () => {
    try {
      const totalPoint = QuizServices.caculateScore(quizzes, userAnswers);
      sessionStorage.setItem(POINTS, JSON.stringify(totalPoint));

      const newInfo = {
        _id: v4(),
        points: totalPoint,
      };
      if (user.username) {
        const prevUserInfo = JSON.parse(user.username) as UserQuizInfo;
        if (prevUserInfo._id) newInfo._id = prevUserInfo._id;
        if (prevUserInfo.points)
          newInfo.points = totalPoint + prevUserInfo.points;
      }
      const newUserInfo = await updateTotalPoint({
        fullName: user.fullName,
        username: newInfo,
      });
      setUser(newUserInfo);
    } catch (error) {
      console.log('error occured at updateUserPoint.');
    }
  }, [quizzes, setUser, user.fullName, user.username, userAnswers]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      // validation
      if (quizzes.length !== userAnswers.filter((answer) => answer).length) {
        console.log('올바르지 않은 동작입니다.');
        return;
      }

      sessionStorage.setItem(USER_ANSWERS, JSON.stringify(userAnswers));
      sessionStorage.setItem(
        POST_IDS,
        JSON.stringify(quizzes.map((quiz) => quiz._id))
      );

      // 로그인했다면, 사용자의 점수를 반영
      if (isAuth) {
        await updateUserPoint();
      }

      setRandomQuizCount(null);
      setChannelId(null);

      history.push('/result');
    },
    [
      history,
      isAuth,
      quizzes,
      setChannelId,
      setRandomQuizCount,
      updateUserPoint,
      userAnswers,
    ]
  );

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
