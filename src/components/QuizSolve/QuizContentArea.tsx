import { useState } from 'react';

import styled from '@emotion/styled';

import QuizCarousel from './QuizCarousel';

import type { Quiz as QuizInterface } from '@/interfaces/Quiz';

interface Props {
  quizzes: QuizInterface[];
  onClickAnswer: (index: number, value: string) => void;
}

/**
 * @description
 * QuizSolvePage에서 사용되는 컴포넌트입니다.
 * 내부적으로 Carousel을 사용하고 있습니다.
 */
const QuizContentArea = ({ quizzes, onClickAnswer }: Props) => {
  // ANCHOR - currentIndex는 단순 컴포넌트의 순서를 표시하는 용으로, form 로직에 영향을 미치지 않습니다.
  const [currentIndex, setCurrentIndex] = useState(0);

  const beforeChange = (currentSlide: number, nextSlide: number) => {
    setCurrentIndex(nextSlide);
  };

  return (
    <Container>
      <FlexWrapper>
        <CounterBox>
          {currentIndex + 1} / {quizzes.length}
        </CounterBox>
      </FlexWrapper>
      <QuizCarousel
        beforeChange={beforeChange}
        currentIndex={currentIndex}
        quizzes={quizzes}
        onClickAnswer={onClickAnswer}
      />
    </Container>
  );
};

export default QuizContentArea;

const FlexWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
});

const CounterBox = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '15rem',
  height: '5rem',
  backgroundColor: '#ffffff',
  border: '3px solid #14213D',
  borderRadius: '0.5rem',
  fontSize: '3rem',
  fontWeight: 600,
  userSelect: 'none',
});
