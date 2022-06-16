import styled from '@emotion/styled';

export interface StyledSliderButtonProps {
  color: 'point' | 'primary' | 'secondary';
  className?: string;
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
