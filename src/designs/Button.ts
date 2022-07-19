import styled from '@emotion/styled';
import {
  BRAND_COLOR,
  GRAY_800,
  PRIMARY,
  SECONDARY,
} from '@/foundations/colors';
import { BORDER_RADIUS_STYLE, BORDER_STYLE } from '@/foundations/border';

interface ButtonProps {
  colorTheme?: 'brand' | 'primary' | 'secondary';
  borderTheme?: 'none' | 'dashed'; // 추후 dashed 추가될 수 있음. 기본 solid
  size?: 'large' | 'medium' | 'small' | 'fit-content';
  disable?: boolean;
}

const backgroundMapper = {
  brand: BRAND_COLOR,
  primary: PRIMARY,
  secondary: SECONDARY,
};

const hoverColorMapper = {
  brand: 'tomato',
  primary: '#3c5997',
  secondary: '#aaaaaa',
};

const sizeMapper = {
  large: '8rem',
  medium: '6rem',
  small: '4.5rem',
};

const fontSizeMapper = {
  large: '1.1rem',
  medium: '1rem',
  small: '0.8rem',
};

export const Button = styled.button<ButtonProps>`
  width: ${({ size }) =>
    size === 'fit-content' ? undefined : size && sizeMapper[size]};
  height: 2.5rem;

  border: ${BORDER_STYLE} ${GRAY_800};
  border-style: ${({ borderTheme }) => borderTheme};
  border-radius: ${BORDER_RADIUS_STYLE};

  color: ${({ colorTheme }) => (colorTheme === 'primary' ? 'white' : 'black')};
  font-size: ${({ size }) =>
    size === 'fit-content' ? undefined : size && fontSizeMapper[size]};

  background-color: ${({ colorTheme }) =>
    colorTheme && backgroundMapper[colorTheme]};
  opacity: ${({ disable }) => (disable ? `0.8` : `1`)};

  &:hover {
    background-color: ${({ colorTheme, disable }) =>
      !disable && colorTheme && hoverColorMapper[colorTheme]};
  }
  cursor: ${({ disable }) => (disable ? `not-allowed` : `pointer`)};
`;

interface CustomButtonProps {
  width?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;

  color?: string;
  borderTheme?: 'none' | 'dashed'; // 추후 dashed 추가될 수 있음. 기본 solid
  isSquare?: boolean;
  disable?: boolean;
}

export const CustomButton = styled.button<CustomButtonProps>`
  height: 2.5rem;
  width: ${({ width }) => width};

  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  &:hover {
    background-color: ${({ hoverBackgroundColor, disable }) =>
      !disable && `${hoverBackgroundColor}`};
    color: ${({ hoverTextColor }) => hoverTextColor};
  }

  border: ${BORDER_STYLE} ${GRAY_800};
  border-style: ${({ borderTheme }) => borderTheme};
  border-radius: ${({ isSquare }) => (isSquare ? 0 : BORDER_RADIUS_STYLE)};

  opacity: ${({ disable }) => (disable ? `0.8` : `1`)};
  cursor: ${({ disable }) => (disable ? `not-allowed` : `pointer`)};
`;
