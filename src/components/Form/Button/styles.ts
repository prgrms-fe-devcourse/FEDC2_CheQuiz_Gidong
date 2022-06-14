import styled from '@emotion/styled';

// TODO: 전역 스타일 컬러 적용
export const Button = styled.button`
  padding: 8px 24px;
  background-color: #fca311;
  border: 2px solid #14213d;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: tomato;
  }
`;
