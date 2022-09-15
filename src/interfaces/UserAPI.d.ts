/* eslint-disable import/no-cycle */
import type { CommentAPI } from './CommentAPI';
import type { PostAPI } from './PostAPI';

export interface UserInfo {
  _id: string;
  points: number;
}

export interface FollowingType {
  _id: string;
  user: string;
  follower: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface UserAPI {
  coverImage?: string; // 커버 이미지
  image?: string;
  emailVerified?: boolean; // 사용되지 않음
  banned?: boolean; // 사용되지 않음
  _id: string;
  role: string;
  isOnline: boolean;
  posts: PostAPI[];
  likes: LikeAPI[];
  comments: CommentAPI[] | string[];
  followers?: string[];
  following: FollowingType[];
  messages: Message[];
  notifications: NotificationAPI[];
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  username?: string;
}

export interface CustomUserAPI {
  id: string;
  fullName: string;
  posts: PostAPI[];
  likes: LikeAPI[];
  comments: CommentAPI[] | string[];
  totalExp?: number;
}
export interface UserSimpleType {
  id: string;
  fullName: string;
  points: number;
  createdAt?: string;
}
export interface UserQuizCategory {
  id: string;
  category: string;
}

export interface UserQuizType {
  id: string;
  question: string;
  answer: string;
  answerDescription: string;
  answerType: 'trueOrFalse' | 'multipleChoice' | 'shortAnswer';
  author: UserAPI;
  category: string;
  difficulty: number;
  importance: number;
  comments: CommentAPI[];
  likes: LikeAPI[];
}

export interface UserQuizInfo {
  _id: string;
  points: number;
}

export interface UserQuizPostAPI {
  fullName: string;
  username: UserQUizInfo;
}
