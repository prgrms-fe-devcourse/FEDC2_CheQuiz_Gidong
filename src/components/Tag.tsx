import styled from '@emotion/styled';
import { Theme } from '@emotion/react';
import theme, {
  borderRadius,
  tagBlue,
  tagGreen,
  tagLightBrown,
  tagPink,
  tagRed,
  tagYellow,
  white,
} from '@/styles/theme';
import { BLUE, BROWN, GREEN, PINK, RED, YELLOW } from '@/common/string';

type propsType = {
  colors: string;
  text: string;
};

const TagWrap = styled.span`
  color: ${white};
  padding: 0.3125rem;
  background-color: ${({ colors }: Theme) => {
    if (colors === GREEN) return tagGreen;
    if (colors === BLUE) return tagBlue;
    if (colors === YELLOW) return tagYellow;
    if (colors === RED) return tagRed;
    if (colors === PINK) return tagPink;
    if (colors === BROWN) return tagLightBrown;
    return '#000';
  }};

  border-radius: ${borderRadius};
`;

function Tag({ colors, text, ...props }: propsType) {
  return (
    <TagWrap {...theme} {...props} colors={colors}>
      {text}
    </TagWrap>
  );
}

export default Tag;
