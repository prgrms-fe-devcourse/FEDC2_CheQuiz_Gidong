/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import {
  DarkGray,
  h1,
  h3,
  lightGrayWhite,
  medium,
  pointColor,
  small,
} from '@/styles/theme';

export const Container = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;

export const TitleBox = styled.div`
  display: flex;
`;

export const Title = styled.div`
  width: 20rem;
  height: 4rem;

  color: white;
  ${h3};
  text-align: center;
  line-height: 4rem;

  background-color: ${DarkGray};
  border: 3px solid ${DarkGray};
  border-radius: 0.5rem 0 0 0;
  border-right: none;
`;
export const RoundShapeBox = styled.div`
  width: 4rem;
  height: 4rem;

  background-color: ${DarkGray};
  border: 3px solid ${DarkGray};
  border-radius: 0 4rem 0 0;
  border-left: none;
`;

export const ContentBox = styled.div`
  display: flex;
`;

export const Content = styled.div`
  width: 36rem;
  height: 8rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;

  color: ${DarkGray};
  ${h3};

  background-color: ${lightGrayWhite};
  border: 3px solid ${DarkGray};
  border-radius: 0 0 0 0.5rem;
  border-right: none;
  gap: 1rem;
`;
type TextProps = {
  type?: string;
};
export const Text = styled.div<TextProps>`
  ${({ type }) => (type === 'small' ? small : medium)};
`;

export const BoldText = styled.div`
  ${h1};
  color: ${pointColor};
  -webkit-text-stroke: 1px ${DarkGray};
`;
export const StartBox = styled(Link)`
  width: 8rem;
  height: 8rem;

  color: ${DarkGray};
  background-color: white;
  border: 3px solid ${DarkGray};
  border-radius: 0 1rem 4rem 0;
  text-decoration: none;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  width: 5.5rem;
  height: 1.75rem;
  margin: 0 1rem;
  ${small};
  text-align: center;
  vertical-align: middle;

  border: none;
  outline: none;
  background-color: ${lightGrayWhite};
  cursor: pointer;
`;
