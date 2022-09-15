import type { CommentAPI } from './CommentAPI';
import type { LikeAPI } from './LikeAPI';
import type { UserAPI } from './UserAPI';

export interface NotificationAPI {
  seen: boolean;
  _id: string;
  author: UserAPI;
  user: UserAPI | string;
  post: Nullable<string>; // 포스트 id
  follow: string | undefined; // 사용자 id
  comment?: CommentAPI;
  like?: LikeAPI;
  message: string | undefined; // 메시지 id
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPayload {
  notificationType: 'COMMENT' | 'LIKE';
  notificationTypeId: string;
  userId: string;
  postId?: string;
}
