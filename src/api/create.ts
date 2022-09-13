/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axiosInstance from '@/api/axiosInstance';

import type { ChannelAPICustomTitle } from '@/interfaces/ChannelAPI';
import type { QuizContent } from '@/interfaces/Quiz';
import type { UserAPI } from '@/interfaces/UserAPI';

export const createQuiz = async (
  quiz: QuizContent,
  token: string,
  channelId = process.env.DEFAULT_CHANNEL_ID
) => {
  try {
    await axiosInstance({
      method: 'POST',
      url: '/posts/create',
      data: { image: null, channelId, title: JSON.stringify(quiz) },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Create Quiz Failed');
  }
};

export const createQuizSet = async (
  set: ChannelAPICustomTitle,
  user: UserAPI
) => {
  const { name, ...quizSetCustomData } = set;
  try {
    const { data } = await axiosInstance({
      method: 'POST',
      url: 'channels/create',
      data: {
        authRequired: false,
        name,
        description: JSON.stringify({
          ...quizSetCustomData,
          creator: user,
        }),
      },
      headers: {
        Authorization: `Bearer ${process.env.ADMIN_USER_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Create Quiz Set Failed');
  }
};
