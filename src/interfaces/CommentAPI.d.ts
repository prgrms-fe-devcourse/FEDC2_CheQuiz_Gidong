// eslint-disable-next-line import/no-cycle
import type { UserAPI } from './UserAPI';

export interface CommentAPI {
  _id: string;
  comment: string;
  author: UserAPI;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}
