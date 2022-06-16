import styled from '@emotion/styled';
import { borderWidth } from '@/styles/theme';

export const Wrap = styled.div`
  border: 0.0625rem solid;
`;

export const Container = styled.div`
  border: ${borderWidth};
  display: flex;
  justify-content: space-around;
  padding: 0.75rem 0;
`;

export const Rank = styled.div`
  width: 6.25rem;
`;

export const Exp = styled.div`
  width: 9.375rem;
`;

export const UserInfoWrap = styled.div`
  width: 28.125rem;
`;

export const SearchContainer = styled.div`
  margin: 1.25rem 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const SearchWrap = styled.span`
  border: 0.0625rem solid;
  display: flex;
  align-items: center;
  padding: 0.3125rem;
`;

export const SearchInput = styled.input`
  height: 1.875rem;
  width: 12.5rem;
  font-size: 1.25rem;
  margin-left: 0.625rem;
  outline: none;
  border: none;
`;

export const UserInfoContainer = styled.div`
  height: 660px;
  overflow-y: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
