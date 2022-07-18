import styled from '@emotion/styled';
import {
  TEXT_100,
  TEXT_125,
  TEXT_150,
  TEXT_200,
  TEXT_250,
  TEXT_300,
  TEXT_80,
  TEXT_90,
  WEIGHT_LIGHT,
  WEIGHT_MEDIUM,
  WEIGHT_REGULAR,
  WEIGHT_SEMI_BOLD,
} from '@/foundations/text';
import { BLACK } from '@/foundations/colors';

type props = {
  color?: string;
  type?: string;
  weight?: string;
};

const setFontSize = ({ type }: props) => {
  if (type === 'h1') {
    return TEXT_300;
  }

  if (type === 'h2') {
    return TEXT_250;
  }

  if (type === 'h3') {
    return TEXT_200;
  }

  if (type === 'h4' || type === 'large') {
    return TEXT_150;
  }

  if (type === 'h5' || type === 'medium') {
    return TEXT_125;
  }

  if (type === 'small' || type === 'header' || type === 'button') {
    return TEXT_100;
  }

  if (type === 'detail') {
    return TEXT_80;
  }

  return TEXT_90;
};

const setFontWeight = ({ weight }: props) => {
  if (weight === 'bold') {
    return WEIGHT_SEMI_BOLD;
  }

  if (weight === 'medium') {
    return WEIGHT_MEDIUM;
  }

  if (weight === 'light') {
    return WEIGHT_LIGHT;
  }

  return WEIGHT_REGULAR;
};

export const Text = styled.div<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${setFontSize};
  font-weight: ${setFontWeight};
`;
