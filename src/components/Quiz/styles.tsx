import styled from '@emotion/styled';
import { primary, pointColor } from '@/styles/theme';

interface SelectButtonProps {
  currentSelected: boolean;
}

interface StyledWrapperProps {
  margin?: number;
}

export const OuterBox = styled.div`
  * {
    box-sizing: border-box;
    color: ${primary};
    font-family: 'MaplestoryOTFLight';
  }
`;

export const InnerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 15rem;
  overflow-y: auto;
  margin: 0 auto;
  padding: 2rem;
  border: 3px solid ${primary};
  border-radius: 0.5rem;
`;

export const Title = styled.div`
  line-height: 1.4;
  font-size: 1.25rem;
`;

export const SelectButton = styled.button<SelectButtonProps>`
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
