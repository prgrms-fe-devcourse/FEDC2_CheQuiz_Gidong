import React, { useState } from 'react';
import { useSessionStorage } from '@hooks/useStorage';
import QuizResult from '@components/QuizResult';
import { USER_ANSWERS, POST_IDS } from '@/common/string';
import QuizMockData from '@/assets/QuizMockData';
/**
 * ANCHOR: QuizResultPage 로직
 * 1. sessionStorage에서 post-ids, user-answers를 불러온다.
 * 2. post-ids와 user-answers 개수를 확인하여 일치하지 않았다면 404페이지로 이동한다.
 * 3. 댓글을 달 수 있는 input과, 좋아요를 누를 수 있는 like가 각 컴포넌트에 위치하여야 한다.
 * 4. random인지, random인지 아닌지 저장해야 한다.
 */
function QuizResultPage() {
  const [mockData] = useState(QuizMockData);
  const [solvedPostIds] = useSessionStorage<string[]>(POST_IDS, []);
  const [userAnswers] = useSessionStorage<string[]>(
    USER_ANSWERS,
    Array(solvedPostIds.length).fill(''),
  );
  // TODO: implement validation logics
  // if userAnswers.length !== userAnswers.filter(answer => answer).length -> 404page
  return (
    <div>
      {mockData.map((mock, index) => (
        <React.Fragment key={mock._id}>
          <QuizResult
            quiz={mock}
            correct={mock.answer === userAnswers[index]}
          />
        </React.Fragment>
      ))}
      <div>
        <button type="button">다른 문제 풀러가기</button>
        <button type="button">랭킹 보기</button>
        <button type="button">퀴즈 만들러 가기</button>
      </div>
    </div>
  );
}

export default QuizResultPage;
