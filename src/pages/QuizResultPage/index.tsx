import React, { useEffect, useMemo, useState } from 'react';
import QuizResult from '@components/QuizResult';
import { Quiz as QuizInterface } from '@/interfaces/Quiz';
import * as QuizServices from '@/api/QuizServices';
import * as S from './styles';
import { useSessionStorage } from '@/hooks/useStorage';
import { POST_IDS } from '@/constants';

/**
 * ANCHOR: QuizResultPage 로직
 * 1. sessionStorage에서 post-ids, user-answers를 불러온다.
 * 2. post-ids와 user-answers 개수를 확인하여 일치하지 않았다면 404페이지로 이동한다.
 * 3. 댓글을 달 수 있는 input과, 좋아요를 누를 수 있는 like가 각 컴포넌트에 위치하여야 한다.
 * 4. random인지, random인지 아닌지 저장해야 한다.
 */
function QuizResultPage() {
  const [quizzes, setQuizzes] = useState<QuizInterface[]>([]);
  const [postIds] = useSessionStorage<string[]>(POST_IDS, []);
  const userAnswers = useMemo(() => ['true', 'false', 'true', 'false'], []);
  // TODO: implement validation logics
  // if userAnswers.length !== userAnswers.filter(answer => answer).length -> 404page

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const qs = await QuizServices.getQuizzesFromPostIds(postIds);
        setQuizzes(qs);
      } catch (error) {
        throw new Error('error occured at fetchPosts');
      }
    };
    fetchPosts();
  }, [postIds]);

  return (
    <S.QuizResultPage>
      {quizzes.map((mock, index) => (
        <React.Fragment key={mock._id}>
          <QuizResult
            quiz={mock}
            correct={mock.answer === userAnswers[index]}
          />
        </React.Fragment>
      ))}
      <div>
        {/** TODO: 링크 수정 필요 */}
        <S.LinkButton to="/" color="point" fill="true">
          다른 문제 풀러가기
        </S.LinkButton>
        <S.LinkButton to="/" color="point" fill="true">
          랭킹 보기
        </S.LinkButton>
        <S.LinkButton to="/" color="point" fill="true">
          퀴즈 만들러 가기
        </S.LinkButton>
      </div>
    </S.QuizResultPage>
  );
}

export default QuizResultPage;
