import { useCallback, useState } from 'react';

import QuizServices from './useQuiz.helper';

import type { Quiz } from './useQuiz.helper';

type ReturnType = [
  Quiz[],
  (count: number) => Promise<void>,
  (channelId: string) => Promise<void>
];

const useQuiz = (): ReturnType => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const getRandomQuizzes = useCallback(async (count: number) => {
    try {
      const data = await QuizServices.getShuffledQuizzes(count);
      setQuizzes(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getQuizzesFromQuizSet = useCallback(async (channelId: string) => {
    try {
      const data = await QuizServices.getQuizzesFromQuizSet(channelId);
      setQuizzes(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [quizzes, getRandomQuizzes, getQuizzesFromQuizSet];
};

export default useQuiz;
