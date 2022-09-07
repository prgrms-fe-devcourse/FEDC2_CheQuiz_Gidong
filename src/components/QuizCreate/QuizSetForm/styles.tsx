import styled from '@emotion/styled';

import { DarkGray, lightGrayWhite, pointColor } from '@/styles/theme';

export const SetWrapper = styled.section`
  margin-bottom: 1rem;
  padding: 0.5rem 1.5rem;
  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: white;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

export const SetCheckBox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid ${DarkGray};
  cursor: pointer;
`;

export const SetNameInput = styled.input`
  min-width: 30%;
  height: 3rem;
  padding: 0.25rem 1rem;
  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: ${({ disabled }) => (disabled ? lightGrayWhite : 'white')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'auto')};
  font-family: 'Pretendard';
`;

export const SetInfoWrpper = styled.div`
  flex-basis: 100%;

  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const SetTag = styled.label`
  width: auto;
  min-width: 5rem;
  height: 3rem;
  padding: 0.5rem;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: white;
  text-align: center;
  line-height: 2rem;
  cursor: pointer;
`;
export const SetTagInput = styled.input`
  display: none;

  &:checked + ${SetTag} {
    background-color: ${pointColor};
  }
`;

export const TextArea = styled.textarea`
  flex-basis: 100%;
  width: 100%;
  height: 7rem;
  padding: 1rem;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  font-family: 'Pretendard';
  resize: none;
`;
