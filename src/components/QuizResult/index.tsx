import { useState } from 'react';
import useInput from '@hooks/useInput';
import AnimateHeight from 'react-animate-height';
import { Quiz } from '@/interfaces/Quiz';
import { CommentAPI } from '@/interfaces/CommentAPI';
import * as UserService from '@/utils/UserServices';
import * as S from './styles';

interface QuizResultProps extends S.StyledQuizResultProps {
  quiz: Quiz;
}

function QuizResult({ quiz, correct }: QuizResultProps) {
  const [inputValue, handler, setInputValue] = useInput('');
  const [comments, setComments] = useState<CommentAPI[]>(() =>
    quiz && quiz.comments ? quiz.comments : [],
  );
  // TODO: useState에 들어갈 값 변경 필요 -> quiz likes 배열 참조할 것
  const [userLiked, setUserLiked] = useState(false);
  // TODO: useCollapse 만들기
  const [collapsed, setCollapsed] = useState(true);
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: comment validation
    UserService.createComment({ comment: inputValue, postId: quiz._id });
    setInputValue('');
  };

  return (
    <S.Box>
      <S.Header collapsed={collapsed}>
        <S.HeaderLeft>
          <S.Sign reverse={false} color={correct ? 'blue' : 'red'}>
            {correct ? 'O' : 'X'}
          </S.Sign>
          <S.Sign reverse={false} color="default">
            Q.
          </S.Sign>
          <S.Text>{quiz.question}</S.Text>
        </S.HeaderLeft>
        <S.HeaderRight>
          <button type="button" onClick={() => setCollapsed((prev) => !prev)}>
            Toggle
          </button>
          <button type="button">좋아요 {quiz.likes.length}</button>
          <button type="button">댓글 {comments.length}</button>
        </S.HeaderRight>
      </S.Header>
      <AnimateHeight duration={350} height={collapsed ? 0 : 'auto'}>
        <S.Container>
          <S.Description>
            <S.Sign reverse color={quiz.answer === 'true' ? 'blue' : 'red'}>
              {quiz.answer === 'true' ? 'O' : 'X'}
            </S.Sign>
            <div>{quiz.answerDescription}</div>
          </S.Description>
          <S.Wrapper>
            <form onSubmit={handleCommentSubmit}>
              <h3>comment 작성하기</h3>
              <S.Flex>
                <S.ProfileImage>작성자 사진</S.ProfileImage>
                <S.InputWrapper>
                  <S.Input type="text" value={inputValue} onChange={handler} />
                </S.InputWrapper>

                {/** TODO: disabled when loading */}
                <S.Button type="submit" color="point">
                  댓글 쓰기
                </S.Button>
              </S.Flex>
            </form>
          </S.Wrapper>
          <h1>{comments.length ? '코멘트 보기' : '코멘트가 없습니다.'}</h1>
          {comments.map((comment) => (
            <S.Comment key={comment._id}>
              <S.ProfileImage>작성자 사진</S.ProfileImage>
              <S.CommentCenter>
                <div>
                  <S.Text>작성자: {comment.author.fullName}</S.Text>
                </div>
                <div>
                  <S.Text>내용: {comment.comment}</S.Text>
                </div>
              </S.CommentCenter>
              <div>날짜: {comment.createdAt}</div>
              {/** TODO: 내가 작성한 댓글은 지울 수 있도록 로직 처리 */}
            </S.Comment>
          ))}
        </S.Container>
      </AnimateHeight>
    </S.Box>
  );
}

export default QuizResult;
