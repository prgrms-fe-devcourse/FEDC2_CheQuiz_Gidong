import { Switch, BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

import Home from '@/pages/Home';
import QuizCreate from '@/pages/QuizCreatePage';
import QuizSolvePage from '@/pages/QuizSolvePage';
import QuizResultPage from '@/pages/QuizResultPage';
import UserInfoPage from '@/pages/UserInfoPage';
import Ranking from '@/pages/RankingPage';
import Error from '@/pages/ErrorPage';

import AuthRoute from '@/routes/AuthRoute';
import DesignPage from '@/pages/DesignPage';

function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute exact path="/create" component={QuizCreate} mode="private" />
        <AuthRoute exact path="/solve" component={QuizSolvePage} />
        <AuthRoute exact path="/result" component={QuizResultPage} />
        <AuthRoute exact path="/ranking" component={Ranking} />
        <AuthRoute path="/user/:userId" component={UserInfoPage} />
        <AuthRoute path="/error" component={Error} />
        <AuthRoute exact path="/test/design" component={DesignPage} />
        <AuthRoute exact path="/" component={Home} />
        <AuthRoute path="*" render={() => <Redirect to="/error" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routers;
