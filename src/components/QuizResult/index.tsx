import useInput from '@hooks/useInput';
import styled from '@emotion/styled';
import { Quiz } from '@/interfaces/Quiz';

interface StyledQuizResultProps {
  correct: boolean;
}

interface QuizResultProps extends StyledQuizResultProps {
  quiz: Quiz;
}

const StyledQuizResult = styled.div`
  border: 1px solid black;
`;

const CorrectOrWrong = styled.div<StyledQuizResultProps>`
  color: ${({ correct }) => (correct ? 'royalblue' : 'tomato')};
  font-weight: bold;
`;

const StyledComment = styled.div`
  border: 1px solid black;
`;

function QuizResult({ quiz, correct }: QuizResultProps) {
  const [inputValue, handler, setInputValue] = useInput('');
  // TODO: comment validation 필요
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputValue('');
  };
  return (
    <StyledQuizResult>
      <div>Q: {quiz.question}</div>
      <div>A: {quiz.answer}</div>
      <CorrectOrWrong correct={correct}>
        {correct ? '맞았음' : '틀렸음'}
      </CorrectOrWrong>
      <div>Description: {quiz.answerDescription}</div>
      <div>좋아요 {quiz.likes.length}</div>
      <form onSubmit={handleCommentSubmit}>
        <h3>comment 작성하기</h3>
        <input type="text" value={inputValue} onChange={handler} />
        <button type="submit">댓글 쓰기</button>
      </form>
      <div>
        <h1>comment 보기</h1>
        {quiz.comments.map((comment) => (
          <StyledComment key={comment._id}>
            <div>내용: {comment.comment}</div>
            <div>작성자: {comment.author.fullName}</div>
            <div>날짜: {comment.createdAt}</div>
            {/** TODO: 내가 작성한 댓글은 지울 수 있도록 로직 처리 */}
          </StyledComment>
        ))}
      </div>
    </StyledQuizResult>
  );
}

export default QuizResult;
