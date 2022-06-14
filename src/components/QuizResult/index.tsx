import { useState } from 'react';
import useInput from '@hooks/useInput';
import { Quiz } from '@/interfaces/Quiz';
import { CommentAPI } from '@/interfaces/CommentAPI';
import * as UserService from '@/utils/UserServices';
import * as Styled from './styles';

interface QuizResultProps extends Styled.StyledQuizResultProps {
  quiz: Quiz;
}

function QuizResult({ quiz, correct }: QuizResultProps) {
  const [inputValue, handler, setInputValue] = useInput('');
  const [comments, setComments] = useState<CommentAPI[]>(() =>
    quiz && quiz.comments ? quiz.comments : [],
  );
  // TODO: useState에 들어갈 값 변경 필요 -> quiz likes 배열 참조할 것
  const [userLiked, setUserLiked] = useState(false);
  const [commentOpened, setCommentOpened] = useState(false);
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: comment validation
    UserService.createComment({ comment: inputValue, postId: quiz._id });
    setInputValue('');
  };

  return (
    <Styled.StyledQuizResult>
      <Styled.Title>
        <Styled.TitleLeft>
          <Styled.CorrectOrWrong correct={correct}>
            {correct ? 'O' : 'X'}
          </Styled.CorrectOrWrong>
          <Styled.Sign>Q.</Styled.Sign>
          <Styled.Question>{quiz.question}</Styled.Question>
        </Styled.TitleLeft>
        <Styled.TitleRight>
          <button type="button">좋아요</button>
          <button type="button">댓글</button>
        </Styled.TitleRight>
      </Styled.Title>
      <Styled.Container>
        <div>A: {quiz.answer}</div>
        <div>Description: {quiz.answerDescription}</div>
        <div>좋아요 {quiz.likes.length}</div>
        <form onSubmit={handleCommentSubmit}>
          <h3>comment 작성하기</h3>
          <input type="text" value={inputValue} onChange={handler} />
          <button type="submit">댓글 쓰기</button>
        </form>
        <h1>comment 보기</h1>
        {comments.map((comment) => (
          <Styled.Comment key={comment._id}>
            <Styled.CommentProfile>작성자 사진</Styled.CommentProfile>
            <Styled.CommentCenter>
              <div>작성자: {comment.author.fullName}</div>
              <div>내용: {comment.comment}</div>
            </Styled.CommentCenter>
            <div>날짜: {comment.createdAt}</div>
            {/** TODO: 내가 작성한 댓글은 지울 수 있도록 로직 처리 */}
          </Styled.Comment>
        ))}
      </Styled.Container>
    </Styled.StyledQuizResult>
  );
}

export default QuizResult;
