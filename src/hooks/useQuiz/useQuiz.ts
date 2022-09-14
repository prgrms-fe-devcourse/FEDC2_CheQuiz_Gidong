import { useCallback, useState } from 'react';

import * as QuizServices from '@/api/QuizServices';

import type { Quiz as QuizInterface } from '@/interfaces/Quiz';

// ANCHOR: QuizResultPage 컨텐츠는 퀴즈보다는 Post의 성격이 강해서, 다른 hook에 넣을 예정
const useQuiz = () => {
  const [quizzes, setQuizzes] = useState<QuizInterface[]>([]);

  const getRandomQuizzes = useCallback(async (count: number) => {
    try {
      const data = await QuizServices.getShuffledQuizzes(count);
      setQuizzes(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getQuizzesFromQuizset = useCallback(async (channelId: string) => {
    try {
      const data = await QuizServices.getQuizzesFromChannel(channelId);
      setQuizzes(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getQuizzesFromIds = useCallback(async (postIds: string[]) => {
    try {
      const data = await QuizServices.getQuizzesFromPostIds(postIds);
      setQuizzes(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return {
    quizzes,
    getRandomQuizzes,
    getQuizzesFromQuizset,
    getQuizzesFromIds,
  };
};

export default useQuiz;
