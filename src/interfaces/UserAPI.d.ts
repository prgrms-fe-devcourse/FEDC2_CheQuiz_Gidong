import { CommentAPI } from './CommentAPI.d';
import { PostAPI } from './PostAPI';

export interface UserInfo {
  totalPoints: number;
}

export interface NotificationAPI {
  seen: boolean;
  _id: string;
  author: User;
  user: User | string;
  post: Nullable<string>; // 포스트 id
  follow: string | undefined; // 사용자 id
  comment: string | undefined;
  message: string | undefined; // 메시지 id
  createdAt: string;
  updatedAt: string;
}

export interface followingType {
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
  following: followingType[];
  messages: Message[];
  notifications: NotificationAPI[];
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  username?: string;
}

export interface customUserAPI {
  id: string;
  fullName: string;
  posts: PostAPI[];
  likes: LikeAPI[];
  comments: CommentAPI[] | string[];
  totalExp?: number;
}
export interface userSimpleType {
  id: string;
  fullName: string;
  points: number;
}
