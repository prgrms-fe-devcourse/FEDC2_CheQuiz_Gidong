import axios from 'axios';

import api from '@/api/axiosInstance';

import type { ChannelAPI } from '@/interfaces/ChannelAPI';
import type { PostAPI } from '@/interfaces/PostAPI';
import type { Quiz } from '@/interfaces/Quiz';

function getPostsFromPostIds(postIds: string[]) {
  return axios.all(
    postIds.map((postId) =>
      api
        .get<PostAPI>(`/posts/${postId}`)
        .then((response) => response.data)
        .catch(() => {
          throw new Error('error occured at getPostsfromPostIds.');
        })
    )
  );
}

export const getPosts = async () => {
  try {
    const response = await api.get<PostAPI[]>('/posts');
    return response.data;
  } catch (error) {
    throw new Error('error occurred at getPosts.');
  }
};

function parseQuiz(post: PostAPI) {
  const postCopy: Partial<PostAPI> = { ...post };
  const quizContent = postCopy.title as string;
  delete postCopy.title;
  return { ...postCopy, ...JSON.parse(quizContent) } as Quiz;
}

export function getPostsFromChannel(channelId: string): Promise<PostAPI[]> {
  return api
    .get<PostAPI[]>(`/posts/channel/${channelId}`)
    .then((response) => response.data);
}

export function getQuizzesFromPostIds(postIds: string[]): Promise<Quiz[]> {
  return getPostsFromPostIds(postIds)
    .then((response) => response.map((post) => parseQuiz(post)))
    .catch(() => {
      throw new Error('error occured at getQuizzes');
    });
}

export async function getChannels() {
  return api
    .get<ChannelAPI[]>('/channels')
    .then((response) => response.data)
    .catch(() => {
      throw new Error('error occured at getChannels.');
    });
}
