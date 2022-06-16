import styled from '@emotion/styled';
import { blackGray, borderWidth, gray, large, medium } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  color: ${blackGray};
  justify-content: space-around;
  align-items: center;
  border: ${borderWidth};
  border-top: none;
  padding: 1.5rem 0;
`;

export const Rank = styled.div`
  ${large};
  font-family: 'MaplestoryOTFBold';
  width: 6.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Exp = styled.div`
  width: 9.375rem;
  font-family: 'MaplestoryOTFLight';
  ${medium}
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const UserProfile = styled.div`
  width: 9.375rem;
  height: 9.375rem;
  border-radius: 50%;
  background-color: ${gray};
`;

export const UserImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  padding: 1.25rem;
`;

export const UserInfoWrap = styled.div`
  width: 18.75rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`;

export const UserName = styled.div`
  font-family: 'MaplestoryOTFBold';
  ${large};
`;

export const TagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3125rem;
`;
