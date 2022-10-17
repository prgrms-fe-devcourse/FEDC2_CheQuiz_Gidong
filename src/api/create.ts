/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axiosInstance from '@/api/axiosInstance';

import type { QuizSetType } from '@/components/QuizCreateForm/QuizCreateForm';
import type { UserAPI } from '@/interfaces/UserAPI';

export interface QuizItemType {
  _id: number;
  question: string;
  answerDescription: string;
  category: string;
  difficulty: number;
  importance: number;
  answerType: 'trueOrFalse' | 'multipleChoice' | 'shortAnswer';
  answer: string;
}

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
