import styled from '@emotion/styled';
import { lightGrayWhite, primary } from '@/styles/theme';

export const TabWrapper = styled.div`
  margin-top: 4rem;
  width: 100%;
  min-width: 40rem;
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

type tabItemProps = {
  selected?: boolean;
};

export const TabItem = styled.div<tabItemProps>`
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

export const ButtonWrapper = styled.div`
  display: inline-flex;
  background-color: aliceblue;
  gap: 0.5rem;
`;

type buttonProps = {
  color?: string;
  selected?: boolean;
};
export const Button = styled.button<buttonProps>`
  border: 3px solid #343a40;
  border-radius: 8px;
  width: 9rem;
  height: 2.5rem;
  font-size: 1rem;
  font-family: 'MaplestoryOTFLight', sans-serif;
  background-color: ${({ color }) => color};
  color: white;
  cursor: pointer;
  filter: ${({ selected }) => (selected ? `brightness(120%)` : null)};

  &:hover {
    filter: brightness(120%);
  }
`;

export const UserQuizContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;
