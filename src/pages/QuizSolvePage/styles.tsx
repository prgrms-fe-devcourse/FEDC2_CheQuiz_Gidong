import styled from '@emotion/styled';
import { primary, pointColor } from '@/styles/theme';
import { SliderButtonProps } from './SliderButton';

export interface SelectButtonProps {
  disabled?: boolean;
}

interface WrapperProps {
  gap?: string;
  margin?: string;
  padding?: string;
  justify?: 'center' | 'between' | 'around' | 'even' | 'flexStart' | 'flexEnd';
  align?: 'center' | 'start' | 'flexStart' | 'flexEnd';
}

export const SliderButton = styled.button<SliderButtonProps>`
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 3px solid ${primary};
  border-radius: 0.5rem;
  color: ${({ color }) => {
    if (color === 'point') return pointColor;
    if (color === 'primary') return '#14213d';
    return '#e5e5e5';
  }};
  z-index: 10;
  font-size: 1rem;
  font-family: 'MaplestoryOTFLight';
  outline: none;
  cursor: pointer;
`;

export const SelectButton = styled.button<SelectButtonProps>`
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

  :disabled {
    cursor: not-allowed;
  }
`;

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: ${({ justify }) => {
    if (justify === 'center') return 'center';
    if (justify === 'between') return 'space-between';
    if (justify === 'around') return 'space-around';
    if (justify === 'even') return 'space-evenly';
    if (justify === 'flexEnd') return 'flex-end';
    return 'flex-start';
  }};
  align-items: ${({ align }) => {
    if (align === 'center') return 'align-center';
    if (align === 'start') return 'start';
    if (align === 'flexStart') return 'flex-start';
    if (align === 'flexEnd') return 'flex-end';
    return 'stretch';
  }};
  gap: ${({ gap }) => gap || 0};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  font-size: 1.25rem;
  font-family: 'MaplestoryOTFLight';
`;

export const Box = styled.div`
  display: flex;
  padding: 0.5rem 2rem;
  border: 3px solid ${primary};
  border-radius: 0.5rem;
  font-size: 1.25rem;
  font-family: 'MaplestoryOTFLight';
`;
