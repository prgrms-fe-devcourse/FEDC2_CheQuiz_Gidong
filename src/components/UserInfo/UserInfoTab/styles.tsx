/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';

import { lightGrayWhite, primary } from '@/styles/theme';

export const TabWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
  min-width: 20rem;
`;

export const TabMenus = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TabContent = styled.div`
  position: relative;
  height: 28rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border: 3px solid #343a40;
  border-radius: 8px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${primary};
  }
  &::-webkit-scrollbar-track {
    background-color: ${lightGrayWhite};
  }
`;

export const TabItemContainer = styled.div`
  position: relative;
  top: 0.3rem;
`;

type TabItemProps = {
  selected?: boolean;
};

export const TabItem = styled.div<TabItemProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 3rem;
  margin-right: 0.5rem;
  border: 3px solid #343a40;
  border-radius: 8px;
  color: ${({ selected }) => (selected ? '#f8f9fa' : 'black')};
  background-color: ${({ selected }) => (selected ? `#14213D` : `white`)};
  font-family: 'MaplestoryOTFLight', sans-serif;
  cursor: pointer;
  &:hover {
    background-color: ${({ selected }) => (selected ? '#14213D' : '#E9ECEF')};
  }
`;

export const UserQuizContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;
