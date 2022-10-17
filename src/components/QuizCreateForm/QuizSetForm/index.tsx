import React from 'react';

import { QUIZ_SET_TAG_LIST } from '@/constants';

import * as S from './styles';

import type { QuizSetType } from '@/components/QuizCreateForm/QuizCreateForm';

interface SetFormProps {
  isSet: boolean;
  quizSet: QuizSetType;
  toggleSet: React.Dispatch<React.SetStateAction<boolean>>;
  setQuizSet: React.Dispatch<React.SetStateAction<QuizSetType>>;
}
const QuizSetForm = ({
  isSet,
  quizSet,
  toggleSet,
  setQuizSet,
}: SetFormProps) => {
  const handleSetTagChange = (tag: string) => {
    const index = quizSet.tags.indexOf(tag);
    if (index < 0) {
      setQuizSet({ ...quizSet, tags: [...quizSet.tags, tag] });
    } else {
      setQuizSet({ ...quizSet, tags: quizSet.tags.filter((t) => t !== tag) });
    }
  };
  return (
    <S.SetWrapper>
      <S.SetCheckBox
        checked={isSet}
        type='checkbox'
        onChange={() => toggleSet(!isSet)}
      />
      세트화 여부
      <S.SetNameInput
        disabled={!isSet}
        placeholder='퀴즈세트 이름을 적어주세요'
        onChange={({ target }) =>
          setQuizSet({ ...quizSet, name: target.value })
        }
      />
      {isSet && (
        <S.SetInfoWrpper>
          {QUIZ_SET_TAG_LIST.map((tag) => (
            <React.Fragment key={tag}>
              <S.SetTagInput
                id={tag}
                type='checkbox'
                value={tag}
                onChange={({ target }) => handleSetTagChange(target.value)}
              />
              <S.SetTag htmlFor={tag}>{tag}</S.SetTag>
            </React.Fragment>
          ))}
          <S.TextArea
            placeholder='퀴즈세트에 대해서 설명해주세요'
            value={quizSet.des}
            onChange={({ target }) =>
              setQuizSet({ ...quizSet, des: target.value })
            }
          />
        </S.SetInfoWrpper>
      )}
    </S.SetWrapper>
  );
};

export default QuizSetForm;
