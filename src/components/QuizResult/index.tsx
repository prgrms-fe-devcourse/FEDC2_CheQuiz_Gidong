import { useState } from 'react';
import useInput from '@hooks/useInput';
import AnimateHeight from 'react-animate-height';
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
  // TODO: useCollapse 만들기
  const [collapsed, setCollapsed] = useState(true);
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: comment validation
    UserService.createComment({ comment: inputValue, postId: quiz._id });
    setInputValue('');
  };

  return (
    <Styled.Box>
      <Styled.Header collapsed={collapsed}>
        <Styled.HeaderLeft>
          <Styled.Sign reverse={false} color={correct ? 'blue' : 'red'}>
            {correct ? 'O' : 'X'}
          </Styled.Sign>
          <Styled.Sign reverse={false} color="default">
            Q.
          </Styled.Sign>
          <Styled.Text>{quiz.question}</Styled.Text>
        </Styled.HeaderLeft>
        <Styled.HeaderRight>
          <button type="button" onClick={() => setCollapsed((prev) => !prev)}>
            Toggle
          </button>
          <button type="button">좋아요 {quiz.likes.length}</button>
          <button type="button">댓글</button>
        </Styled.HeaderRight>
      </Styled.Header>
      <AnimateHeight duration={350} height={collapsed ? 0 : 'auto'}>
        <Styled.Container>
          <Styled.Description>
            <Styled.Sign
              reverse
              color={quiz.answer === 'true' ? 'blue' : 'red'}
            >
              {quiz.answer === 'true' ? 'O' : 'X'}
            </Styled.Sign>
            <div>{quiz.answerDescription}</div>
          </Styled.Description>
          <Styled.Wrapper>
            <form onSubmit={handleCommentSubmit}>
              <h3>comment 작성하기</h3>
              <Styled.Flex>
                <Styled.ProfileImage>작성자 사진</Styled.ProfileImage>
                <Styled.InputWrapper>
                  <Styled.Input
                    type="text"
                    value={inputValue}
                    onChange={handler}
                  />
                </Styled.InputWrapper>

                {/** TODO: disabled when loading */}
                <Styled.Button type="submit" color="point">
                  댓글 쓰기
                </Styled.Button>
              </Styled.Flex>
            </form>
          </Styled.Wrapper>
          <h1>comment 보기</h1>
          {comments.map((comment) => (
            <Styled.Comment key={comment._id}>
              <Styled.ProfileImage>작성자 사진</Styled.ProfileImage>
              <Styled.CommentCenter>
                <div>
                  <Styled.Text>작성자: {comment.author.fullName}</Styled.Text>
                </div>
                <div>
                  <Styled.Text>내용: {comment.comment}</Styled.Text>
                </div>
              </Styled.CommentCenter>
              <div>날짜: {comment.createdAt}</div>
              {/** TODO: 내가 작성한 댓글은 지울 수 있도록 로직 처리 */}
            </Styled.Comment>
          ))}
        </Styled.Container>
      </AnimateHeight>
    </Styled.Box>
  );
}

export default QuizResult;
