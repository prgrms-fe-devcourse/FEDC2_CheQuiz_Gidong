/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';

import Select from '@/components/Form/Select';
import Icon from '@/components/Icon';
import Rate from '@/components/QuizCreateForm/Rate';
import { QUIZ_ANSWER_TYPE_LIST, QUIZ_CATEGORY_LIST } from '@/constants';

import * as S from './styles';

import type { QuizClientContent } from '@/interfaces/Quiz';

interface QuizItemProps {
  quizData: QuizClientContent;
  order: number;
  errors: any;
  handleQuizDelete: (id: number) => (e: React.MouseEvent) => void;
  onChangeQuiz: (id: number, key: string, value: unknown) => void;
}

const QuizItem = ({
  quizData,
  order,
  errors,
  onChangeQuiz,
  handleQuizDelete,
}: QuizItemProps) => {
  const handleInputChange = (key: string, value: unknown) => {
    onChangeQuiz(quizData._id, key, value);
  };

  return (
    <S.QuizContainer>
      <Icon
        addStyle={{ alignSelf: 'flex-end', cursor: 'pointer' }}
        name='x-circle'
        onClick={handleQuizDelete(quizData._id)}
      />
      <S.QuestionSection>
        <S.SelectWrapper>
          <Select
            defaultValue='카테고리'
            options={QUIZ_CATEGORY_LIST}
            value={quizData.category}
            onChangeValue={(value: string) =>
              handleInputChange('category', value)
            }
          />
          <Select
            options={QUIZ_ANSWER_TYPE_LIST}
            value={quizData.answerType}
            onChangeValue={(value: string) =>
              handleInputChange('answerType', value)
            }
          />
          <S.ValidationLabel>
            {errors[`[${order - 1}].category`]}
            {errors[`[${order - 1}].answerType`]}
          </S.ValidationLabel>
        </S.SelectWrapper>
        <S.QuestionWrapper>
          <S.Wrapper>
            {`Q${order}`}
            <S.TextArea
              value={quizData.question}
              onChange={({ target }) =>
                handleInputChange('question', target.value)
              }
            />
          </S.Wrapper>
          <S.ValidationLabel
            block
            justify='start'
            marginL='2.5rem'
          >
            {errors[`[${order - 1}].question`]}
          </S.ValidationLabel>
        </S.QuestionWrapper>
      </S.QuestionSection>

      <S.AnswerSection>
        <S.LeftSide>
          <S.TrueFalseWrapper>
            <S.Label> 정답 </S.Label>
            <S.ValidationLabel marginL='1.5rem'>
              {errors[`[${order - 1}].answer`]}
            </S.ValidationLabel>
            <S.TFWrapper>
              {[
                { label: 'O', value: 'true' },
                { label: 'X', value: 'false' },
              ].map(({ label, value }) => (
                <React.Fragment key={value}>
                  <S.TrueFalseController
                    id={`${quizData._id}${label}`}
                    name={`answer_${quizData._id}`}
                    type='radio'
                    value={value}
                    onChange={({ target }) =>
                      handleInputChange('answer', target.value)
                    }
                  />
                  <S.TrueFalseBox htmlFor={`${quizData._id}${label}`}>
                    {label}
                  </S.TrueFalseBox>
                </React.Fragment>
              ))}
            </S.TFWrapper>
          </S.TrueFalseWrapper>
          <S.Importance>
            <S.Label>중요도</S.Label>
            <S.ValidationLabel marginL='1rem'>
              {errors[`[${order - 1}].importance`] && '중요도를 선택해주세요'}
            </S.ValidationLabel>
            <Rate
              count={5}
              defaultVal={quizData.importance}
              onChangeStar={(value) => handleInputChange('importance', value)}
            />
          </S.Importance>
          <S.Difficulty>
            <S.Label>난이도</S.Label>
            <S.ValidationLabel marginL='1rem'>
              {errors[`[${order - 1}].difficulty`] && '난이도를 선택해주세요'}
            </S.ValidationLabel>
            <Rate
              count={5}
              defaultVal={quizData.difficulty}
              onChangeStar={(value) => handleInputChange('difficulty', value)}
            />
          </S.Difficulty>
        </S.LeftSide>
        <S.AnswerDescription>
          <S.Label block>해설</S.Label>
          <S.ValidationLabel>
            {errors[`[${order - 1}].answerDescription`]}
          </S.ValidationLabel>
          <S.TextArea
            value={quizData.answerDescription}
            onChange={({ target }) =>
              handleInputChange('answerDescription', target.value)
            }
          />
        </S.AnswerDescription>
      </S.AnswerSection>
    </S.QuizContainer>
  );
};

export default QuizItem;
