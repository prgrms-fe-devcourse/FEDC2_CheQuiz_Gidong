import { useEffect, useState } from 'react';
import { Route, RouteProps } from 'react-router';

import { useAuthContext } from '@/contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

interface Props extends RouteProps {
  mode?: 'private' | 'public';
}

function AuthRoute({ mode, ...props }: Props) {
  const { authUser } = useAuthContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
}

export default AuthRoute;
