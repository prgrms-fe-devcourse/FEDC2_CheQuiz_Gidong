import React from 'react';

import styled from '@emotion/styled';

import { QUIZ_SET_TAG_LIST } from '@/constants';
import { DarkGray, lightGrayWhite, pointColor } from '@/styles/theme';

import type { QuizSet } from '@/interfaces/model';

interface SetFormProps {
  isSet: boolean;
  quizSet: QuizSet;
  toggleSet: React.Dispatch<React.SetStateAction<boolean>>;
  setQuizSet: React.Dispatch<React.SetStateAction<QuizSet>>;
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
    <SetWrapper>
      <SetCheckBox
        checked={isSet}
        type='checkbox'
        onChange={() => toggleSet(!isSet)}
      />
      세트화 여부
      <SetNameInput
        disabled={!isSet}
        placeholder='퀴즈세트 이름을 적어주세요'
        onChange={({ target }) =>
          setQuizSet({ ...quizSet, name: target.value })
        }
      />
      {isSet && (
        <SetInfoWrpper>
          {QUIZ_SET_TAG_LIST.map((tag) => (
            <React.Fragment key={tag}>
              <SetTagInput
                id={tag}
                type='checkbox'
                value={tag}
                onChange={({ target }) => handleSetTagChange(target.value)}
              />
              <SetTag htmlFor={tag}>{tag}</SetTag>
            </React.Fragment>
          ))}
          <TextArea
            placeholder='퀴즈세트에 대해서 설명해주세요'
            value={quizSet.des}
            onChange={({ target }) =>
              setQuizSet({ ...quizSet, des: target.value })
            }
          />
        </SetInfoWrpper>
      )}
    </SetWrapper>
  );
};

export default QuizSetForm;

export const SetWrapper = styled.section`
  margin-bottom: 1rem;
  padding: 0.5rem 1.5rem;
  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: white;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

export const SetCheckBox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid ${DarkGray};
  cursor: pointer;
`;

export const SetNameInput = styled.input`
  min-width: 30%;
  height: 3rem;
  padding: 0.25rem 1rem;
  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: ${({ disabled }) => (disabled ? lightGrayWhite : 'white')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'auto')};
  font-family: 'Pretendard';
`;

export const SetInfoWrpper = styled.div`
  flex-basis: 100%;

  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const SetTag = styled.label`
  width: auto;
  min-width: 5rem;
  height: 3rem;
  padding: 0.5rem;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: white;
  text-align: center;
  line-height: 2rem;
  cursor: pointer;
`;
export const SetTagInput = styled.input`
  display: none;

  &:checked + ${SetTag} {
    background-color: ${pointColor};
  }
`;

export const TextArea = styled.textarea`
  flex-basis: 100%;
  width: 100%;
  height: 7rem;
  padding: 1rem;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  font-family: 'Pretendard';
  resize: none;
`;
