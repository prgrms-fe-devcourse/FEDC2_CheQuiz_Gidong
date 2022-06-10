import { PostAPI } from './PostAPI';

export interface UserAPI {
  _id: string;
  role: string;
  isOnline: boolean;
  posts: PostAPI[];
  likes: LikeAPI[];
  comments: string[];
  followers?: string;
  notifications: NotificationAPI[];
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  username: string;
}
