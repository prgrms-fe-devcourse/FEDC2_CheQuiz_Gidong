import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Redirect, useHistory } from 'react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { v4 } from 'uuid';

import * as QuizServices from '@/api/QuizServices';
import { updateTotalPoint } from '@/api/UserServices';
import Icon from '@/components/Icon';
import { POINTS, POST_IDS, USER_ANSWERS } from '@/constants';
import { useAuthContext } from '@/contexts/AuthContext';
import { useQuizContext } from '@/contexts/QuizContext';
import Quiz from '@components/Quiz';
import { useQuiz } from '@hooks/useQuiz';

import SliderButton from './SliderButton';
import * as S from './styles';

import type { UserQuizInfo } from '@/interfaces/UserAPI';

const QuizSolvePage = () => {
  const history = useHistory();
  const sliderRef = useRef<Slider | null>(null);
  const { user, setUser, isAuth } = useAuthContext();
  const { channelId, randomQuizCount, setChannelId, setRandomQuizCount } =
    useQuizContext();

  const { quizzes, getRandomQuizzes, getQuizzesFromQuizset } = useQuiz();
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(10).fill(''));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleUserAnswers = useCallback((index: number, value: string) => {
    setUserAnswers((prev) =>
      prev.map((answer, idx) => (idx === index ? value : answer))
    );
  }, []);

  const updateUserPoint = useCallback(async () => {
    try {
      const totalPoint = QuizServices.caculateScore(quizzes, userAnswers);
      sessionStorage.setItem(POINTS, JSON.stringify(totalPoint));

      const newInfo = {
        _id: v4(),
        points: totalPoint,
      };
      if (user.username) {
        const prevUserInfo = JSON.parse(user.username) as UserQuizInfo;
        if (prevUserInfo._id) newInfo._id = prevUserInfo._id;
        if (prevUserInfo.points)
          newInfo.points = totalPoint + prevUserInfo.points;
      }
      const newUserInfo = await updateTotalPoint({
        fullName: user.fullName,
        username: newInfo,
      });
      setUser(newUserInfo);
    } catch (error) {
      console.log('error occured at updateUserPoint.');
    }
  }, [quizzes, setUser, user.fullName, user.username, userAnswers]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      // validation
      if (quizzes.length !== userAnswers.filter((answer) => answer).length) {
        console.log('올바르지 않은 동작입니다.');
        return;
      }

      sessionStorage.setItem(USER_ANSWERS, JSON.stringify(userAnswers));
      sessionStorage.setItem(
        POST_IDS,
        JSON.stringify(quizzes.map((quiz) => quiz._id))
      );

      // 로그인했다면, 사용자의 점수를 반영
      if (isAuth) {
        await updateUserPoint();
      }

      setRandomQuizCount(null);
      setChannelId(null);

      history.push('/result');
    },
    [
      history,
      isAuth,
      quizzes,
      setChannelId,
      setRandomQuizCount,
      updateUserPoint,
      userAnswers,
    ]
  );

  // Slider Options
  const settings = useMemo(
    () => ({
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: '40px',
      arrows: false,
      beforeChange: (oldIndex: number, newIndex: number) => {
        setCurrentIndex(newIndex);
      },
    }),
    []
  );

  useEffect(() => {
    // initialize
    sessionStorage.removeItem(POST_IDS);
    sessionStorage.removeItem(USER_ANSWERS);
    sessionStorage.removeItem(POINTS);

    const fetchData = async () => {
      try {
        if (randomQuizCount && randomQuizCount > 0) {
          await getRandomQuizzes(randomQuizCount);
        } else if (channelId) {
          await getQuizzesFromQuizset(channelId);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, [
    channelId,
    getQuizzesFromQuizset,
    getRandomQuizzes,
    randomQuizCount,
    setUserAnswers,
  ]);

  if (loading) return null;
  if (!(channelId || randomQuizCount)) {
    return <Redirect to='/error' />;
  }
  return (
    <form onSubmit={handleSubmit}>
      <S.QuizSolvePage>
        <S.Wrapper justify='center'>
          <S.Box>
            {currentIndex + 1} / {quizzes.length}
          </S.Box>
        </S.Wrapper>
        <S.Wrapper justify='between'>
          <SliderButton
            color='point'
            disabled={currentIndex === 0}
            type='button'
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <Icon
              fill
              name='triangle'
              rotate={270}
              size={30}
            />
          </SliderButton>
          <S.SliderContainer>
            <Slider
              {...settings}
              ref={(slider) => {
                sliderRef.current = slider;
              }}
            >
              {quizzes.map((quiz, index) => (
                <Quiz
                  key={quiz._id}
                  index={index}
                  quiz={quiz}
                  onChangeUserAnswer={handleUserAnswers}
                />
              ))}
            </Slider>
          </S.SliderContainer>
          <SliderButton
            color='point'
            disabled={currentIndex === quizzes.length - 1}
            type='button'
            onClick={() => sliderRef.current?.slickNext()}
          >
            <Icon
              fill
              name='triangle'
              rotate={90}
              size={30}
            />
          </SliderButton>
        </S.Wrapper>
        <S.Wrapper
          gap='2.5rem'
          justify='center'
        >
          <S.SubmitButton
            type='submit'
            disabled={
              userAnswers.filter((answer) => answer).length < quizzes.length
            }
          >
            제출
          </S.SubmitButton>
        </S.Wrapper>
      </S.QuizSolvePage>
      <S.Background />
    </form>
  );
};

export default QuizSolvePage;
