export interface User {
  _id: string;
  role: string;
  isOnline: boolean;
  posts: Post[];
  likes: Like[];
  comments: Comment[] | string[];
  notifications: Notification[];
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  username?: string;
}

export interface Channel {
  _id: string;
  name: string;
  authRequired: false;
  posts: string[];
  createdAt: string;
  updatedAt: string;
  description: string; // JSON.stringify(QuizSet)
}

export interface QuizSet {
  name: string;
  tags: string[];
  des: string;
}

export interface Post {
  _id: string;
  likes: Like[];
  comments: Comment[];
  image?: string | null;
  imagePublicId?: string;
  channel: Channel;
  author: User;
  createdAt: string;
  updatedAt: string;
  title: string; // JSON.stringify(QuizItem)
}

export interface QuizItem {
  _id: number;
  question: string;
  answerDescription: string;
  category: string;
  difficulty: number;
  importance: number;
  answerType: 'trueOrFalse' | 'multipleChoice' | 'shortAnswer';
  answer: string;
}

export interface Like {
  _id: string;
  user: string; // 사용자 id
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  comment: string;
  author: User;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  seen: boolean;
  _id: string;
  author: User;
  user: User | string;
  post: string | null; // 포스트 id
  follow: string | undefined; // 사용자 id
  comment?: Comment;
  like?: Like;
  message: string | undefined; // 메시지 id
  createdAt: string;
  updatedAt: string;
}
