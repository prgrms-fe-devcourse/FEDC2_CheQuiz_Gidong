import { useEffect, useState } from 'react';
import { fetchPosts } from '@/api/user';
import * as S from './styles';
import { PostAPIUserInfo } from '@/interfaces/PostAPI';
import { UserQuizType } from '@/interfaces/UserAPI';

function UserInfoTab({ id }: { id: string }) {
  const [madeQuizzes, setMadeQuizzes] = useState([]);
  const [commentedQuizzes, setCommentedQuizzes] = useState([]);
  const [likedQuizzes, setLikedQuizzes] = useState([]);

  useEffect(() => {
    const updateAllQuiz = async () => {
      const apiData = await fetchPosts();
      const realData = apiData.map((post: PostAPIUserInfo) => ({
        id: post._id,
        likes: post.likes,
        comments: post.comments,
        author: post.author,
        ...JSON.parse(post.title),
      }));

      const userMadeQuizzes = realData.filter(
        (quiz: UserQuizType) => quiz.author._id === id,
      );

      const userCommentQuizzes = realData.filter((quiz: UserQuizType) => {
        const userCommentIndex = quiz.comments.findIndex((comment) => {
          return comment.author._id === id;
        });
        const isUserComment = userCommentIndex !== -1;
        return isUserComment;
      });

      const userLikesQuizzes = realData.filter((quiz: UserQuizType) => {
        const userLikesIndex = quiz.likes.findIndex((like) => {
          return like.user === id;
        });
        const isUserLiked = userLikesIndex !== -1;
        return isUserLiked;
      });

      setMadeQuizzes(userMadeQuizzes);
      setCommentedQuizzes(userCommentQuizzes);
      setLikedQuizzes(userLikesQuizzes);
    };

    updateAllQuiz();
  }, [id]);
  return (
    <S.TabWrapper>
      <S.TabItemContainer>
        <S.TabItem selected>만든 문제</S.TabItem>
        <S.TabItem>댓글 단 문제</S.TabItem>
        <S.TabItem>좋아요 한 문제</S.TabItem>
      </S.TabItemContainer>

      <S.TabContent>
        <S.ButtonWrapper>
          <S.Button color="#5B9785">퀴즈 수정</S.Button>
          <S.Button color="#CE4C4C">퀴즈 삭제</S.Button>
        </S.ButtonWrapper>
      </S.TabContent>
    </S.TabWrapper>
  );
}

export default UserInfoTab;
