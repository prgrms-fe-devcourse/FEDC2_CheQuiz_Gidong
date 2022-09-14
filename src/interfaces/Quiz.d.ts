import type { PostAPIBase } from './PostAPI';

export interface QuizContent {
  question: string;
  answerDescription: string;
  category: string;
  difficulty: number;
  importance: number;
  answerType: 'trueOrFalse' | 'multipleChoice' | 'shortAnswer';
  answer: string;
}

export interface QuizClientContent extends QuizContent {
  _id: number;
}

export interface Quiz extends PostAPIBase, QuizContent {}

export interface QuizShowContent extends QuizContent {
  _id: number;
  likes: LikeAPI[];
  comments: CommentAPI[];
  author: UserAPI;
}
