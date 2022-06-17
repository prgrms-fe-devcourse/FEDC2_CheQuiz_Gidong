import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import QuizBox from '@components/Quiz';
import { useHistory } from 'react-router';
import Slider from 'react-slick';
import { POST_IDS, USER_ANSWERS } from '@/common/string';
import QuizMockData from '@/assets/QuizMockData';
import * as QuizServices from '@/utils/QuizServices';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderButton from './SliderButton';
import * as S from './styles';

// slider options

function QuizSolvePage(): JSX.Element {
  const history = useHistory();
  const sliderRef = useRef<Slider | null>(null);

  // TODO: 추후 api 연결 필요 및 sessionStorage에 저장 필요
  const [quizzes, setQuizzes] = useState(QuizMockData);
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(quizzes.length).fill(''),
  );
  const [storedPostIds, setStoredPostIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUserAnswers = useCallback(
    (index: number, value: string) => {
      setUserAnswers((prev) =>
        prev.map((answer, idx) => (idx === index ? value : answer)),
      );
    },
    [setUserAnswers],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // validation
      if (quizzes.length !== userAnswers.filter((answer) => answer).length) {
        console.log('올바르지 않은 동작입니다.');
        return;
      }

      // user 답 sessionStorage에 저장
      sessionStorage.setItem(USER_ANSWERS, JSON.stringify(userAnswers));
      // postId 저장하기
      sessionStorage.setItem(POST_IDS, JSON.stringify(storedPostIds));
      // TODO: remove test logic after merge
      console.log(QuizServices.caculateScore(quizzes, userAnswers));

      // TODO: history.push로 route 이동하기
      history.push('/result');
    },
    [history, quizzes, storedPostIds, userAnswers],
  );

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
    setStoredPostIds([]);
    sessionStorage.setItem(
      USER_ANSWERS,
      JSON.stringify(Array(quizzes.length).fill('')),
    );

    const fetchRandomQuizzes = async () => {
      const ids = await QuizServices.getShuffledPostIds(6);
      setStoredPostIds(ids);
      return QuizServices.getQuizzes(ids).then((response) =>
        console.log(response),
      );
    };

    const fetchQuizzesFromChannel = async () => {
      // TODO: sessionStorage에 channelId 저장 필요
      const ids = await QuizServices.getPostIdsFromChannel('CheQuiz');
      setStoredPostIds(ids);
      return QuizServices.getQuizzes(ids).then((response) =>
        console.log(response),
      );
    };

    fetchRandomQuizzes();
  }, [quizzes.length, setStoredPostIds, setUserAnswers]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <S.Wrapper justify="between" margin="1rem 0" align="center">
          <S.Wrapper padding="0.5rem 0">
            {currentIndex + 1} / {quizzes.length}
          </S.Wrapper>
          <S.Wrapper gap="0.5rem">
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
        </S.Wrapper>
        <Slider
          {...settings}
          ref={(slider) => {
            sliderRef.current = slider;
          }}
        >
          {quizzes.map((quiz, index) => (
            <QuizBox
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
      </div>
    </form>
  );
}

export default QuizSolvePage;
