/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';

import {
  DarkGray,
  grayWhite,
  large,
  primary,
  small,
  white,
} from '@/styles/theme';

export const Wrap = styled.div`
  border: none;
  border-radius: 0.5rem;
`;

export const Container = styled.div`
  height: 3rem;
  font-family: Pretendard, sans-serif;
  ${large};
  color: ${white};

  border-radius: 0.5rem 0.5rem 0.25rem 0.25rem;
  background-color: ${primary};
  display: flex;
  text-align: center;
  padding: 0.75rem 0;
`;

export const Rank = styled.div`
  width: 20%;
  justify-content: center;
`;

export const Exp = styled.div`
  width: 30%;
  justify-content: space-around;
`;

export const UserInfoWrap = styled.div`
  width: 50%;
  justify-content: space-around;
`;

export const SearchContainer = styled.div`
  margin: 1.25rem 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const SearchWrap = styled.span`
  height: 2.5rem;
  display: flex;
  padding: 0.5rem;
  align-items: center;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: ${grayWhite};

  gap: 1rem;
`;

export const SearchInput = styled.input`
  width: 11rem;
  border: none;
  outline: none;
  background-color: ${grayWhite};
  ${small};
  cursor: pointer;

  background-color: transparent;
`;
