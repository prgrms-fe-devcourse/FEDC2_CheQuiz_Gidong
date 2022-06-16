import React, { useState } from 'react';
import { Quiz as QuizInterface } from '@/interfaces/Quiz';
import * as S from './styles';

interface QuizProps {
  quiz: QuizInterface;
  index: number;
  onChangeUserAnswer: (index: number, value: string) => void;
}

function Quiz({ quiz, index, onChangeUserAnswer }: QuizProps): JSX.Element {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const handleClickIndex = (idx: number) => setClickedIndex(idx);
  return (
    <S.OuterBox>
      <S.InnerBox>
        <S.Title>
          <S.Sign>Q.</S.Sign>
          {quiz.question}
        </S.Title>
      </S.InnerBox>
      <S.Wrapper margin={3}>
        {[
          ['O', 'true'],
          ['X', 'false'],
        ].map(([key, value], idx) => {
          return (
            <S.SelectButton
              key={value}
              type="button"
              currentSelected={clickedIndex === idx}
              onClick={() => {
                onChangeUserAnswer(index, value);
                handleClickIndex(idx);
              }}
            >
              {key}
            </S.SelectButton>
          );
        })}
      </S.Wrapper>
    </S.OuterBox>
  );
}

export default Quiz;
