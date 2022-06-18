import styled from '@emotion/styled';
import { blackGray, DarkGray, small, white } from '@/styles/theme';

export const QuizListContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InsertQuizItem = styled.button`
  height: 7.5rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 1rem;

  border: 3px dashed ${DarkGray};
  border-bottom: none;
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: ${white};

  ${small};
  color: ${blackGray};
  cursor: pointer;
`;
