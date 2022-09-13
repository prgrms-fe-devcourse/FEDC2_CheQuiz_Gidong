/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';

import {
  blackGray,
  DarkGray,
  grayWhite,
  large,
  lightGrayWhite,
  small,
} from '@/styles/theme';

export const Container = styled.div`
  height: ${({ rank }: { rank: number }) => (rank <= 3 ? '10rem' : '8rem')};

  display: flex;
  color: ${blackGray};
  text-align: center;
  align-items: center;

  border: 3px solid ${DarkGray};
  border-top: 1px solid ${DarkGray};
  border-radius: 0.25rem;
  background-color: ${({ rank }: { rank: number }) => {
    if (rank === 1) return 'azure';
    if (rank === 2) return 'cornsilk';
    if (rank === 3) return 'lightgray';
    return lightGrayWhite;
  }};
  cursor: pointer;
`;

export const Rank = styled.div`
  width: 20%;
  ${large};
  font-size: ${({ rank }: { rank: number }) => (rank <= 3 ? '2rem' : '1.5rem')};
  font-family: 'MaplestoryOTFBold';
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Exp = styled.div`
  width: 30%;
  ${small};
  font-family: Pretendard, sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const UserWrapper = styled.div`
  width: 50%;

  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserProfile = styled.div`
  width: 6rem;
  height: 6rem;
  border: 3px solid
    ${({ rank }: { rank: number }) => (rank <= 3 ? 'gold' : 'none')};
  border-radius: 50%;
  background-color: ${grayWhite};
  display: flex;
  align-items: center;
`;

export const UserImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  padding: 1.25rem;
`;

export const UserInfoWrap = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const UserName = styled.div`
  display: flex;
  justify-content: flex-start;
  ${large};
`;

export const TagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3125rem;
`;
