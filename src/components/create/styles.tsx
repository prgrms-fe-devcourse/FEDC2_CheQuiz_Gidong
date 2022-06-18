import styled from '@emotion/styled';
import {
  blackGray,
  DarkGray,
  lightGrayWhite,
  pointColor,
  small,
  white,
} from '@/styles/theme';

export const FormContainer = styled.form`
  width: 100%;
  margin-top: 7rem;
`;
//* SetForm
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

//* QuizListForm
export const QuizListContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

export const InsertQuizItem = styled.button`
  height: 7.5rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 1rem;

  border: 3px dashed ${DarkGray};
  border-bottom: none;
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: ${white};

  ${small};
  color: ${blackGray};
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;

  width: 7.5rem;
  height: 3rem;

  border: 3px solid ${DarkGray};
  border-radius: 0.5rem;
  background-color: ${pointColor};
  text-align: center;
  font-family: 'MaplestoryOTFBold', sans-serif !important;
  cursor: pointer;
`;
