import axios from 'axios';
import api from '@/api/apiInstance';
import { ChannelAPI } from '@/interfaces/ChannelAPI';
import { PostAPI } from '@/interfaces/PostAPI';
import { Quiz } from '@/interfaces/Quiz';

function shuffle<T = unknown>(postIdArray: T[], count: number): T[] {
  const ret = [...postIdArray];
  for (let i = 0; i < postIdArray.length - 1; i += 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [ret[i], ret[j]] = [ret[j], ret[i]];
  }
  return ret.slice(0, count < ret.length ? count : ret.length);
}

function getAllPostIds() {
  return api
    .get<ChannelAPI[]>('/channels')
    .then((response) => response.data)
    .then((data) => data.flatMap((channel) => channel.posts))
    .catch(() => {
      throw new Error('error occured at getAllPostIds.');
    });
}

function getPosts(postIds: string[]) {
  return axios.all(
    postIds.map((postId) =>
      api
        .get<PostAPI>(`/posts/${postId}`)
        .then((response) => response.data)
        .catch(() => {
          throw new Error('error occured at getPosts.');
        }),
    ),
  );
}

export function getPostIdsFromChannel(channelId: string) {
  return api
    .get<ChannelAPI>(`/channels/${channelId}`)
    .then((response) => response.data)
    .then((data) => (data.posts ? data.posts : []))
    .catch(() => {
      throw new Error('error occured at getPostIdsFromChannel.');
    });
}

export function getShuffledPostIds(count: number) {
  return getAllPostIds()
    .then((postIds) => shuffle(postIds, count))
    .catch(() => {
      throw new Error('error occured at getShuffledPostIds.');
    });
}

// ANCHOR: API 변경사항이 있다면, 가장 먼저 확인해야 할 부분
export function getQuizzes(postIds: string[]): Promise<Quiz[]> {
  return getPosts(postIds)
    .then((response) =>
      response.map((post) => {
        const postCopy: Partial<PostAPI> = { ...post };
        const quizContent = postCopy.title as string;
        delete postCopy.title;
        return { ...postCopy, ...JSON.parse(quizContent) } as Quiz;
      }),
    )
    .catch(() => {
      throw new Error('error occured at getQuizzes');
    });
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
