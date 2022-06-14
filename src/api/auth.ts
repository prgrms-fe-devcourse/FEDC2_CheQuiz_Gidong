import { LoginFormData } from '@/interfaces/LoginFormData';
import { SignUpFormData } from '@/interfaces/SignUpFormData';

import axiosInstance from '@/utils/apiInstance';

export default {
  login: async (data: LoginFormData) => {
    try {
      const res = await axiosInstance({
        method: 'POST',
        url: '/login',
        data,
      });

      return res.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
  signUp: async (data: SignUpFormData) => {
    try {
      const res = await axiosInstance({
        method: 'POST',
        url: '/signup',
        data,
      });

      return res.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
};
