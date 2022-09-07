import styled from '@emotion/styled';

import { blackGray, DarkGray, small, white } from '@/styles/theme';

export const QuizListContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InsertQuizItem = styled.button`
  height: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 3px dashed ${DarkGray};
  border-radius: 0.5rem;
  background-color: ${white};

  ${small};
  color: ${blackGray};
  cursor: pointer;
`;
