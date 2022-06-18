import styled from '@emotion/styled';
import {
  blackGray,
  correct,
  DarkGray,
  h2,
  incorrect,
  lightGrayWhite,
  small,
  white,
} from '@/styles/theme';
import arrowIcon from '@/assets/arrow_down_icon.png';

interface LabelProps {
  block: boolean;
}

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
`;

export const QuestionWrapper = styled.div`
  flex-grow: 1;
  display: flex;
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

export const TrueFalseWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 1rem;
  & > div {
    flex-basis: 100%;
    font-size: 1.25rem;
  }
`;
export const TrueFalseBox = styled.label`
  width: 7.5rem;
  height: 3rem;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: white;
  ${h2};
  text-align: center;
  line-height: 3rem;
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
`;

//* Common
export const TextArea = styled.textarea`
  width: 100%;
  height: 7rem;
  padding: 1rem;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  font-family: 'Pretendard';
`;
export const Label = styled.div<LabelProps>`
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;
