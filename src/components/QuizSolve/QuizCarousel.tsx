import { useRef } from 'react';

import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import QuizCarouselItem from './QuizCarouselItem';
import SliderButton from './SliderButton';

import type { Quiz as QuizInterface } from '@/interfaces/Quiz';
import type { Settings } from 'react-slick';

interface Props {
  currentIndex: number;
  quizzes: QuizInterface[];
  beforeChange: (currentSlide: number, nextSlide: number) => void;
  onClickAnswer: (index: number, value: string) => void;
}

const QuizCarousel = ({
  currentIndex,
  quizzes,
  beforeChange,
  onClickAnswer,
}: Props) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = { ...CAROUSEL_SETTINGS, beforeChange };

  return (
    <FlexWrapper>
      <SliderButton
        disabled={currentIndex === 0}
        variant='left'
        onClick={() => sliderRef.current?.slickPrev()}
      />
      <SliderContainer>
        <Slider
          {...settings}
          ref={(slider) => {
            sliderRef.current = slider;
          }}
        >
          {quizzes.map((quiz, index) => (
            <QuizCarouselItem
              key={quiz._id}
              index={index}
              quiz={quiz}
              onChangeUserAnswer={onClickAnswer}
            />
          ))}
        </Slider>
      </SliderContainer>
      <SliderButton
        disabled={currentIndex === quizzes.length - 1}
        variant='right'
        onClick={() => sliderRef.current?.slickNext()}
      />
    </FlexWrapper>
  );
};

export default QuizCarousel;

const CAROUSEL_SETTINGS: Settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerPadding: '40px',
  arrows: false,
};

const FlexWrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const SliderContainer = styled.div`
  width: 80%;
`;
