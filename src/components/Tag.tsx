import styled from '@emotion/styled';
import { Theme } from '@emotion/react';
import theme, {
  blackGray,
  borderRadius,
  borderWidth,
  tag0,
  tag10,
  tag100,
  tag1000,
  tag10000,
  tag50,
  tag500,
  tag5000,
  tag50000,
  tagBlue,
  tagGreen,
  tagLightBrown,
  tagNoComments,
  tagNoLikes,
  tagPink,
  tagRed,
  tagYellow,
} from '@/styles/theme';
import {
  BLUE,
  BROWN,
  GREEN,
  NOCOMMENTS,
  NOLIKES,
  PINK,
  RED,
  YELLOW,
} from '@/common/string';

type propsType = {
  colors: string;
  text: string;
};

const TagWrap = styled.div`
  color: ${blackGray};
  padding: 0.3125rem;
  border: ${borderWidth};
  border-radius: ${borderRadius};
  background-color: ${({ colors }: Theme) => {
    if (colors === GREEN) return tagGreen;
    if (colors === BLUE) return tagBlue;
    if (colors === YELLOW) return tagYellow;
    if (colors === RED) return tagRed;
    if (colors === PINK) return tagPink;
    if (colors === BROWN) return tagLightBrown;
    if (colors === '0') return tag0;
    if (colors === '10') return tag10;
    if (colors === '50') return tag50;
    if (colors === '100') return tag100;
    if (colors === '500') return tag500;
    if (colors === '1000') return tag1000;
    if (colors === '5000') return tag5000;
    if (colors === '10000') return tag10000;
    if (colors === '50000') return tag50000;
    if (colors === NOLIKES) return tagNoLikes;
    if (colors === NOCOMMENTS) return tagNoComments;
    return '#999';
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
