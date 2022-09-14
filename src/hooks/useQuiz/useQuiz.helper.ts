import { getPostsFromChannel, getPosts } from '@/api/QuizServices';

import type { PostAPI } from '@/interfaces/PostAPI';
import type { Quiz, QuizContent } from '@/interfaces/Quiz';

// ANCHOR: 인터페이스에 변경 있을 경우 다시 확인할 것
export type QuizType = Pick<
  Quiz,
  | '_id'
  | 'question'
  | 'answer'
  | 'answerDescription'
  | 'answerType'
  | 'category'
  | 'difficulty'
  | 'importance'
>;

/**
 *
 * @param array 기존 소스로 사용되는 배열
 * @param count 섞은 뒤 반환할 개수
 * @returns 섞인 count의 길이를 갖는 배열
 */
const shuffle = <T = unknown>(array: T[], count: number): T[] => {
  const ret = [...array];

  for (let i = 0; i < array.length - 1; i += 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [ret[i], ret[j]] = [ret[j], ret[i]];
  }

  return ret.slice(0, count < ret.length ? count : ret.length);
};

/**
 * Quiz 인터페이스를 구현하는 팩토리 함수
 */
const createQuiz = (post: PostAPI): QuizType => {
  const quizContent = JSON.parse(post.title) as QuizContent;

  return {
    _id: post._id,
    ...quizContent,
  };
};

/**
 * QuizSolve에 사용되는 quiz use cases
 */
class QuizService {
  static async getShuffledQuizzes(count: number) {
    try {
      const posts = await getPosts();
      const quizzes = posts.map((post) => createQuiz(post));

      return shuffle(quizzes, count);
    } catch (error) {
      throw new Error('error occurred at QuizService.getShuffledQuizzes.');
    }
  }

  static async getQuizzesFromQuizSet(channelId: string) {
    try {
      const posts = await getPostsFromChannel(channelId);
      const quizzes = posts.map((post) => createQuiz(post)).reverse();

      return quizzes;
    } catch (error) {
      throw new Error('error occurred at QuizService.getQuizzesFromQuizSet.');
    }
  }
}

export default QuizService;
