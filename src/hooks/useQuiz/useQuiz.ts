import { useCallback, useState } from 'react';

import QuizServices from './useQuiz.helper';

import type { QuizType } from './useQuiz.helper';
import type { Quiz as QuizInterface } from '@/interfaces/Quiz';

type ReturnType = [
  QuizType[],
  (count: number) => Promise<void>,
  (channelId: string) => Promise<void>
];

// ANCHOR: QuizResultPage 컨텐츠는 퀴즈보다는 Post의 성격이 강해서, 다른 hook에 넣을 예정
const useQuiz = (): ReturnType => {
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);

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
