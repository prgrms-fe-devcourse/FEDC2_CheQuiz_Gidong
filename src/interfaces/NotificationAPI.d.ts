export interface NotificationAPI {
  seen: boolean;
  _id: string;
  author: User;
  user: User | string;
  post: Nullable<string>; // 포스트 id
  follow: string | undefined; // 사용자 id
  comment: string | undefined;
  like: string | undefined;
  message: string | undefined; // 메시지 id
  createdAt: string;
  updatedAt: string;
}
