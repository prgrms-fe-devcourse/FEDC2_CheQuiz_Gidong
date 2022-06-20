import Header from '@/components/Header';
import QuizForm from '@/components/QuizCreate';
import { useAuthContext } from '@/contexts/AuthContext';

function QuizCreatePage() {
  const { isAuth } = useAuthContext();
  return (
    <>
      <Header isLogin={isAuth} />
      <QuizForm />
    </>
  );
}

export default QuizCreatePage;
