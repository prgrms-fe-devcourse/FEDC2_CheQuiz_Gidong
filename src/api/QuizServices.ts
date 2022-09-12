import axios from 'axios';

import api from '@/api/axiosInstance';

import type { ChannelAPI } from '@/interfaces/ChannelAPI';
import type { PostAPI } from '@/interfaces/PostAPI';
import type { Quiz } from '@/interfaces/Quiz';

function shuffle<T = unknown>(array: T[], count: number): T[] {
  const ret = [...array];
  for (let i = 0; i < array.length - 1; i += 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [ret[i], ret[j]] = [ret[j], ret[i]];
  }
  return ret.slice(0, count < ret.length ? count : ret.length);
}

function getPostIds() {
  return api
    .get<ChannelAPI[]>('/channels')
    .then((response) => response.data)
    .then((data) => data.flatMap((channel) => channel.posts))
    .catch(() => {
      throw new Error('error occured at getAllPostIds.');
    });
}

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

function getPosts() {
  return api
    .get<PostAPI[]>('/posts')
    .then((response) => response.data)
    .catch(() => {
      throw new Error('error occured at getPosts.');
    });
}

function getShuffledPosts(count: number) {
  return getPosts().then((posts) => shuffle(posts, count));
}

function parseQuiz(post: PostAPI) {
  const postCopy: Partial<PostAPI> = { ...post };
  const quizContent = postCopy.title as string;
  delete postCopy.title;
  return { ...postCopy, ...JSON.parse(quizContent) } as Quiz;
}

function getPostsFromChannel(channelId: string): Promise<PostAPI[]> {
  return api
    .get<PostAPI[]>(`/posts/channel/${channelId}`)
    .then((response) => response.data);
}

/**
 * @deprecated
 */
export function getPostIdsFromChannel(channelName: string): Promise<string[]> {
  return api
    .get<ChannelAPI>(`/channels/${channelName}`)
    .then((response) => response.data)
    .then((data) => (data.posts ? data.posts : []))
    .catch(() => {
      throw new Error('error occured at getPostIdsFromChannel.');
    });
}

/**
 * @deprecated
 */
export function getShuffledPostIds(count: number) {
  return getPostIds()
    .then((postIds) => shuffle(postIds, count))
    .catch(() => {
      throw new Error('error occured at getShuffledPostIds.');
    });
}

export function getQuizzesFromPostIds(postIds: string[]): Promise<Quiz[]> {
  return getPostsFromPostIds(postIds)
    .then((response) => response.map((post) => parseQuiz(post)))
    .catch(() => {
      throw new Error('error occured at getQuizzes');
    });
}

export function getQuizzesFromChannel(channelId: string) {
  return getPostsFromChannel(channelId)
    .then((posts) => posts.map((post) => parseQuiz(post)))
    .then((quiz) => quiz.reverse());
}

export function getShuffledQuizzes(count: number) {
  return getShuffledPosts(count).then((posts) =>
    posts.map((post) => parseQuiz(post))
  );
}

export function caculateScore(quizzes: Quiz[], userAnswers: string[]) {
  // 전부 선택하지 않았거나 user가 임의로 조작했다면 0점을 부여한다.
  if (quizzes.length !== userAnswers.filter((answer) => answer).length)
    return 0;
  // filter corrected quizzes and add scores
  return quizzes
    .filter((quiz, index) => quiz.answer === userAnswers[index])
    .reduce((acc, cur) => acc + cur.difficulty * 10, 0);
}

export async function getChannels() {
  return api
    .get<ChannelAPI[]>('/channels')
    .then((response) => response.data)
    .catch(() => {
      throw new Error('error occured at getChannels.');
    });
}
