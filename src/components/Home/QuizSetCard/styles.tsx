import styled from '@emotion/styled';

import {
  DarkGray,
  medium,
  pointColor,
  small,
  tagBlue,
  tagGreen,
  tagLightBrown,
  tagPink,
  tagRed,
  tagYellow,
  white,
  detail,
  primary,
} from '@/styles/theme';

const colors = [
  pointColor,
  tagBlue,
  tagYellow,
  tagRed,
  tagLightBrown,
  tagPink,
  tagGreen,
];
export const CardContainer = styled.div`
  min-height: 25rem;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: ${white};
  transform: ${({ cardIdx }: { cardIdx: number }) =>
    cardIdx % 2 === 0 ? 'none' : 'translateY(1rem)'};

  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
`;

export const QuizBox = styled.div`
  padding: 1rem;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const Title = styled.div`
  ${medium}
`;
export const TagBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem 0.5rem;
`;
type TagProps = {
  order: number;
};
export const Tag = styled.div<TagProps>`
  height: 2.125rem;

  ${small};
  text-align: center;
  line-height: 2.125rem;

  border-radius: 0.25rem;

  background-color: ${(props) => colors[props.order]};
`;

export const Description = styled.div`
  flex-grow: 1;
  color: #686868;
  ${detail};

  white-space: break-spaces;
`;

export const UserBox = styled.div`
  height: 5.25rem;
  color: white;
  background-color: ${primary};

  display: flex;
  justify-content: space-around;
`;
export const UserName = styled.div`
  align-self: flex-end;
  margin-bottom: 1rem;
`;
export const UserImageWrapper = styled.div`
  align-self: center;
  width: 4rem;
  height: 4rem;

  border: 3px solid;
  border-radius: 0.5rem;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;
export const UserImage = styled.img`
  max-height: 5.5rem;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;
  margin-bottom: 0.5rem;
  border: 3px solid;
  border-radius: 8px;
  box-sizing: border-box;
  color: inherit;
  background-color: #e9ecef;
`;
