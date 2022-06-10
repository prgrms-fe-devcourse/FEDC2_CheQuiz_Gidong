import React, { useCallback, useRef, useState } from 'react';
import QuizBox from '@components/Quiz';
import QuizMockData from '@/assets/QuizMockData';

function QuizSolve(): JSX.Element {
  // TODO: 추후 api 연결 필요
  const [quizzes, setQuizzes] = useState(QuizMockData);
  const totalScore = useRef(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(quizzes.length).fill(''),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  /**
   * ANCHOR: 캐러셀에서 현재 노출될 퀴스 인덱스를 결정함
   */
  const handleIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index <= quizzes.length) setCurrentIndex(() => index);
    },
    [quizzes.length],
  );

  const handleUserAnswer = useCallback(
    (index: number, value: string) => {
      setUserAnswers((prev) => [
        ...prev.slice(0, index),
        value,
        ...prev.slice(index + 1, quizzes.length),
      ]);
    },
    [quizzes.length],
  );

  return (
    <div>
      <div>
        {currentIndex + 1}/{quizzes.length}
      </div>
      <div>{userAnswers}</div>
      {quizzes.map((quiz, index) => (
        <QuizBox
          quiz={quiz}
          key={quiz._id}
          index={index}
          onChangeUserAnswer={handleUserAnswer}
        />
      ))}
      <button
        type="button"
        disabled={currentIndex <= 0}
        onClick={() => handleIndex(currentIndex - 1)}
      >
        이전 문제
      </button>
      <button
        type="button"
        disabled={currentIndex >= quizzes.length - 1}
        onClick={() => handleIndex(currentIndex + 1)}
      >
        다음 문제
      </button>
      {currentIndex === quizzes.length - 1 && (
        <button
          type="submit"
          disabled={
            userAnswers.filter((answer) => answer).length < quizzes.length
          }
        >
          제출
        </button>
      )}
    </div>
  );
}

export default QuizSolve;
