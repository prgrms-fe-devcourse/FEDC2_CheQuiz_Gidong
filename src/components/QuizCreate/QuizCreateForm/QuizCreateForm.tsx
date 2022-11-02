import type React from 'react';
import { useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { useHistory } from 'react-router';

import { createQuiz, createQuizSet } from '@/api/create';
import {
  QUIZ_ITEM_DEFAULT_STATE,
  QUIZ_SET_DEFAULT_STATE,
} from '@/assets/QuizCreateMockData';
import QuizList from '@/components/QuizCreate/QuizList';
import QuizSetForm from '@/components/QuizCreate/QuizSetForm';
import { useAuthContext } from '@/contexts/AuthContext';
import useValidation from '@/hooks/useValidation';
import { DarkGray, pointColor } from '@/styles/theme';
import { validationQuizCreate } from '@/utils/validation';

import type { QuizItem, QuizSet } from '@/interfaces/model';

const QuizForm = () => {
  const [quizList, setQuizList] = useState<QuizItem[]>([
    QUIZ_ITEM_DEFAULT_STATE,
  ]);
  const [isSet, toggleSet] = useState(false);
  const [quizSet, setQuizSet] = useState<QuizSet>(QUIZ_SET_DEFAULT_STATE);
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
    <FormContainer
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
      <SubmitButton type='submit'>퀴즈 제출</SubmitButton>
    </FormContainer>
  );
};

export default QuizForm;

const FormContainer = styled.form`
  width: 100%;
  margin-top: 7rem;
`;

const SubmitButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;

  width: 7.5rem;
  height: 3rem;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: ${pointColor};
  text-align: center;
  font-family: 'MaplestoryOTFBold', sans-serif !important;
  cursor: pointer;
`;
