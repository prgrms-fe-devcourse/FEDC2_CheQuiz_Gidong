import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

import Home from '@/pages/Home';
import QuizCreate from '@/pages/QuizCreate';
import QuizResultPage from '@/pages/QuizResultPage';
import QuizSolvePage from '@/pages/QuizSolvePage';
import Error from '@/pages/Error';
import UserInfo from '@/pages/UserInfo';

function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/create" component={QuizCreate} />
        <Route exact path="/result" component={QuizResultPage} />
        <Route path="/user" component={UserInfo} />
        <Route exact path="/solve" component={QuizSolvePage} />
        <Route path="/error" component={Error} />
        <Route path="/" component={Home} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routers;
