import { useMemo, useState } from 'react';
import useInput from '@hooks/useInput';
import AnimateHeight from 'react-animate-height';
import { Quiz } from '@/interfaces/Quiz';
import { CommentAPI } from '@/interfaces/CommentAPI';
import { useAuthContext } from '@/contexts/AuthContext';
import * as UserService from '@/api/UserServices';
import * as S from './styles';
import { LikeAPI } from '@/interfaces/LikeAPI';
import dateFormat from '@/utils/dateFormat';
import { getUserImageByPoints } from '@/utils/getUserImage';
import { UserQuizInfo, UserAPI } from '@/interfaces/UserAPI';

interface QuizResultProps extends S.StyledQuizResultProps {
  quiz: Quiz;
}

function QuizResult({ quiz, correct }: QuizResultProps) {
  const { user } = useAuthContext();
  const [inputValue, handler, setInputValue] = useInput('');
  const [comments, setComments] = useState<CommentAPI[]>(() =>
    quiz && quiz.comments ? quiz.comments : [],
  );
  const [likes, setLikes] = useState<LikeAPI[]>(() =>
    quiz && quiz.likes ? quiz.likes : [],
  );
  const [collapsed, setCollapsed] = useState(true);
  const isLoggedIn = useMemo(
    () => JSON.stringify(user) !== '{}' || !user,
    [user],
  )!;
  const isUserLiked = useMemo(
    () => !!(user._id && likes.map((like) => like.user).includes(user._id)),
    [likes, user._id],
  );
  const findLike = () => likes.find((like) => like.user === user._id);

  const getUserPoints = (currentUser: UserAPI) => {
    const { points } = JSON.parse(currentUser.username || '{}') as UserQuizInfo;
    return points;
  };

  const postComment = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: alert를 toast로 변경
    if (!isLoggedIn) {
      window.alert('로그인이 필요합니다.');
      return;
    }
    if (!inputValue.trim()) {
      window.alert('1글자 이상 작성해야 합니다.');
      return;
    }
    try {
      const newComment = await UserService.createComment({
        comment: inputValue,
        postId: quiz._id,
      });

      setComments((prev) => [...prev, newComment]);
      setInputValue('');
    } catch (error) {
      console.log(error);
      window.alert('문제가 생겨 댓글을 작성할 수 없습니다.');
      throw new Error('error occured at postComment.');
    }
  };

  const deleteComment = async (id: string) => {
    try {
      await UserService.deleteComment(id);
      setComments((prev) => prev.filter((comment) => comment._id !== id));
    } catch (error) {
      window.alert('문제가 생겨 댓글을 삭제할 수 없습니다.');
      throw new Error('error occured at deleteComment.');
    }
  };

  const likePost = async () => {
    try {
      const like = await UserService.like(quiz._id);
      setLikes((prev) => [...prev, like]);
    } catch (error) {
      window.alert('문제가 생겨 좋아요할 수 없습니다.');
      throw new Error('error occured at likePost.');
    }
  };

  const cancelLikePost = async () => {
    try {
      const like = findLike();
      if (!like) return;
      await UserService.cancelLike(like._id);
      setLikes((prev) => prev.filter((prevLike) => prevLike._id !== like._id));
    } catch (error) {
      window.alert('문제가 생겨 좋아요 취소할 수 없습니다.');
      throw new Error('error occured at cancelLikePost.');
    }
  };

  const handleLikePost = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (isUserLiked) cancelLikePost();
    else likePost();
  };

  return (
    <S.Box>
      <S.Header>
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
          <button type="button" onClick={handleLikePost}>
            {!isUserLiked ? '좋아요' : '좋아요 취소'} {likes.length}
          </button>
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
            <form onSubmit={postComment}>
              <h3>comment 작성하기</h3>
              <S.Flex>
                <S.ImageWrapper>
                  <S.UserImage
                    src={getUserImageByPoints(getUserPoints(user))}
                  />
                </S.ImageWrapper>
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
                <S.Button type="submit" color="point" disabled={!isLoggedIn}>
                  댓글 쓰기
                </S.Button>
              </S.Flex>
            </form>
          </S.Wrapper>
          <h1>{comments.length ? '코멘트 보기' : '코멘트가 없습니다.'}</h1>
          {comments.map((comment) => (
            <S.Comment key={comment._id}>
              <S.ImageWrapper>
                <S.UserImage
                  src={getUserImageByPoints(getUserPoints(comment.author))}
                />
              </S.ImageWrapper>
              <S.CommentCenter>
                <div>
                  <S.Text>작성자: {comment.author.fullName}</S.Text>
                </div>
                <div>
                  <S.Text>내용: {comment.comment}</S.Text>
                </div>
              </S.CommentCenter>
              <div>
                <div>{dateFormat(comment.createdAt)}</div>
                {comment.author._id === user._id ? (
                  <S.Button
                    type="button"
                    fullWidth
                    onClick={() => deleteComment(comment._id)}
                  >
                    삭제하기
                  </S.Button>
                ) : null}
              </div>
            </S.Comment>
          ))}
        </S.Container>
      </AnimateHeight>
    </S.Box>
  );
}

export default QuizResult;
