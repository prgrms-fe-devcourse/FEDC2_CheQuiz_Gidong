import api from '@/utils/apiInstance';
import { ChannelAPI } from '@/interfaces/ChannelAPI';
import { PostAPI } from '@/interfaces/PostAPI';
import { Quiz } from '@/interfaces/Quiz';

class QuizServices {
  static shuffle<T = unknown>(postIdArray: T[], count: number): T[] {
    const ret = [...postIdArray];
    for (let i = 0; i < postIdArray.length - 1; i += 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [ret[i], ret[j]] = [ret[j], ret[i]];
    }
    return ret.slice(0, count < ret.length ? count : ret.length);
  }

  static getAllPostIds() {
    return api
      .get<ChannelAPI[]>('/channels')
      .then((response) => response.data)
      .then((data) => data.flatMap((channel) => channel.posts));
  }

  static getShuffledPostIds(count: number) {
    return this.getAllPostIds().then((postIds) => this.shuffle(postIds, count));
  }

  static getShuffledPosts(postIds: string[]) {
    return Promise.all(
      postIds.map((postId) =>
        api.get<PostAPI>(`/posts/${postId}`).then((response) => response.data),
      ),
    );
  }

  static getShuffledQuizzes(postIds: string[]) {
    return this.getShuffledPosts(postIds).then((response) =>
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
  // 퀴즈 타입에 따른 보기 생성하기
  // 유저가 쓴 답과 정답 비교하기
  // 유저가 얻을 점수 계산하기 -> difficulty, importance
}

export default QuizServices;
