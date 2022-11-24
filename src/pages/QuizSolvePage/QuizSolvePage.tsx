import type React from 'react';
import { useEffect } from 'react';

import styled from '@emotion/styled';
import { Redirect, useHistory } from 'react-router';

import * as QuizServices from '@api/QuizServices';
import { Layout, QuizContentArea, QuizSubmitArea } from '@components/QuizSolve';
import { POINTS, POST_IDS, USER_ANSWERS } from '@constants/.';
import { useAuthContext } from '@contexts/AuthContext';
import { useQuizContext } from '@contexts/QuizContext';
import useLoading from '@hooks/shared/useLoading';
import useQuiz from '@hooks/useQuiz';

import { updateUserPoint } from './QuizSolvePage.helper';

const QuizSolvePage = () => {
  const history = useHistory();
  const { user, setUser, isAuth } = useAuthContext();
  const { channelId, randomQuizCount, setChannelId, setRandomQuizCount } =
    useQuizContext();

  const { quizzes, userAnswers, handleUserAnswers, getQuizSet, getQuizRandom } =
    useQuiz();

  const [isLoading, startTransition] = useLoading(true);

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
        const newUserInfo = await updateUserPoint(user, totalPoint);
        setUser(newUserInfo);
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
    startTransition(
      (async () => {
        try {
          if (randomQuizCount && randomQuizCount > 0) {
            await getQuizRandom(randomQuizCount);
          } else if (channelId) {
            await getQuizSet(channelId);
          }
        } catch (error) {
          console.error('error occurred at QuizSolvePage.');
          console.error(error);
        }
      })()
    );
  }, [channelId, getQuizRandom, getQuizSet, randomQuizCount, startTransition]);

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
