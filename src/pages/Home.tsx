import RandomQuiz from '@/components/Home/RandomQuiz';
import QuizSetList from '@/components/Home/QuizSetList';
import Header from '@/components/Header';
import { useAuthContext } from '@/contexts/AuthContext';

function Home() {
  const { isAuth } = useAuthContext();
  return (
    <>
      <Header isLogin={isAuth} />
      <RandomQuiz />
      <QuizSetList />
    </>
  );
}

export default Home;
