import styled from '@emotion/styled';
import {
  BORDER_DASH_STYLE,
  BORDER_DOT_STYLE,
  BORDER_LINE_STYLE,
  BORDER_RADIUS_STYLE,
} from '@/foundations/border';

type props = {
  color?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderType?: string;
  show?: boolean;
  hover?: string;
};

const setBorderType = ({ borderType = 'none' }) => {
  if (borderType === 'line') {
    return BORDER_LINE_STYLE;
  }

  if (borderType === 'dash') {
    return BORDER_DASH_STYLE;
  }

  if (borderType === 'dot') {
    return BORDER_DOT_STYLE;
  }

  return 'none';
};

const setDisplay = ({ show = false }) => (show ? 'block' : 'none');

export const OptionWrap = styled.ul<props>`
  position: absolute;
  display: ${setDisplay};
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.3125rem;
  border-radius: ${BORDER_RADIUS_STYLE};
  background-color: ${({ backgroundColor = 'inherit' }) => backgroundColor};

  li:hover {
    background-color: ${({ hover = 'inherit' }) => hover};
  }
`;

export const Option = styled.li<props>`
  margin: 0.3125rem 0;
  list-style: none;
  padding: 0.3125rem;
  color: ${({ color = 'inherit' }) => color};
  width: ${({ width = 'auto' }) => width};
  height: ${({ height = 'auto' }) => height};
  background-color: ${({ backgroundColor = 'transparent' }) => backgroundColor};
  border-bottom: ${setBorderType};
`;
