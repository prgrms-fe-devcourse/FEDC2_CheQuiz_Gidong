/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
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

import type { ChannelAPICustomTitle } from '@/interfaces/ChannelAPI';
import type { QuizClientContent } from '@/interfaces/Quiz';

const QuizForm = () => {
  const [quizList, setQuizList] = useState<QuizClientContent[]>([
    QUIZ_ITEM_DEFAULT_STATE,
  ]);
  const [isSet, toggleSet] = useState<boolean>(false);
  const [quizSet, setQuizSet] = useState<ChannelAPICustomTitle>(
    QUIZ_SET_DEFAULT_STATE
  );
  const { user, token } = useAuthContext();
  const { errors, handleFormSubmit, reValidate } = useValidation(
    validationQuizCreate(),
    quizList
  );
  const history = useHistory();

  useEffect(() => {
    reValidate();
  }, [quizList]);

  const handleQuizSubmit = async () => {
    if (isSet) {
      const set = await createQuizSet(quizSet, user);
      if (!set) return;
      quizList.forEach((quiz) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { _id, ...quizData } = quiz;
        createQuiz(quizData, token, set._id);
      });
    } else {
      quizList.forEach((quiz) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { _id, ...quizData } = quiz;
        createQuiz(quizData, token);
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
