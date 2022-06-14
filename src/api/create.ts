import {
  TEST_ADMIN_TOKEN,
  TEST_CHANNEL_ID,
  TEST_USER_TOKEN,
} from '@/assets/QuizCreateMockData';
import { QuizSetClientContent } from '@/components/create';
import { QuizContent } from '@/interfaces/Quiz';
import axiosInstance from '@/utils/apiInstance';

export const createQuiz = async (
  quiz: QuizContent,
  channelId = TEST_CHANNEL_ID,
) => {
  try {
    await axiosInstance({
      method: 'POST',
      url: '/posts/create',
      data: { image: null, channelId, title: JSON.stringify(quiz) },
      headers: {
        Authorization: `Bearer ${TEST_USER_TOKEN}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const createQuizSet = async (set: QuizSetClientContent) => {
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
          creator: TEST_USER_TOKEN,
        }),
      },
      headers: {
        Authorization: `Bearer ${TEST_ADMIN_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
