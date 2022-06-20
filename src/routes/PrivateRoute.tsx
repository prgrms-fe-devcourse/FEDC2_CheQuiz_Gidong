import { Redirect, Route, RouteProps } from 'react-router';

import { useAuthContext } from '@/contexts/AuthContext';

function PrivateRoute({ ...props }: RouteProps) {
  const { isAuth } = useAuthContext();

  return isAuth ? <Route {...props} /> : <Redirect to="/" />;
}

export default PrivateRoute;
