import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Quiz from '@components/Quiz';
import { useHistory } from 'react-router';
import Slider from 'react-slick';
import { POST_IDS, USER_ANSWERS } from '@/common/string';
import * as QuizServices from '@/api/QuizServices';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderButton from './SliderButton';
import { Quiz as QuizInterface } from '@/interfaces/Quiz';
import * as S from './styles';

function QuizSolvePage(): JSX.Element {
  const history = useHistory();
  const sliderRef = useRef<Slider | null>(null);

  // TODO: 추후 ContextAPI로 관리할 예정
  const quizLength = useRef(6);
  const [quizzes, setQuizzes] = useState<QuizInterface[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(quizLength.current).fill(''),
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUserAnswers = useCallback((index: number, value: string) => {
    setUserAnswers((prev) =>
      prev.map((answer, idx) => (idx === index ? value : answer)),
    );
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
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
      history.push('/result');
    },
    [history, quizzes, userAnswers],
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

    const fetchRandomQuizzes = async () => {
      try {
        const shuffledQuizzes = await QuizServices.getShuffledQuizzes(
          quizLength.current,
        );
        return shuffledQuizzes;
      } catch (error) {
        throw Error('error occured at fetchRandomQuizzes.');
      }
    };

    const fetchQuizzesFromChannel = async () => {
      // TODO: sessionStorage에 channelId 저장 필요
      try {
        const quizzesFromChannel = await QuizServices.getQuizzesFromChannel(
          'CheQuiz',
        );
        return quizzesFromChannel;
      } catch (error) {
        throw Error('error occured at fetchQuizzesFromChannel.');
      }
    };

    const next = (quizArray: QuizInterface[]) => {
      setQuizzes(quizArray);
      setUserAnswers(Array(quizArray.length).fill(''));
    };

    fetchRandomQuizzes().then((quizArray) => next(quizArray));
  }, [quizzes.length, setUserAnswers]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
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
      </div>
    </form>
  );
}

export default QuizSolvePage;
