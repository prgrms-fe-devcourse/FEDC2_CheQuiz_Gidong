import styled from '@emotion/styled';
import { primary, pointColor } from '@/styles/theme';

interface StyledSelectButtonProps {
  currentSelected: boolean;
}

interface StyledWrapperProps {
  margin?: number;
}

export const OuterBox = styled.div``;

export const InnerBox = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
  border: 3px solid ${primary};
  border-radius: 0.5rem;
  * {
    box-sizing: border-box;
    color: ${primary};
    font-family: 'MaplestoryOTFLight';
  }
`;

export const Title = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.5rem;
`;

export const SelectButton = styled.button<StyledSelectButtonProps>`
  width: 25%;
  padding: 0.5rem 1rem;
  border: 3px solid ${primary};
  border-radius: 0.5rem;
  background-color: ${({ currentSelected }) =>
    currentSelected ? pointColor : '#e5e5e5'};
  font-size: 1.5rem;
  outline: none;
  cursor: pointer;
`;

export const Sign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  border-radius: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
  color: ${pointColor};
`;

export const Wrapper = styled.div<StyledWrapperProps>`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin: ${({ margin }) => (margin ? `${margin}rem` : 0)} 0;
`;
