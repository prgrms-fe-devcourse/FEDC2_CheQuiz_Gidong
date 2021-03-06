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
import { createNotification } from '@/api/notification';
import { theme } from '@/styles/theme';
import Icon from '@/components/Icon';

interface QuizResultProps extends S.StyledQuizResultProps {
  quiz: Quiz;
}

function QuizResult({ quiz, correct }: QuizResultProps) {
  const { user, token } = useAuthContext();
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
      createNotification(token, {
        notificationType: 'COMMENT',
        notificationTypeId: newComment._id,
        userId: quiz.author._id,
        postId: quiz._id,
      });
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
      createNotification(token, {
        notificationType: 'LIKE',
        notificationTypeId: like._id,
        userId: quiz.author._id,
        postId: quiz._id,
      });
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
    <S.Box border>
      <S.Header>
        <S.HeaderLeft>
          <S.Sign reverse={false} color={correct ? 'correct' : 'incorrect'}>
            {correct ? 'O' : 'X'}
          </S.Sign>
          <S.Sign reverse={false} color="default">
            Q.
          </S.Sign>
          <S.Text>{quiz.question}</S.Text>
        </S.HeaderLeft>
        <S.HeaderRight>
          <button type="button" onClick={() => setCollapsed((prev) => !prev)}>
            <Icon
              name="chevron-down"
              strokeWidth={3}
              rotate={collapsed ? 0 : 180}
              addStyle={{ transition: 'all 0.2s' }}
            />
          </button>
          <button type="button" onClick={handleLikePost}>
            <S.Box flex justify="center" align="center" gap="0.5rem" margin="0">
              <div>
                <Icon name="thumbs-up" fill={isUserLiked} />
              </div>
            </S.Box>
          </button>
        </S.HeaderRight>
      </S.Header>
      <AnimateHeight duration={350} height={collapsed ? 0 : 'auto'}>
        <S.Container>
          <S.Description>
            <S.Sign
              reverse
              color={quiz.answer === 'true' ? 'correct' : 'incorrect'}
            >
              {quiz.answer === 'true' ? 'O' : 'X'}
            </S.Sign>
            <div>{quiz.answerDescription}</div>
          </S.Description>
          <S.Wrapper background={theme.textAndBackGroundColor.lightGrayWhite}>
            <form onSubmit={postComment}>
              <S.Flex>
                <S.ImageWrapper>
                  <S.UserImage
                    src={getUserImageByPoints(getUserPoints(user))}
                  />
                </S.ImageWrapper>
                <S.Box flex gap="0.5rem">
                  <S.InputWrapper border background="#ffffff">
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
                </S.Box>
              </S.Flex>
            </form>
          </S.Wrapper>
          <h1>
            댓글{comments.length ? `${comments.length}개` : '이 없습니다.'}
          </h1>
          {comments.map((comment) => (
            <S.Comment key={comment._id}>
              <S.ImageWrapper>
                <S.UserImage
                  src={getUserImageByPoints(getUserPoints(comment.author))}
                />
              </S.ImageWrapper>
              <S.CommentCenter>
                <div>
                  <S.Text>{comment.author.fullName}</S.Text>
                </div>
                <div>
                  <S.Text color="#567">{comment.comment}</S.Text>
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
