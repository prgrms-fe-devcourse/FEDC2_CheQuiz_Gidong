import { useState } from 'react';

import styled from '@emotion/styled';

import maple from '@/assets/maple.png';

import type { Quiz as QuizInterface } from '@/interfaces/Quiz';

interface Props {
  quiz: QuizInterface;
  index: number;
  onChangeUserAnswer: (index: number, value: string) => void;
}

/**
 * @description
 * QuizCarousel 내부에서 사용되는 Item입니다.
 * ANCHOR - 재사용성이 낮으므로, 다른 유형 퀴즈를 받기 위해 변경 필요
 * 이 컴포넌트 자체가 재사용성이 낮기 때문에 더 이상 나누는 것은 불필요
 */
const QuizCarouselItem = ({ quiz, index, onChangeUserAnswer }: Props) => {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const handleClickIndex = (idx: number) => setClickedIndex(idx);
  return (
    <Container>
      <Question>
        <QuestionSign>Q.</QuestionSign>
        <QuestionTitle>{quiz.question}</QuestionTitle>
      </Question>
      <FlexContainer>
        {OX_KEY_VALUE_PAIR.map(([key, value], idx) => (
          <SelectButton
            key={value}
            selected={clickedIndex === idx}
            type='button'
            onClick={() => {
              onChangeUserAnswer(index, value);
              handleClickIndex(idx);
            }}
          >
            {key}
          </SelectButton>
        ))}
      </FlexContainer>
    </Container>
  );
};

export default QuizCarouselItem;

const OX_KEY_VALUE_PAIR = [
  ['O', 'true'],
  ['X', 'false'],
];

const Container = styled.div({
  color: '#14213D',
});

const Question = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  height: '15rem',
  margin: '0 auto',
  padding: '2rem',
  border: '3px solid #14213D',
  borderRadius: '0.5rem',
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  background: `url(${maple}) 98% 100% /6% no-repeat white`,
  overflowY: 'auto',
});

const QuestionSign = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '3.5rem',
  height: '3.5rem',
  fontSize: '2.5rem',
  fontWeight: 600,
  color: '#FCA311',
});

const QuestionTitle = styled.div({
  fontSize: '1.25rem',
  lineHeight: '1.4',
});

const FlexContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  gap: '2.5rem',
  margin: '3rem 0',
});

interface SelectButtonProps {
  selected: boolean;
}

const SelectButton = styled.button<SelectButtonProps>(
  {
    width: '25%',
    padding: '0.5rem 1rem',
    border: '3px solid #14213D',
    borderRadius: '0.5rem',
    fontSize: '1.5rem',
    outline: 'none',
    cursor: 'pointer',
  },
  ({ selected }) => ({
    backgroundColor: selected ? '#FCA311' : '#ffffff',
  })
);
