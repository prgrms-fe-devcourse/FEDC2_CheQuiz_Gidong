import styled from '@emotion/styled';
import { primary } from '@/styles/theme';

export interface StyledSliderButtonProps {
  color: 'point' | 'primary' | 'secondary';
  className?: string;
}

export interface StyledButtonProps {
  disabled?: boolean;
}

export const SliderButton = styled.button<StyledSliderButtonProps>`
  border: none;
  background-color: transparent;
  color: ${({ color }) => {
    if (color === 'point') return '#fca311';
    if (color === 'primary') return '#14213d';
    return '#e5e5e5';
  }};
  z-index: 10;
  font-size: 1rem;
  outline: none;

  :before {
    color: black;
  }
`;

export const SelectButton = styled.button<StyledButtonProps>`
  width: 25%;
  padding: 0.5rem 1rem;
  border: 3px solid ${primary};
  border-radius: 0.5rem;
  background-color: ${({ disabled }) => (disabled ? '#ababab' : 'royalblue')};
  color: ${({ disabled }) => (disabled ? '#787878' : '#ffffff')};
  font-size: 1.5rem;
  font-family: 'MaplestoryOTFLight';
  outline: none;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
`;
