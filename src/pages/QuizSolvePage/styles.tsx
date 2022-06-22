import styled from '@emotion/styled';
import { primary, lightGrayWhite, h1 } from '@/styles/theme';

export interface SubmitButtonProps {
  disabled?: boolean;
}

interface WrapperProps {
  gap?: string;
  margin?: string;
  padding?: string;
  justify?: 'center' | 'between' | 'around' | 'even' | 'flexStart' | 'flexEnd';
  align?: 'center' | 'start' | 'flexStart' | 'flexEnd';
}

export const SliderButton = styled.button`
  align-self: flex-start;
  min-height: 15rem;
  padding: 0 1rem;

  border: none;
  outline: none;
  background-color: ${lightGrayWhite};
  cursor: pointer;
`;

export const SubmitButton = styled.button<SubmitButtonProps>`
  width: 25%;
  padding: 0.5rem 1rem;

  color: ${({ disabled }) => (disabled ? '#787878' : '#ffffff')};
  font-size: 1.5rem;
  border: 3px solid ${primary};
  border-radius: 0.5rem;
  background-color: ${({ disabled }) => (disabled ? '#ababab' : 'royalblue')};
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
  width: 15rem;
  height: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  ${h1};
  border: 3px solid ${primary};
  border-radius: 0.5rem;
  background-color: white;
`;

export const QuizSolvePage = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  background-color: ${lightGrayWhite};
`;

export const SliderContainer = styled.div`
  width: 80%;
`;
