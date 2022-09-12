import { Redirect } from 'react-router';
import { Switch, BrowserRouter } from 'react-router-dom';

import Error from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import QuizCreate from '@/pages/QuizCreatePage';
import QuizResultPage from '@/pages/QuizResultPage';
import QuizSolvePage from '@/pages/QuizSolvePage';
import Ranking from '@/pages/RankingPage';
import UserInfoPage from '@/pages/UserInfoPage';
import AuthRoute from '@/routes/AuthRoute';

function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute
          exact
          path='/create'
          component={QuizCreate}
          mode='private'
        />
        <AuthRoute
          exact
          path='/solve'
          component={QuizSolvePage}
        />
        <AuthRoute
          exact
          path='/result'
          component={QuizResultPage}
        />
        <AuthRoute
          exact
          path='/ranking'
          component={Ranking}
        />
        <AuthRoute
          path='/user/:userId'
          component={UserInfoPage}
        />
        <AuthRoute
          path='/error'
          component={Error}
        />
        <AuthRoute
          exact
          path='/'
          component={Home}
        />
        <AuthRoute
          path='*'
          render={() => <Redirect to='/error' />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routers;
