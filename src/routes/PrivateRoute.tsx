import { Redirect, Route } from 'react-router';

import { useAuthContext } from '@/contexts/AuthContext';

import type { RouteProps } from 'react-router';

const PrivateRoute = ({ ...props }: RouteProps) => {
  const { isAuth } = useAuthContext();

  return isAuth ? <Route {...props} /> : <Redirect to='/' />;
};

export default PrivateRoute;
