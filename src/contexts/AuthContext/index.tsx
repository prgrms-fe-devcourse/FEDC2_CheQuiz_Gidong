import { createContext, useCallback, useContext, useMemo } from 'react';

import { useLocalStorage } from '@/hooks/useStorage';

import { LoginFormData } from '@/interfaces/LoginFormData';
import { SignUpFormData } from '@/interfaces/SignUpFormData';

import auth from '@/api/auth';
import { UserAPI } from '@/interfaces/UserAPI';

interface AuthContextType {
  user: Partial<UserAPI>;
  token: string;
  login: (formData: LoginFormData) => void;
  signUp: (formData: SignUpFormData) => void;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext) as AuthContextType;

function AuthProvider({ children }: Props) {
  const [user, setUser] = useLocalStorage<Partial<UserAPI>>('user', {});
  const [token, setToken] = useLocalStorage('token', '');

  const login = useCallback(
    async (formData: LoginFormData) => {
      try {
        const data = await auth.login(formData);

        setUser(data.user);
        setToken(data.token);

        // TODO: Success Toast
      } catch (error) {
        // TODO: Error Toast
      }
    },
    [setUser, setToken],
  );

  const signUp = useCallback(
    async (formData: SignUpFormData) => {
      try {
        const data = await auth.signUp(formData);

        setUser(data.user);
        setToken(data.token);

        // TODO: Success Toast
      } catch (error) {
        // TODO: Error Toast
      }
    },
    [setUser, setToken],
  );

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          user,
          token,
          login,
          signUp,
        }),
        [user, token, login, signUp],
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
