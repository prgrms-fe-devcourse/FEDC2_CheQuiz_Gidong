import styled from '@emotion/styled';
import { blackGray, borderWidth, gray, large } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  color: ${blackGray};
  justify-content: space-around;
  align-items: center;
  border: ${borderWidth};
  padding: 1.5rem 0;
  margin: 0.3125rem 0.125rem;
`;

export const Rank = styled.div`
  ${large};
  width: 6.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Exp = styled.div`
  width: 9.375rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const UserProfile = styled.div`
  width: 9.375rem;
`;

export const UserImg = styled.img`
  width: 100%;
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
  border: ${borderWidth};
  border-color: ${gray};
  padding: 0.125rem 1.25rem;
`;

export const TagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3125rem;
`;
