import { useEffect, useState } from 'react';

import { Redirect } from 'react-router';

import Header from '@/components/Header';
import UserInfoCard from '@/components/UserInfo/UserInfoCard';
import { POST_IDS, USER_ANSWERS } from '@/constants';
import { useAuthContext } from '@/contexts/AuthContext';
import { useSessionStorage } from '@/hooks/useStorage';
import QuizResult from '@components/QuizResult';
import { useQuiz } from '@hooks/useQuiz';

import * as S from './styles';

/**
 * ANCHOR: QuizResultPage 로직
 * 1. sessionStorage에서 post-ids, user-answers를 불러온다.
 * 2. post-ids와 user-answers 개수를 확인하여 일치하지 않았다면 404페이지로 이동한다.
 * 3. 댓글을 달 수 있는 input과, 좋아요를 누를 수 있는 like가 각 컴포넌트에 위치하여야 한다.
 * 4. random인지, random인지 아닌지 저장해야 한다.
 */
const QuizResultPage = () => {
  const { user, isAuth } = useAuthContext();
  const { quizzes, getQuizzesFromIds } = useQuiz();
  const [postIds] = useSessionStorage<string[]>(POST_IDS, []);
  const [userAnswers] = useSessionStorage<string[]>(USER_ANSWERS, []);
  const [loading, setLoading] = useState(true);

  // TODO: 나중에 책임 분리 가능
  const isAppropriateAccess = () => {
    if (!quizzes.length) return false;
    if (quizzes.length !== userAnswers.filter((answer) => answer).length)
      return false;
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getQuizzesFromIds(postIds);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, [getQuizzesFromIds, postIds]);

  if (loading) return null;
  if (!isAppropriateAccess()) {
    return <Redirect to='/error' />;
  }
  return (
    <>
      <Header />
      {isAuth ? (
        <UserInfoCard
          id={user._id}
          width='100%'
        />
      ) : null}
      <S.QuizResultPage>
        {quizzes.map((quiz, index) => (
          <QuizResult
            key={quiz._id}
            correct={quiz.answer === userAnswers[index]}
            quiz={quiz}
          />
        ))}
        <S.FooterButtonWrapper>
          <S.LinkButton to='/'>다른 문제 풀러가기</S.LinkButton>
          <S.LinkButton to='/ranking'>랭킹 보기</S.LinkButton>
          <S.LinkButton to='/create'>퀴즈 만들러 가기</S.LinkButton>
        </S.FooterButtonWrapper>
      </S.QuizResultPage>
    </>
  );
};

export default QuizResultPage;
