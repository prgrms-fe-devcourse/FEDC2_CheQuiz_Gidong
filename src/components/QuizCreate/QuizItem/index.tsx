/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';

import styled from '@emotion/styled';

import arrowIcon from '@/assets/downArrow.png';
import Select from '@/components/Form/Select';
import Icon from '@/components/Icon';
import { QUIZ_ANSWER_TYPE_LIST, QUIZ_CATEGORY_LIST } from '@/constants';
import {
  blackGray,
  correct,
  DarkGray,
  h3,
  incorrect,
  lightGrayWhite,
  small,
  white,
} from '@/styles/theme';

import Rate from '../Rate';

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
    <QuizContainer>
      <Icon
        addStyle={{ alignSelf: 'flex-end', cursor: 'pointer' }}
        name='x-circle'
        onClick={handleQuizDelete(quizData._id)}
      />
      <QuestionSection>
        <SelectWrapper>
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
          <ValidationLabel>
            {errors[`[${order - 1}].category`]}
            {errors[`[${order - 1}].answerType`]}
          </ValidationLabel>
        </SelectWrapper>
        <QuestionWrapper>
          <Wrapper>
            {`Q${order}`}
            <TextArea
              value={quizData.question}
              onChange={({ target }) =>
                handleInputChange('question', target.value)
              }
            />
          </Wrapper>
          <ValidationLabel
            block
            justify='start'
            marginL='2.5rem'
          >
            {errors[`[${order - 1}].question`]}
          </ValidationLabel>
        </QuestionWrapper>
      </QuestionSection>

      <AnswerSection>
        <LeftSide>
          <TrueFalseWrapper>
            <Label> 정답 </Label>
            <ValidationLabel marginL='1.5rem'>
              {errors[`[${order - 1}].answer`]}
            </ValidationLabel>
            <TFWrapper>
              {[
                { label: 'O', value: 'true' },
                { label: 'X', value: 'false' },
              ].map(({ label, value }) => (
                <React.Fragment key={value}>
                  <TrueFalseController
                    id={`${quizData._id}${label}`}
                    name={`answer_${quizData._id}`}
                    type='radio'
                    value={value}
                    onChange={({ target }) =>
                      handleInputChange('answer', target.value)
                    }
                  />
                  <TrueFalseBox htmlFor={`${quizData._id}${label}`}>
                    {label}
                  </TrueFalseBox>
                </React.Fragment>
              ))}
            </TFWrapper>
          </TrueFalseWrapper>
          <Importance>
            <Label>중요도</Label>
            <ValidationLabel marginL='1rem'>
              {errors[`[${order - 1}].importance`] && '중요도를 선택해주세요'}
            </ValidationLabel>
            <Rate
              count={5}
              defaultVal={quizData.importance}
              onChangeStar={(value) => handleInputChange('importance', value)}
            />
          </Importance>
          <Difficulty>
            <Label>난이도</Label>
            <ValidationLabel marginL='1rem'>
              {errors[`[${order - 1}].difficulty`] && '난이도를 선택해주세요'}
            </ValidationLabel>
            <Rate
              count={5}
              defaultVal={quizData.difficulty}
              onChangeStar={(value) => handleInputChange('difficulty', value)}
            />
          </Difficulty>
        </LeftSide>
        <AnswerDescription>
          <Label block>해설</Label>
          <ValidationLabel>
            {errors[`[${order - 1}].answerDescription`]}
          </ValidationLabel>
          <TextArea
            value={quizData.answerDescription}
            onChange={({ target }) =>
              handleInputChange('answerDescription', target.value)
            }
          />
        </AnswerDescription>
      </AnswerSection>
    </QuizContainer>
  );
};

export default QuizItem;

//* Question
export const QuizContainer = styled.div`
  padding: 0.5rem 1.5rem 2rem;
  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: ${white};
  color: ${blackGray};

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const QuestionSection = styled.section`
  display: flex;
  gap: 0 1rem;
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
export const SelectBox = styled.select`
  width: 10rem;
  height: 2.5rem;
  padding: 0.25rem 2rem;
  font-family: 'MaplestoryOTFLight';
  ${small};
  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  box-sizing: border-box;

  appearance: none;
  background: url(${arrowIcon}) 95.5% center/10% no-repeat white;
  cursor: pointer;
`;

export const QuestionWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 0.5rem;
  font-family: 'MaplestoryOTFBold', sans-serif !important;
  font-size: 1.5rem;
`;

//* Answer
export const AnswerSection = styled.section`
  padding: 2rem;
  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: ${lightGrayWhite};
  color: ${blackGray};

  display: flex;
  gap: 2rem;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TrueFalseWrapper = styled.div``;
export const TrueFalseBox = styled.label`
  width: 7.5rem;
  height: 3rem;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: white;
  text-align: center;
  line-height: 3rem;
  ${h3};
  cursor: pointer;
`;
export const TrueFalseController = styled.input`
  display: none;

  &:checked + ${TrueFalseBox} {
    background-color: ${({ value }) =>
      value === 'true' ? correct : incorrect};
  }
`;

export const Importance = styled.div``;
export const Difficulty = styled.div``;

export const AnswerDescription = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  & > textarea {
    flex-grow: 1;
  }
`;

//* Common
export const TextArea = styled.textarea`
  width: 100%;
  height: 7rem;
  padding: 1rem;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  font-family: 'Pretendard';
  resize: none;
`;
export const Label = styled.div`
  display: ${({ block }: { block?: boolean }) =>
    block ? 'block' : 'inline-block'};
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
`;
type ValidationLabelProps = {
  block?: boolean;
  justify?: string;
  marginL?: string;
};
export const ValidationLabel = styled.div`
  display: ${(props: ValidationLabelProps) =>
    props.block ? 'flex' : ' inline-flex'};
  color: red;
  ${small};

  justify-content: ${(props: ValidationLabelProps) => props.justify};
  align-items: center;
  margin-left: ${(props: ValidationLabelProps) => props.marginL};
`;
export const TFWrapper = styled.div`
  flex-basis: 100%;

  display: flex;
  gap: 1rem;
`;
