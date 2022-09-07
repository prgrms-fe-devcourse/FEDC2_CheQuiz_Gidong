import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import { createQuiz, createQuizSet } from '@/api/create';
import {
  QUIZ_ITEM_DEFAULT_STATE,
  QUIZ_SET_DEFAULT_STATE,
} from '@/assets/QuizCreateMockData';
import { useAuthContext } from '@/contexts/AuthContext';
import useValidation from '@/hooks/useValidation';
import { ChannelAPICustomTitle } from '@/interfaces/ChannelAPI';
import { QuizClientContent } from '@/interfaces/Quiz';
import { validationQuizCreate } from '@/utils/validation';

import QuizList from './QuizList';
import QuizSetForm from './QuizSetForm';
import * as S from './styles';

const QuizForm = () => {
  const [quizList, setQuizList] = useState<QuizClientContent[]>([
    QUIZ_ITEM_DEFAULT_STATE,
  ]);
  const [isSet, toggleSet] = useState<boolean>(false);
  const [quizSet, setQuizSet] = useState<ChannelAPICustomTitle>(
    QUIZ_SET_DEFAULT_STATE,
  );
  const { user, token } = useAuthContext();
  const { errors, handleFormSubmit, reValidate } = useValidation(
    validationQuizCreate(),
    quizList,
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
        toggleSet={toggleSet}
        quizSet={quizSet}
        setQuizSet={setQuizSet}
      />
      <QuizList quizList={quizList} setQuizList={setQuizList} errors={errors} />
      <S.SubmitButton type="submit">퀴즈 제출</S.SubmitButton>
    </S.FormContainer>
  );
};

export default QuizForm;
