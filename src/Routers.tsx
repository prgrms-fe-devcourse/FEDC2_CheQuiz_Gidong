import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from '@/pages/Home';
import QuizSolve from '@/pages/QuizSolve';
import QuizResultPage from '@/pages/QuizResultPage';
import AnotherLayout from '@/pages/AnotherLayout';
import Error from '@/pages/Error';

// 라우터 추가 시 path가 '/'인 메인페이지는 제일 하단에 위치시켜주세요.
function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/solve" component={QuizSolve} />
        <Route exact path="/result" component={QuizResultPage} />
        <Route path="/another" component={AnotherLayout} />
        <Route path="/error" component={Error} />
        <Route path="/" component={Home} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routers;
