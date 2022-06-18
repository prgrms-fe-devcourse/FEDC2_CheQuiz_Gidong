import React from 'react';
import * as S from './styles';
import { QuizClientContent } from '@/interfaces/Quiz';
import {
  DIFFICULTY_COUNT,
  IMPORTANCE_COUNT,
  QUIZ_ANSWER_TYPE_LIST,
  QUIZ_CATEGORY_LIST,
} from '@/constants';
import Icon from '@/components/Icon';

interface QuizItemProps {
  quizData: QuizClientContent;
  handleQuizDelete: (id: number) => (e: React.MouseEvent) => void;
  onChangeQuiz: (id: number, key: string, value: string) => void;
}

export default function QuizItem({
  quizData,
  onChangeQuiz,
  handleQuizDelete,
}: QuizItemProps) {
  const handleInputChange =
    (key: string) => (e: React.ChangeEvent | React.FormEvent) => {
      // TODO: debounce 걸어주어 리렌더링 최적화
      onChangeQuiz(quizData._id, key, (e.target as HTMLInputElement).value);
    };

  const iconProps = {
    name: 'x-circle',
    size: 20,
    strokeWidth: 2,
    color: '#222',
    rotate: 0,
    addStyle: { alignSelf: 'flex-end' },
  };

  return (
    <S.QuizContainer>
      <Icon {...iconProps} onClick={handleQuizDelete(quizData._id)} />
      <S.QuestionSection>
        <S.SelectWrapper>
          <S.SelectBox
            value={quizData.category}
            onChange={handleInputChange('category')}
          >
            <option value="" hidden>
              카테고리
            </option>
            {QUIZ_CATEGORY_LIST.map((opt) =>
              typeof opt === 'string' ? { label: opt, value: opt } : opt,
            ).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </S.SelectBox>
          <S.SelectBox
            value={quizData.answerType}
            onChange={handleInputChange('answerType')}
          >
            {QUIZ_ANSWER_TYPE_LIST.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={!opt.canUse}>
                {opt.label}
              </option>
            ))}
          </S.SelectBox>
        </S.SelectWrapper>
        <S.QuestionWrapper>
          Q.
          <S.TextArea
            value={quizData.question}
            onChange={handleInputChange('question')}
          />
        </S.QuestionWrapper>
      </S.QuestionSection>

      <S.AnswerSection>
        <S.LeftSide>
          <S.TrueFalseWrapper>
            <S.Label block>정답</S.Label>
            {[
              { label: 'O', value: 'true' },
              { label: 'X', value: 'false' },
            ].map(({ label, value }) => (
              <React.Fragment key={value}>
                <S.TrueFalseController
                  type="radio"
                  id={label}
                  name={`answer_${quizData._id}`}
                  value={value}
                  onChange={handleInputChange('answer')}
                />
                <S.TrueFalseBox htmlFor={label}> {label} </S.TrueFalseBox>
              </React.Fragment>
            ))}
          </S.TrueFalseWrapper>
          <S.Importance>
            <S.Label block>중요도</S.Label>
            {Array.from({ length: IMPORTANCE_COUNT }, (_, i) => i + 1).map(
              (id) => (
                <div style={{ display: 'inline-block' }} key={id}>
                  <input
                    type="radio"
                    id={String(id)}
                    name={`importance_${quizData._id}`}
                    value={id}
                    onChange={handleInputChange('importance')}
                  />
                  <label htmlFor={String(id)}> {`lv${id}`} </label>
                </div>
              ),
            )}
          </S.Importance>
          <S.Difficulty>
            <S.Label block>난이도</S.Label>
            {Array.from({ length: DIFFICULTY_COUNT }, (_, i) => i + 1).map(
              (id) => (
                <div style={{ display: 'inline-block' }} key={id}>
                  <input
                    type="radio"
                    id={String(id)}
                    name={`difficulty_${quizData._id}`}
                    value={id}
                    onChange={handleInputChange('difficulty')}
                  />
                  <label htmlFor={String(id)}> {`lv${id}`} </label>
                </div>
              ),
            )}
          </S.Difficulty>
        </S.LeftSide>
        <S.AnswerDescription>
          <S.Label block>해설</S.Label>
          <S.TextArea
            value={quizData.answerDescription}
            onChange={handleInputChange('answerDescription')}
          />
        </S.AnswerDescription>
      </S.AnswerSection>
    </S.QuizContainer>
  );
}
