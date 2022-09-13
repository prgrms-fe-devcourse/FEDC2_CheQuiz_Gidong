/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`;

export const Label = styled.label`
  margin-bottom: 4px;
`;

// TODO: 전역 스타일 컬러 적용
export const Input = styled.input`
  width: 100%;
  border: 2px solid #14213d;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  padding: 8px;
  font-size: 1rem;
`;

export const ErrorText = styled.div`
  color: #ff0000;
  font-size: 0.9rem;
`;
