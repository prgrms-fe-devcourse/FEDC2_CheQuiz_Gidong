import { PostAPIBase } from './PostAPI';

export interface QuizContent {
  question: string;
  answerDescription: string;
  tag: string;
  difficulty: number;
  importance: number;
  answerType: 'trueOrFalse' | 'multipleChoice' | 'shortAnswer';
  answer: string;
}

export interface Quiz extends PostAPIBase, QuizContent {}
