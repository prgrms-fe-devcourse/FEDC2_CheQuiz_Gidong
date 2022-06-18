import { useState } from 'react';
import useInput from '@hooks/useInput';
import AnimateHeight from 'react-animate-height';
import { Quiz } from '@/interfaces/Quiz';
import { CommentAPI } from '@/interfaces/CommentAPI';
import { useAuthContext } from '@/contexts/AuthContext';
import * as UserService from '@/utils/UserServices';
import * as S from './styles';

interface QuizResultProps extends S.StyledQuizResultProps {
  quiz: Quiz;
}

function QuizResult({ quiz, correct }: QuizResultProps) {
  const { user } = useAuthContext();
  const [inputValue, handler, setInputValue] = useInput('');
  const [comments, setComments] = useState<CommentAPI[]>(() =>
    quiz && quiz.comments ? quiz.comments : [],
  );
  // TODO: TEST 필요
  const [userLiked, setUserLiked] = useState(
    () => user._id && quiz.likes.map((like) => like.user).includes(user._id),
  );
  // TODO: useCollapse 만들기
  const [collapsed, setCollapsed] = useState(true);
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: alert를 toast로 변경
    if (!inputValue.trim()) alert('1글자 이상 작성해야 합니다.');

    const newComment = await UserService.createComment({
      comment: inputValue,
      postId: quiz._id,
    });
    console.log(newComment);
    setInputValue('');
  };

  const isLoggedIn = !(JSON.stringify(user) === '{}' || !user);

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
                  <S.Input
                    type="text"
                    value={inputValue}
                    onChange={handler}
                    placeholder={
                      isLoggedIn ? '댓글을 남겨보세요.' : '로그인해야 합니다.'
                    }
                    disabled={!isLoggedIn}
                  />
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
