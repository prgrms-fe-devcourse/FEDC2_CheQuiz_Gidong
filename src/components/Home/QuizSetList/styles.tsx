/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { DarkGray, grayWhite, h3, small } from '@/styles/theme';

export const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const FilterWrap = styled.div`
  height: 2.5rem;
  display: flex;
  padding: 0.5rem;
  align-items: center;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: ${grayWhite};
`;

export const SearchWrap = styled(FilterWrap)`
  gap: 1rem;
`;
export const SearchInput = styled.input`
  width: 11rem;
  border: none;
  outline: none;
  background-color: ${grayWhite};
  ${small};
`;

export const Title = styled.div`
  ${h3}
`;

export const QuizSetListContainer = styled.div`
  margin: 2rem 0 4rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem 1.5rem;

  @media all and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media all and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media all and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const LinkToSolve = styled(Link)`
  text-decoration: none;
  color: ${DarkGray};
`;
