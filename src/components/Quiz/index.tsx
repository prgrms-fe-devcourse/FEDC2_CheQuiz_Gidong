import styled from '@emotion/styled';

import { Quiz as QuizInterface } from '@/interfaces/Quiz';

const QuizBox = styled.div`
  border: 1px solid black;
`;

interface QuizProps {
  quiz: QuizInterface;
  index?: number;
}
function Quiz({ quiz, index }: QuizProps): JSX.Element {
  return (
    <QuizBox>
      <div>Q. {quiz.question}</div>
    </QuizBox>
  );
}

export default Quiz;
