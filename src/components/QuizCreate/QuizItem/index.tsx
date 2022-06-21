import React from 'react';
import * as S from './styles';
import { QuizClientContent } from '@/interfaces/Quiz';
import { QUIZ_ANSWER_TYPE_LIST, QUIZ_CATEGORY_LIST } from '@/constants';

import Icon from '@/components/Icon';
import Rate from '@/components/QuizCreate/Rate';
import Select from '@/components/Form/Select';

interface QuizItemProps {
  quizData: QuizClientContent;
  order: number;
  errors: any;
  handleQuizDelete: (id: number) => (e: React.MouseEvent) => void;
  onChangeQuiz: (id: number, key: string, value: unknown) => void;
}

export default function QuizItem({
  quizData,
  order,
  errors,
  onChangeQuiz,
  handleQuizDelete,
}: QuizItemProps) {
  const handleInputChange = (key: string, value: unknown) => {
    // TODO: debounce 걸어주어 리렌더링 최적화
    onChangeQuiz(quizData._id, key, value);
  };

  return (
    <S.QuizContainer>
      <Icon
        name="x-circle"
        addStyle={{ alignSelf: 'flex-end', cursor: 'pointer' }}
        onClick={handleQuizDelete(quizData._id)}
      />
      <S.QuestionSection>
        <S.SelectWrapper>
          <Select
            defaultValue="카테고리"
            value={quizData.category}
            options={QUIZ_CATEGORY_LIST}
            onChangeValue={(value: string) =>
              handleInputChange('category', value)
            }
          />
          <Select
            value={quizData.answerType}
            options={QUIZ_ANSWER_TYPE_LIST}
            onChangeValue={(value: string) =>
              handleInputChange('answerType', value)
            }
          />
          {errors[`[${order - 1}].category`]}
          {errors[`[${order - 1}].answerType`]}
        </S.SelectWrapper>
        <S.QuestionWrapper>
          {`Q${order}`}
          <S.TextArea
            value={quizData.question}
            onChange={({ target }) =>
              handleInputChange('question', target.value)
            }
          />
          {errors[`[${order - 1}].question`]}
        </S.QuestionWrapper>
      </S.QuestionSection>

      <S.AnswerSection>
        <S.LeftSide>
          <S.TrueFalseWrapper>
            <S.Label block>
              정답
              {errors[`[${order - 1}].answer`]}
            </S.Label>
            {[
              { label: 'O', value: 'true' },
              { label: 'X', value: 'false' },
            ].map(({ label, value }) => (
              <React.Fragment key={value}>
                <S.TrueFalseController
                  type="radio"
                  id={`${quizData._id}${label}`}
                  name={`answer_${quizData._id}`}
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
          </S.TrueFalseWrapper>
          <S.Importance>
            <S.Label block>
              중요도
              {errors[`[${order - 1}].importance`]}
            </S.Label>
            <Rate
              count={5}
              defaultVal={quizData.importance}
              onChangeStar={(value) => handleInputChange('importance', value)}
            />
          </S.Importance>
          <S.Difficulty>
            <S.Label block>
              난이도
              {errors[`[${order - 1}].difficulty`]}
            </S.Label>
            <Rate
              count={5}
              defaultVal={quizData.difficulty}
              onChangeStar={(value) => handleInputChange('difficulty', value)}
            />
          </S.Difficulty>
        </S.LeftSide>
        <S.AnswerDescription>
          <S.Label block>해설</S.Label>
          {errors[`[${order - 1}].answerDescription`]}
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
}
