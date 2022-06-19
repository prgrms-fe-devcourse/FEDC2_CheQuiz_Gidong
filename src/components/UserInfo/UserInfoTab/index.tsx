import { useEffect, useState } from 'react';
import { fetchPosts } from '@/api/user';
import * as S from './styles';
import { PostAPIUserInfo } from '@/interfaces/PostAPI';
import { UserQuizType } from '@/interfaces/UserAPI';
import UserQuizItem from '../UserQuizItem';
import TabItem from '../UserInfoTabItem';

function UserInfoTab({ id }: { id: string }) {
  const [madeQuizzes, setMadeQuizzes] = useState([]);
  const [commentedQuizzes, setCommentedQuizzes] = useState([]);
  const [likedQuizzes, setLikedQuizzes] = useState([]);

  const [currentTab, setCurrentTab] = useState(0);

  const tabMapper = [madeQuizzes, commentedQuizzes, likedQuizzes];

  const tabs = [
    {
      id: 0,
      title: '만든 문제',
    },
    {
      id: 1,
      title: '댓글 단 문제',
    },
    {
      id: 2,
      title: '좋아요 한 문제',
    },
  ];

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

  const updateClickedTab = (tabId: number) => {
    setCurrentTab(tabId);
  };
  return (
    <S.TabWrapper>
      <S.TabMenus>
        <S.TabItemContainer>
          {tabs.map((tab) => (
            <TabItem
              key={tab.id}
              title={tab.title}
              selected={tab.id === currentTab}
              handleClick={() => {
                updateClickedTab(tab.id);
              }}
            />
          ))}
        </S.TabItemContainer>
        <S.ButtonWrapper>
          <S.Button color="#5B9785">퀴즈 수정</S.Button>
          <S.Button color="#CE4C4C">퀴즈 삭제</S.Button>
        </S.ButtonWrapper>
      </S.TabMenus>

      <S.TabContent>
        <S.UserQuizContainer>
          {tabMapper[currentTab].map((quiz: UserQuizType) => (
            <UserQuizItem
              key={quiz.id}
              question={quiz.question}
              likeCount={quiz.likes.length}
              commentCount={quiz.comments.length}
            />
          ))}
        </S.UserQuizContainer>
      </S.TabContent>
    </S.TabWrapper>
  );
}

export default UserInfoTab;
