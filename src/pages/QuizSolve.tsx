import React, { useState } from 'react';
import QuizMockData from '@/assets/QuizMockData';

function QuizSolve(): JSX.Element {
  // TODO: 추후 api 연결 필요
  const [state, setState] = useState(QuizMockData);

  return (
    <div>
      <ul>
        {state.map((quiz) => (
          <li key={quiz._id}>
            <ul>
              <li>유저 정보: {quiz.author.fullName}</li>
              <li>질문: {quiz.question}</li>
              <li>설명: {quiz.des}</li>
              <li>태그: {quiz.tag}</li>
              <li>난이도: {quiz.difficulty}</li>
              <li>중요도: {quiz.importance}</li>
              <li>퀴즈 타입: {quiz.answerType}</li>
              <li>정답: {quiz.answer}</li>
              <li>좋아요 수: {quiz.likes.length}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizSolve;
