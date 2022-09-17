import styled from '@emotion/styled';
import { BLACK } from '@/foundations/colors';
import { BORDER_RADIUS_STYLE } from '@/foundations/border';

type props = {
  color?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
};

export const Select = styled.div<props>`
  position: relative;
  padding: 0.3125rem;
  border-radius: ${BORDER_RADIUS_STYLE};
  color: ${({ color = BLACK }) => color};
  width: ${({ width = 'auto' }) => width};
  height: ${({ height = 'auto' }) => height};
  background-color: ${({ backgroundColor = 'transparent' }) => backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
