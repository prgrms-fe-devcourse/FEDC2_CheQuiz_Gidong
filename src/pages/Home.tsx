import Header from '@/components/Header';
import QuizSetList from '@/components/Home/QuizSetList';
import RandomQuiz from '@/components/Home/RandomQuiz';

const Home = () => {
  return (
    <>
      <Header />
      <RandomQuiz />
      <QuizSetList />
    </>
  );
};

export default Home;
