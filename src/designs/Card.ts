import styled from '@emotion/styled';
import { BORDER_RADIUS_STYLE, BORDER_STYLE } from '@/foundations/border';
import { GRAY_800 } from '@/foundations/colors';
import { PADDING_OUTER_WRAPPER } from '@/foundations/grid';

interface CardProps {
  width: string | number;
  height: string | number;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  clickable?: boolean;
  borderTheme?: 'dashed' | 'solid';
}

export const Card = styled.div<CardProps>`
  width: ${({ width }) => (typeof width === 'string' ? width : `${width}px`)};
  height: ${({ height }) =>
    typeof height === 'string' ? height : `${height}px`};

  padding: ${PADDING_OUTER_WRAPPER};

  border: ${BORDER_STYLE} ${GRAY_800};
  border-radius: ${BORDER_RADIUS_STYLE};
  border-color: ${({ borderColor }) => borderColor};

  color: ${({ textColor }) => textColor};
  background-color: ${({ backgroundColor }) => backgroundColor};

  cursor: ${({ clickable }) => clickable && `pointer`};
`;
