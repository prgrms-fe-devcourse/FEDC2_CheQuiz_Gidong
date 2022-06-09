import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from '@/pages/Home';

function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routers;
