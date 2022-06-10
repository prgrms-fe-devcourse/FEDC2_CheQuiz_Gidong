import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from '@/pages/Home';
import QuizSolve from '@/pages/QuizSolve';

function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        <Route exact path="/solve" component={QuizSolve} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routers;
