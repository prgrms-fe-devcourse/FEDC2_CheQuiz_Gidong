/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';

import { fetchPosts } from '@/api/user';
import QuizModal from '@/components/Modal/QuizModal';

import TabItem from '../UserInfoTabItem';
import UserQuizItem from '../UserQuizItem';

import * as S from './styles';

import type { PostAPIUserInfo } from '@/interfaces/PostAPI';
import type { UserQuizType } from '@/interfaces/UserAPI';

const UserInfoTab = ({ id }: { id: string }) => {
  const [madeQuizzes, setMadeQuizzes] = useState([]);
  const [commentedQuizzes, setCommentedQuizzes] = useState([]);
  const [likedQuizzes, setLikedQuizzes] = useState([]);
  const [allQuizzes, setAllQuizzes] = useState([]);

  const [currentTab, setCurrentTab] = useState(0);

  const [currentQuiz, setCurrentQuiz] = useState({} as UserQuizType);
  const [isModalShown, setIsModalShown] = useState(false);

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
      setAllQuizzes(realData);

      const userMadeQuizzes = realData.filter(
        (quiz: UserQuizType) => quiz.author._id === id
      );

      const userCommentQuizzes = realData.filter((quiz: UserQuizType) =>
        quiz.comments.some((comment) => comment.author._id === id)
      );
      const userLikesQuizzes = realData.filter((quiz: UserQuizType) =>
        quiz.likes.some((like) => like.user === id)
      );
      setMadeQuizzes(userMadeQuizzes);
      setCommentedQuizzes(userCommentQuizzes);
      setLikedQuizzes(userLikesQuizzes);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateAllQuiz();
  }, [id]);
  const updateSelectedQuiz = (quizId: string) => {
    const selectedQuiz = allQuizzes.find(
      (quiz: UserQuizType) => quiz.id === quizId
    );
    if (selectedQuiz) {
      setCurrentQuiz(selectedQuiz);
      setIsModalShown(true);
    }
  };

  const updateClickedTab = (tabId: number) => {
    setCurrentTab(tabId);
  };
  return (
    <S.TabWrapper>
      <QuizModal
        isShown={isModalShown}
        quiz={currentQuiz}
        onClose={() => setIsModalShown(false)}
      />
      <S.TabMenus>
        <S.TabItemContainer>
          {tabs.map((tab) => (
            <TabItem
              key={tab.id}
              selected={tab.id === currentTab}
              title={tab.title}
              handleClick={() => {
                updateClickedTab(tab.id);
              }}
            />
          ))}
        </S.TabItemContainer>
      </S.TabMenus>

      <S.TabContent>
        <S.UserQuizContainer>
          {tabMapper[currentTab].map((quiz: UserQuizType) => (
            <UserQuizItem
              key={quiz.id}
              commentCount={quiz.comments.length}
              handleClick={() => updateSelectedQuiz(quiz.id)}
              likeCount={quiz.likes.length}
              question={quiz.question}
            />
          ))}
        </S.UserQuizContainer>
      </S.TabContent>
    </S.TabWrapper>
  );
};

export default UserInfoTab;
