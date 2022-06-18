import React, { useState } from 'react';
import * as S from './styles';
import { createQuiz, createQuizSet } from '@/api/create';
import { QuizClientContent } from '@/interfaces/Quiz';
import {
  QUIZ_ITEM_DEFAULT_STATE,
  QUIZ_SET_DEFAULT_STATE,
} from '@/assets/QuizCreateMockData';
import QuizList from './QuizList';
import QuizSetForm from './QuizSetForm';
import { ChannelAPICustomTitle } from '@/interfaces/ChannelAPI';

function QuizForm() {
  const [quizList, setQuizList] = useState<QuizClientContent[]>([
    QUIZ_ITEM_DEFAULT_STATE,
  ]);
  const [isSet, toggleSet] = useState<boolean>(false);
  const [quizSet, setQuizSet] = useState<ChannelAPICustomTitle>(
    QUIZ_SET_DEFAULT_STATE,
  );

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('퀴즈제출');
    if (isSet) {
      const set = await createQuizSet(quizSet);
      if (!set) return;
      quizList.forEach((quiz) => {
        const { _id, ...quizData } = quiz;
        createQuiz(quizData, set._id);
      });
    } else {
      quizList.forEach((quiz) => {
        const { _id, ...quizData } = quiz;
        createQuiz(quizData);
      });
    }
  };

  return (
    <S.FormContainer onSubmit={handleQuizSubmit}>
      <QuizSetForm
        isSet={isSet}
        toggleSet={toggleSet}
        quizSet={quizSet}
        setQuizSet={setQuizSet}
      />
      <QuizList quizList={quizList} setQuizList={setQuizList} />
      <S.SubmitButton type="submit">퀴즈 제출</S.SubmitButton>
    </S.FormContainer>
  );
}

export default QuizForm;
