import React, { useCallback, useEffect, useState } from 'react';
import QuizBox from '@components/Quiz';
import { useHistory } from 'react-router';
import Slider from 'react-slick';
import { POST_IDS, USER_ANSWERS } from '@/common/string';
import QuizMockData from '@/assets/QuizMockData';
import * as QuizServices from '@/utils/QuizServices';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderButton from './SliderButton';

function QuizSolvePage(): JSX.Element {
  const history = useHistory();
  // TODO: 추후 api 연결 필요 및 sessionStorage에 저장 필요
  const [quizzes, setQuizzes] = useState(QuizMockData);
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(quizzes.length).fill(''),
  );
  const [storedPostIds, setStoredPostIds] = useState<string[]>([]);

  // ANCHOR: 캐러셀에서 현재 노출될 퀴스 인덱스를 결정함
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index <= quizzes.length) setCurrentIndex(() => index);
    },
    [quizzes.length],
  );

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
      // user 답 sessionStorage에 저장
      // postId 저장하기
      sessionStorage.setItem(USER_ANSWERS, JSON.stringify(userAnswers));
      sessionStorage.setItem(POST_IDS, JSON.stringify(storedPostIds));
      // TODO: remove test logic after merge
      console.log(QuizServices.caculateScore(quizzes, userAnswers));

      // TODO: history.push로 route 이동하기
      history.push('/result');
    },
    [history, quizzes, storedPostIds, userAnswers],
  );

  useEffect(() => {
    // NOTE: 초기화
    setStoredPostIds([]);

    // if user request random quizzes
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
    // fetchRandomQuizzes();
    fetchQuizzesFromChannel();
  }, [quizzes.length, setStoredPostIds, setUserAnswers]);

  // slider options
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: '40px',
    nextArrow: <SliderButton color="point" />,
    prevArrow: <SliderButton color="point" />,
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {currentIndex + 1}/{quizzes.length}
      </div>
      <Slider {...settings}>
        {quizzes.map((quiz, index) => (
          <QuizBox
            quiz={quiz}
            key={quiz._id}
            index={index}
            onChangeUserAnswer={handleUserAnswers}
          />
        ))}
      </Slider>

      <button
        type="button"
        disabled={currentIndex <= 0}
        onClick={() => handleIndex(currentIndex - 1)}
      >
        이전 문제
      </button>
      <button
        type="button"
        disabled={currentIndex >= quizzes.length - 1}
        onClick={() => handleIndex(currentIndex + 1)}
      >
        다음 문제
      </button>
      {currentIndex === quizzes.length - 1 && (
        <button
          type="submit"
          disabled={
            userAnswers.filter((answer) => answer).length < quizzes.length
          }
        >
          제출
        </button>
      )}
    </form>
  );
}

export default QuizSolvePage;
