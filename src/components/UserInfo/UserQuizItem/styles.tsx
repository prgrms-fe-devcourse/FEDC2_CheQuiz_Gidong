/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';

import { borderRadius, large, primary, small } from '@/styles/theme';

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  //width: 35rem;
  height: 5.5rem;
  border: 3px solid ${primary};
  border-radius: ${borderRadius};
  background-color: white;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.1s;
  //TODO: hover 호불호 의견 구해보기
  &:hover {
    box-shadow: 2px 2px 0px 2px ${primary};
    transform: translateY(-5%);
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  padding: 1rem;
  height: 4.5rem;
`;
export const QuestionSymbol = styled.span`
  ${large};
  position: relative;
  bottom: 0.25rem;
  margin-right: 0.25rem;
`;
export const QuestionText = styled.h3`
  font-family: 'Pretendard', sans-serif;
  ${small};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 25rem;
`;

export const CountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 5rem;
  height: 100%;
  padding: 0.8rem;
  background-color: #ffdc84;
`;
export const CountItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.25rem;
  width: 100%;
  color: ${primary};
`;
