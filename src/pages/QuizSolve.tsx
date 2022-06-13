import React, { useCallback, useEffect, useState } from 'react';
import QuizBox from '@components/Quiz';
import QuizMockData from '@/assets/QuizMockData';
import QuizServices from '@/utils/QuizServices';

function QuizSolve(): JSX.Element {
  // TODO: 추후 api 연결 필요 및 sessionStorage에 저장 필요
  const [quizzes, setQuizzes] = useState(QuizMockData);
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(quizzes.length).fill(''),
  );
  const [storedPostIds, setStoredPostIds] = useState<string[]>([]);

  // ANCHOR: 캐러셀에서 현재 노출될 퀴스 인덱스를 결정함
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index <= quizzes.length) setCurrentIndex(() => index);
    },
    [quizzes.length],
  );

  const handleUserAnswers = useCallback(
    (index: number, value: string) => {
      setUserAnswers((prev) =>
        prev.map((answer, idx) => (idx === index ? value : answer)),
      );
    },
    [setUserAnswers],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // user 답 sessionStorage에 저장
      // postId 저장하기
      sessionStorage.setItem('user-answers', JSON.stringify(userAnswers));
      sessionStorage.setItem('post-ids', JSON.stringify(storedPostIds));

      // TODO: history.push로 route 이동하기
    },
    [storedPostIds, userAnswers],
  );

  useEffect(() => {
    // NOTE: 초기화
    setStoredPostIds([]);

    // if user request random quizzes
    const fetchRandomQuizzes = async () => {
      const ids = await QuizServices.getShuffledPostIds(6);
      setStoredPostIds(ids);
      return QuizServices.getShuffledQuizzes(ids).then((response) =>
        console.log(response),
      );
    };
    fetchRandomQuizzes();
  }, [quizzes.length, setStoredPostIds, setUserAnswers]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {currentIndex + 1}/{quizzes.length}
      </div>
      {quizzes.map((quiz, index) => (
        <QuizBox
          quiz={quiz}
          key={quiz._id}
          index={index}
          onChangeUserAnswer={handleUserAnswers}
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
    </form>
  );
}

export default QuizSolve;
