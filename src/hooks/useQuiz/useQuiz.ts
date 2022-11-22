import { useState, useCallback } from 'react';

import { getShuffledQuizzes, getQuizzesFromChannel } from '@/api/QuizServices';

import type { Quiz as QuizInterface } from '@/interfaces/Quiz';

const useQuiz = () => {
  const [quizzes, setQuizzes] = useState<QuizInterface[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const handleUserAnswers = useCallback((index: number, value: string) => {
    setUserAnswers((prev) =>
      prev.map((answer, idx) => (idx === index ? value : answer))
    );
  }, []);

  const getQuizRandom = useCallback(async (count: number) => {
    try {
      const randomQuizzes = await getShuffledQuizzes(count);

      setQuizzes(randomQuizzes);
      setUserAnswers(Array(randomQuizzes.length).fill(''));
    } catch (error) {
      console.error('error occurred at getRandomQuizzes.');
      console.error(error);
    }
  }, []);

  const getQuizSet = useCallback(async (channel: string) => {
    try {
      const quizSet = await getQuizzesFromChannel(channel);

      setQuizzes(quizSet);
      setUserAnswers(Array(quizSet.length).fill(''));
    } catch (error) {
      console.error('error occurred at getSetQuizzes.');
      console.error(error);
    }
  }, []);

  return {
    quizzes,
    userAnswers,
    handleUserAnswers,
    getQuizRandom,
    getQuizSet,
  };
};

export default useQuiz;
