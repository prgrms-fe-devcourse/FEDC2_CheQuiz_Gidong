/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type React from 'react';
import { useState, useEffect } from 'react';

import { useHistory } from 'react-router';

import { createQuiz, createQuizSet } from '@/api/create';
import {
  QUIZ_ITEM_DEFAULT_STATE,
  QUIZ_SET_DEFAULT_STATE,
} from '@/assets/QuizCreateMockData';
import { useAuthContext } from '@/contexts/AuthContext';
import useValidation from '@/hooks/useValidation';
import { validationQuizCreate } from '@/utils/validation';

import * as S from './QuizCreateForm.styles';
import QuizList from './QuizList';
import QuizSetForm from './QuizSetForm';

import type { QuizItemType, QuizSetType } from '@/interfaces/model';

const QuizForm = () => {
  const [quizList, setQuizList] = useState<QuizItemType[]>([
    QUIZ_ITEM_DEFAULT_STATE,
  ]);
  const [isSet, toggleSet] = useState(false);
  const [quizSet, setQuizSet] = useState<QuizSetType>(QUIZ_SET_DEFAULT_STATE);
  const { user, token } = useAuthContext();
  const { errors, handleFormSubmit, reValidate } = useValidation(
    validationQuizCreate(),
    quizList
  );
  const history = useHistory();

  useEffect(() => {
    reValidate();
  }, [quizList, reValidate]);

  const handleQuizSubmit = async () => {
    if (isSet) {
      const set = await createQuizSet(quizSet, user);

      quizList.forEach(async (quiz) => {
        const { _id, ...quizData } = quiz;
        await createQuiz(quizData, token, set?._id);
      });
    } else {
      quizList.forEach(async (quiz) => {
        const { _id, ...quizData } = quiz;
        await createQuiz(quizData, token);
      });
    }
    history.push('/');
  };

  return (
    <S.FormContainer
      onSubmit={(e: React.FormEvent) => handleFormSubmit(e, handleQuizSubmit)}
    >
      <QuizSetForm
        isSet={isSet}
        quizSet={quizSet}
        setQuizSet={setQuizSet}
        toggleSet={toggleSet}
      />
      <QuizList
        errors={errors}
        quizList={quizList}
        setQuizList={setQuizList}
      />
      <S.SubmitButton type='submit'>퀴즈 제출</S.SubmitButton>
    </S.FormContainer>
  );
};

export default QuizForm;
