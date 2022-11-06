import type { ButtonHTMLAttributes } from 'react';

import styled from '@emotion/styled';

const QuizSubmitArea = ({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <FlexWrapper>
    <SubmitButton
      type='submit'
      {...props}
    >
      제출
    </SubmitButton>
  </FlexWrapper>
);

export default QuizSubmitArea;

// TODO - 정의된 style로 변경하기
const SubmitButton = styled.button({
  width: '25%',
  padding: '0.5rem 1rem',
  border: `3px solid #14213D`,
  borderRadius: '0.5rem',
  backgroundColor: 'royalblue',
  fontSize: '1.5rem',
  color: '#ffffff',
  outline: 'none',
  cursor: 'pointer',
  userSelect: 'none',
  '&:disabled': {
    backgroundColor: '#ababab',
    color: '#787878',
    cursor: 'not-allowed',
  },
});

const FlexWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  gap: '2.5rem',
});
