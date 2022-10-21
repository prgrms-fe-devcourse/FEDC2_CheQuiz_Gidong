/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axiosInstance from '@/api/axiosInstance';

import type { UserAPI } from '@/interfaces/UserAPI';
import type { Channel, QuizItemType, QuizSetType } from '@/interfaces/model';

export const createQuiz = async (
  quiz: Omit<QuizItemType, '_id'>,
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

export const createQuizSet = async (set: QuizSetType, user: UserAPI) => {
  const { name, ...quizSetCustomData } = set;
  try {
    const { data }: { data: Channel } = await axiosInstance({
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
        Authorization: `Bearer ${process.env.ADMIN_USER_TOKEN || ''}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Create Quiz Set Failed');
  }
};
