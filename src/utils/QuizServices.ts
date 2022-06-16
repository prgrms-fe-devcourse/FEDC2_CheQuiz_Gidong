import api from '@/utils/apiInstance';
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
    .then((data) => data.flatMap((channel) => channel.posts));
}

function getPosts(postIds: string[]) {
  return Promise.all(
    postIds.map((postId) =>
      api.get<PostAPI>(`/posts/${postId}`).then((response) => response.data),
    ),
  );
}

export function getPostIdsFromChannel(channelId: string) {
  return api
    .get<ChannelAPI>(`/channels/${channelId}`)
    .then((response) => response.data)
    .then((data) => data.posts);
}

export function getShuffledPostIds(count: number) {
  return getAllPostIds().then((postIds) => shuffle(postIds, count));
}

export function getQuizzes(postIds: string[]) {
  return getPosts(postIds).then((response) =>
    response.map((post) => {
      try {
        const postCopy: Partial<PostAPI> = { ...post };
        const quizContent = postCopy.title as string;
        delete postCopy.title;
        return { ...postCopy, ...JSON.parse(quizContent) } as Quiz;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error on post:', post);
        return {};
      }
    }),
  );
}
