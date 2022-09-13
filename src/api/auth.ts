/* eslint-disable @typescript-eslint/no-unsafe-return */
import axiosInstance from '@/api/axiosInstance';

import type { LoginFormData } from '@/interfaces/LoginFormData';
import type { SignUpFormData } from '@/interfaces/SignUpFormData';

const login = async (data: LoginFormData) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: '/login',
      data,
    });

    return res.data;
  } catch (error) {
    throw new Error('Login Failed');
  }
};

const signUp = async (data: SignUpFormData) => {
  try {
    const res = await axiosInstance({
      method: 'POST',
      url: '/signup',
      data,
    });

    return res.data;
  } catch (error) {
    throw new Error('SignUp Failed');
  }
};

const getAuthUser = async (token: string) => {
  try {
    if (!token) throw new Error('Token is required');

    const res = await axiosInstance({
      method: 'GET',
      url: '/auth-user',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data) throw new Error('Token is invalid');
    return res.data;
  } catch (error) {
    throw new Error('Auth User Failed');
  }
};

const logout = async () => {
  try {
    await axiosInstance({
      method: 'POST',
      url: '/logout',
    });
  } catch (error) {
    throw new Error('Logout Failed');
  }
};

export default {
  login,
  signUp,
  getAuthUser,
  logout,
};
