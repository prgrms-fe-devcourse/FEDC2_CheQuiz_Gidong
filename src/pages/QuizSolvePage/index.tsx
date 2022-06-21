import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Quiz from '@components/Quiz';
import { Redirect, useHistory } from 'react-router';
import Slider from 'react-slick';
import { v4 } from 'uuid';
import { POINTS, POST_IDS, USER_ANSWERS } from '@/constants';
import * as QuizServices from '@/api/QuizServices';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderButton from './SliderButton';
import { Quiz as QuizInterface } from '@/interfaces/Quiz';
import * as S from './styles';
import { useAuthContext } from '@/contexts/AuthContext';
import { UserQuizInfo } from '@/interfaces/UserAPI';
import { updateTotalPoint } from '@/api/UserServices';
import { useQuizContext } from '@/contexts/QuizContext';

function QuizSolvePage() {
  const history = useHistory();
  const sliderRef = useRef<Slider | null>(null);
  const { user, setUser, isAuth } = useAuthContext();
  const { channelId, randomQuizCount } = useQuizContext();

  const [quizzes, setQuizzes] = useState<QuizInterface[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleUserAnswers = useCallback((index: number, value: string) => {
    setUserAnswers((prev) =>
      prev.map((answer, idx) => (idx === index ? value : answer)),
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
        JSON.stringify(quizzes.map((quiz) => quiz._id)),
      );

      // 로그인했다면, 사용자의 점수를 반영
      if (isAuth) {
        await updateUserPoint();
      }

      history.push('/result');
    },
    [history, isAuth, quizzes, updateUserPoint, userAnswers],
  );

  // Slider Options
  const settings = useMemo(() => {
    return {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: '40px',
      arrows: true,
      beforeChange: (oldIndex: number, newIndex: number) => {
        setCurrentIndex(newIndex);
      },
    };
  }, []);

  useEffect(() => {
    // initialize
    sessionStorage.removeItem(POST_IDS);
    sessionStorage.removeItem(USER_ANSWERS);
    sessionStorage.removeItem(POINTS);

    const next = (quizArray: QuizInterface[]) => {
      setQuizzes(quizArray);
      setUserAnswers(Array(quizArray.length).fill(''));
    };

    if (randomQuizCount && randomQuizCount > 0)
      QuizServices.getShuffledQuizzes(randomQuizCount).then((quizArray) =>
        next(quizArray),
      );
    else if (channelId)
      QuizServices.getQuizzesFromChannel(channelId).then((quizArray) =>
        next(quizArray),
      );
    setLoading(false);
  }, [channelId, quizzes.length, randomQuizCount, setUserAnswers]);

  if (loading) return null;
  if (!(channelId || randomQuizCount)) {
    return <Redirect to="/error" />;
  }
  return (
    <form onSubmit={handleSubmit}>
      <S.QuizSolvePage>
        <S.Wrapper justify="center">
          <S.Box>
            {currentIndex + 1} / {quizzes.length}
          </S.Box>
        </S.Wrapper>
        <S.Wrapper justify="between" margin="1rem 0" align="center">
          <SliderButton
            type="button"
            color="point"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            prev
          </SliderButton>
          <SliderButton
            type="button"
            color="point"
            onClick={() => sliderRef.current?.slickNext()}
          >
            next
          </SliderButton>
        </S.Wrapper>
        <Slider
          {...settings}
          ref={(slider) => {
            sliderRef.current = slider;
          }}
        >
          {quizzes.map((quiz, index) => (
            <Quiz
              quiz={quiz}
              key={quiz._id}
              index={index}
              onChangeUserAnswer={handleUserAnswers}
            />
          ))}
        </Slider>
        <S.Wrapper gap="2.5rem" justify="center">
          <S.SelectButton
            type="submit"
            disabled={
              userAnswers.filter((answer) => answer).length < quizzes.length
            }
          >
            제출
          </S.SelectButton>
        </S.Wrapper>
      </S.QuizSolvePage>
    </form>
  );
}

export default QuizSolvePage;
