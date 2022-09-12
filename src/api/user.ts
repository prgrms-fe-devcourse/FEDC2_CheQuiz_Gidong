/* eslint-disable @typescript-eslint/no-unsafe-return */
import axiosInstance from '@/api/axiosInstance';

import type { UserAPI } from '@/interfaces/UserAPI';

export const fetchUserData = async (userId: string) => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url: `/users/${userId}`,
    });
    return res.data;
  } catch (error) {
    throw new Error('Get UserData Failed');
  }
};

export const fetchUserList = async () => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url: `/users/get-users`,
    });
    return res.data as UserAPI[];
  } catch (error) {
    throw new Error('Get UserList Failed');
  }
};

export const fetchUserQuiz = async (userId: string) => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url: `/posts/author/${userId}`,
    });
    return res.data;
  } catch (error) {
    throw new Error('Get UserQuiz Failed');
  }
};

// 임시로 사용 => 추후 준혁님의 quizService merge시 해당 API 사용 예정
export const fetchPosts = async () => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url: `/posts`,
    });
    return res.data;
  } catch (error) {
    throw new Error('Get Posts Failed');
  }
};
