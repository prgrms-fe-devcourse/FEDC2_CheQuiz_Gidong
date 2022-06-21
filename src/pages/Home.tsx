import RandomQuiz from '@/components/Home/RandomQuiz';
import QuizSetList from '@/components/Home/QuizSetList';
import Header from '@/components/Header';

function Home() {
  return (
    <>
      <Header />
      <RandomQuiz />
      <QuizSetList />
    </>
  );
}

export default Home;
