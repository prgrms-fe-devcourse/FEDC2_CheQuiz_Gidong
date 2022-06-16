import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export interface StyledLinkedButtonProps {
  color: 'point' | 'primary' | 'secondary';
  fill?: 'true' | 'false';
  fullWidth?: 'true' | 'false';
}

export const LinkButton = styled(Link)<StyledLinkedButtonProps>`
  display: ${({ fullWidth }) => (fullWidth ? 'block' : 'inline-block')};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ color, fill }) => {
    if (!fill) return '#e5e5e5';
    if (color === 'point') return '#fca211';
    if (color === 'primary') return '#14213d';
    return '#e5e5e5';
  }};
  color: ${({ color, fill }) => {
    if (fill) return '#e5e5e5';
    if (color === 'point') return '#fca211';
    if (color === 'primary') return '#14213d';
    return '#e5e5e5';
  }};
  font-size: 1rem;
  text-decoration: none;
  outline: none;
  cursor: pointer;
`;

export const QuizResultPage = styled.div`
  * {
    font-family: 'MaplestoryOTFLight';
  }
`;
