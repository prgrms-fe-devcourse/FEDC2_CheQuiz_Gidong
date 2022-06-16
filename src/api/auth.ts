import { LoginFormData } from '@/interfaces/LoginFormData';
import { SignUpFormData } from '@/interfaces/SignUpFormData';

import axiosInstance from '@/api/apiInstance';

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

export default {
  login,
  signUp,
};
