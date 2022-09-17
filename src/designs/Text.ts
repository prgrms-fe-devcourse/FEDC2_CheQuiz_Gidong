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
  if (type === 'large') {
    return TEXT_150;
  }

  if (type === 'medium') {
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

export const H1 = styled.h1<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${TEXT_300};
  font-weight: ${WEIGHT_SEMI_BOLD};
`;

export const H2 = styled.h2<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${TEXT_250};
  font-weight: ${WEIGHT_SEMI_BOLD};
`;

export const H3 = styled.h3<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${TEXT_200};
  font-weight: ${WEIGHT_SEMI_BOLD};
`;

export const H4 = styled.h4<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${TEXT_150};
  font-weight: ${WEIGHT_SEMI_BOLD};
`;

export const H5 = styled.h5<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${TEXT_125};
  font-weight: ${WEIGHT_SEMI_BOLD};
`;

export const LargeText = styled.span<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${TEXT_150};
  font-weight: ${WEIGHT_REGULAR};
`;

export const MediumText = styled.span<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${TEXT_125};
  font-weight: ${WEIGHT_REGULAR};
`;

export const SmallText = styled.span<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${TEXT_100};
  font-weight: ${WEIGHT_REGULAR};
`;

export const DetailText = styled.span<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${TEXT_80};
  font-weight: ${WEIGHT_REGULAR};
`;

export const BoldText = styled.span<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${TEXT_90};
  font-weight: ${WEIGHT_SEMI_BOLD};
`;

export const MediumBoldText = styled.span<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${TEXT_90};
  font-weight: ${WEIGHT_MEDIUM};
`;

export const LightText = styled.span<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${TEXT_90};
  font-weight: ${WEIGHT_LIGHT};
`;

export const BasicText = styled.span<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${TEXT_90};
  font-weight: ${WEIGHT_REGULAR};
`;

export const CustomText = styled.span<props>`
  color: ${({ color = BLACK }) => color};
  font-size: ${setFontSize};
  font-weight: ${setFontWeight};
`;
