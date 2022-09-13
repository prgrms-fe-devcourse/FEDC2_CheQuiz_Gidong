/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { v4 } from 'uuid';

import auth from '@/api/auth';
import { useLocalStorage } from '@/hooks/useStorage';

import type { LoginFormData } from '@/interfaces/LoginFormData';
import type { SignUpFormData } from '@/interfaces/SignUpFormData';
import type { UserAPI } from '@/interfaces/UserAPI';

interface AuthContextType {
  user: UserAPI;
  token: string;
  login: (formData: LoginFormData) => Promise<void>;
  signUp: (formData: Partial<SignUpFormData>) => Promise<void>;
  authUser: () => Promise<void>;
  setUser: (value: UserAPI) => void;
  isAuth: boolean;
  logout: () => Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext) as AuthContextType;

const AuthProvider = ({ children }: Props) => {
  const [user, setUser, removeUser] = useLocalStorage('user', {});
  const [token, setToken, removeToken] = useLocalStorage('token', '');
  const [isAuth, setIsAuth] = useState(false);

  const login = useCallback(
    async (formData: LoginFormData) => {
      try {
        const data = await auth.login(formData);
        setUser(data.user);
        setToken(data.token);
        setIsAuth(true);
        // TODO: Success Toast
      } catch (error) {
        setIsAuth(false);
        // TODO: Error Toast
      }
    },
    [setUser, setToken]
  );

  const signUp = useCallback(
    async (formData: SignUpFormData) => {
      try {
        const data = await auth.signUp({
          ...formData,
          username: JSON.stringify({ _id: v4(), points: 0 }),
        });

        setUser(data.user);
        setToken(data.token);
        setIsAuth(true);
        // TODO: Success Toast
      } catch (error) {
        setIsAuth(false);
        // TODO: Error Toast
      }
    },
    [setUser, setToken]
  );

  const authUser = useCallback(async () => {
    try {
      const authedUser = await auth.getAuthUser(token);
      setUser(authedUser);
      setIsAuth(true);
    } catch (error) {
      removeUser();
      removeToken();
      setIsAuth(false);
    }
  }, [token, setUser, removeUser, removeToken]);

  const logout = useCallback(async () => {
    try {
      await auth.logout();
      removeUser();
      removeToken();
      setIsAuth(false);
      // TODO: Success Toast
    } catch (error) {
      // TODO: Error Toast
    }
  }, [removeUser, removeToken]);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          user,
          token,
          login,
          signUp,
          authUser,
          setUser,
          isAuth,
          logout,
        }),
        [user, token, login, signUp, authUser, setUser, isAuth, logout]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
