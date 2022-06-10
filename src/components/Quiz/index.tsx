import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Quiz as QuizInterface } from '@/interfaces/Quiz';
import SelectButton from './SelectButton';

const QuizBox = styled.div`
  border: 1px solid black;
`;

interface QuizProps {
  quiz: QuizInterface;
  index: number;
  onChangeUserAnswer: (index: number, value: string) => void;
}
function Quiz({ quiz, index, onChangeUserAnswer }: QuizProps): JSX.Element {
  // TODO: OX 버튼 인덱스로 관리할 것
  const [clickedIndex, setClickedIndex] = useState(-1);
  const handleClickIndex = (idx: number) => setClickedIndex(idx);
  return (
    <QuizBox>
      <div>Q. {quiz.question}</div>
      {quiz.answerType === 'shortAnswer' ? (
        <input
          type="text"
          onChange={(e) => onChangeUserAnswer(index, e.target.value)}
        />
      ) : (
        <>
          <SelectButton
            value="true"
            onChangeUserAnswer={onChangeUserAnswer}
            problemIndex={index}
            currentSelected={clickedIndex}
            buttonIndex={0}
            text="O"
            onClickCurrentButton={handleClickIndex}
          />
          <SelectButton
            value="false"
            onChangeUserAnswer={onChangeUserAnswer}
            problemIndex={index}
            currentSelected={clickedIndex}
            buttonIndex={1}
            text="X"
            onClickCurrentButton={handleClickIndex}
          />
        </>
      )}
    </QuizBox>
  );
}

export default Quiz;
