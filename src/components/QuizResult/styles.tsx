import styled from '@emotion/styled';

export interface StyledQuizResultProps {
  correct: boolean;
}

export const StyledQuizResult = styled.div`
  border: 3px solid #14213d;
  border-radius: 0.5rem;
  box-sizing: border-box;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  border-bottom: 3px solid #14213d;
  box-sizing: border-box;
`;

export const TitleLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1rem;
  box-sizing: border-box;
`;

export const TitleRight = styled.div`
  display: flex;
  height: 100%;
  button {
    display: block;
    height: 100%;
    border: none;
    background-color: rgba(252, 163, 17, 0.2);
    font-weight: bold;
    outline: none;
    cursor: pointer;
    :last-of-type {
      border-top-right-radius: 0.5rem;
    }

    :hover {
      background-color: rgba(252, 163, 17, 0.3);
    }
  }
`;

export const Sign = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export const Question = styled.div`
  line-height: 1.4;
`;

export const CorrectOrWrong = styled.div<StyledQuizResultProps>`
  color: ${({ correct }) => (correct ? 'royalblue' : 'tomato')};
  font-size: 2rem;
  font-weight: bold;
`;

export const Container = styled.div`
  margin: 0 1rem;
`;

export const Comment = styled.div`
  display: flex;
  margin: 1rem 0;
  padding: 0.5rem;
  height: 5rem;
  border: 3px solid #14213d;
  border-radius: 0.5rem;
  line-height: 1.4;
  font-family: 'Pretendard';
`;

export const CommentProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  font-family: 'MaplestoryOTFLight';
`;

export const CommentCenter = styled.div`
  flex: 1;
`;
