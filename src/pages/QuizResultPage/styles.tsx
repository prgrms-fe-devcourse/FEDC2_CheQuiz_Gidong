/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import theme from '@/styles/theme';

export interface StyledLinkedButtonProps {
  color?: 'point' | 'primary' | 'secondary';
  fill?: 'true' | 'false';
  fullWidth?: 'true' | 'false';
  round?: 'true' | 'false';
  padding?: string;
}

export const LinkButton = styled(Link)<StyledLinkedButtonProps>`
  display: ${({ fullWidth }) => (fullWidth ? 'block' : 'inline-block')};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: ${({ padding }) => padding || `0.5rem 1rem`};
  border: none;
  border-radius: ${({ round }) => (round === 'true' ? '0.5rem' : 0)};
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

export const FooterButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem auto;

  a {
    padding: 1rem;
    min-width: 10rem;
    text-align: center;
    color: ${theme.themeColors.primary};
    transition: all 0.2s ease;

    :first-of-type {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }

    :last-of-type {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }

    :hover {
      background-color: ${theme.themeColors.pointColor};
    }
  }
`;
