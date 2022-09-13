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

const Routers = () => (
  <BrowserRouter>
    <Switch>
      <AuthRoute
        exact
        component={QuizCreate}
        mode='private'
        path='/create'
      />
      <AuthRoute
        exact
        component={QuizSolvePage}
        path='/solve'
      />
      <AuthRoute
        exact
        component={QuizResultPage}
        path='/result'
      />
      <AuthRoute
        exact
        component={Ranking}
        path='/ranking'
      />
      <AuthRoute
        component={UserInfoPage}
        path='/user/:userId'
      />
      <AuthRoute
        component={Error}
        path='/error'
      />
      <AuthRoute
        exact
        component={Home}
        path='/'
      />
      <AuthRoute
        path='*'
        render={() => <Redirect to='/error' />}
      />
    </Switch>
  </BrowserRouter>
);

export default Routers;
