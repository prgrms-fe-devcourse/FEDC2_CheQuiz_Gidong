import { useEffect, useState } from 'react';

import { Route } from 'react-router';

import { useAuthContext } from '@/contexts/AuthContext';

import PrivateRoute from './PrivateRoute';

import type { RouteProps } from 'react-router';

interface Props extends RouteProps {
  mode?: 'private' | 'public';
}

const AuthRoute = ({ mode, ...props }: Props) => {
  const { authUser } = useAuthContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      await authUser();
      setLoading(false);
    })();
  }, [authUser]);

  if (loading) return null;
  return mode === 'private' ? (
    <PrivateRoute {...props} />
  ) : (
    <Route {...props} />
  );
};

export default AuthRoute;
