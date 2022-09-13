import { useState } from 'react';

import * as S from './styles';

import type { Quiz as QuizInterface } from '@/interfaces/Quiz';

interface QuizProps {
  quiz: QuizInterface;
  index: number;
  onChangeUserAnswer: (index: number, value: string) => void;
}

const Quiz = ({ quiz, index, onChangeUserAnswer }: QuizProps): JSX.Element => {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const handleClickIndex = (idx: number) => setClickedIndex(idx);
  return (
    <S.OuterBox>
      <S.InnerBox>
        <S.Sign>Q.</S.Sign>
        <S.Title>{quiz.question}</S.Title>
      </S.InnerBox>
      <S.Wrapper margin={3}>
        {[
          ['O', 'true'],
          ['X', 'false'],
        ].map(([key, value], idx) => (
          <S.SelectButton
            key={value}
            currentSelected={clickedIndex === idx}
            type='button'
            onClick={() => {
              onChangeUserAnswer(index, value);
              handleClickIndex(idx);
            }}
          >
            {key}
          </S.SelectButton>
        ))}
      </S.Wrapper>
    </S.OuterBox>
  );
};

export default Quiz;
