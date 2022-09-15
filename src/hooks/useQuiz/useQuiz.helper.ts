import { getPostsFromChannel, getPosts } from '@/api/QuizServices';

import type { PostAPI } from '@/interfaces/PostAPI';
import type { QuizContent } from '@/interfaces/Quiz';

export interface Quiz {
  _id: string;
  question: string;
  answerDescription: string;
  category: string;
  difficulty: number;
  importance: number;
  answerType: 'trueOrFalse' | 'multipleChoice' | 'shortAnswer';
  answer: string;
}

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

export const calculateScore = (quizzes: Quiz[], userAnswers: string[]) => {
  // 전부 선택하지 않았거나 user가 임의로 조작했다면 0점을 부여한다.
  if (quizzes.length !== userAnswers.filter((answer) => answer).length)
    return 0;
  // filter corrected quizzes and add scores
  return quizzes
    .filter((quiz, index) => quiz.answer === userAnswers[index])
    .reduce((acc, cur) => acc + cur.difficulty * 10, 0);
};

/**
 * Quiz 인터페이스를 구현하는 팩토리 함수
 */
const createQuiz = (post: PostAPI): Quiz => {
  const quizContent = JSON.parse(post.title) as QuizContent;

  return {
    _id: post._id,
    question: quizContent.question,
    answerDescription: quizContent.answerDescription,
    answer: quizContent.answer,
    answerType: quizContent.answerType,
    category: quizContent.category,
    difficulty: quizContent.difficulty,
    importance: quizContent.importance,
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
