import { Redirect, Route, RouteProps } from 'react-router';

import { useAuthContext } from '@/contexts/AuthContext';

const PrivateRoute = ({ ...props }: RouteProps) => {
  const { isAuth } = useAuthContext();

  return isAuth ? <Route {...props} /> : <Redirect to="/" />;
};

export default PrivateRoute;
