/* eslint-disable import/no-cycle */
import type { ChannelAPI } from './ChannelAPI';
import type { CommentAPI } from './CommentAPI';
import type { LikeAPI } from './LikeAPI';
import type { UserAPI } from './UserAPI';
/**
 * ANCHOR: title에는 stringify된 QuizContent interface 정보가 들어감
 * TODO: Like, Comment, Channel interface 추가
 */

interface PostAPIImage {
  image?: string | null;
}

interface PostAPICustomTitle {
  question: string;
  des: string; // 해설
  tag: string; // 태그
  creator: UserAPI;
  difficulty: number;
  importance: number;
  answerType: string; // 문제 유형 설정 (O,X ["t/f"] 객관식 ["numberType"] 단답형 ["stringType"])
  answer: string; // "true" | "false"
}

interface PostAPITitle {
  title: string;
}

interface PostAPIChannelId {
  channelId: string;
}

export interface PostAPIBase {
  _id: string;
  likes: LikeAPI[];
  comments: CommentAPI[];
  image?: string | null;
  imagePublicId?: string;
  channel: ChannelAPI;
  author: UserAPI;
  createdAt: string;
  updatedAt: string;
}

export interface PostAPICreate
  extends PostAPIImage,
    PostAPITitle,
    PostAPIChannelId {}

export interface PostAPIUpdate
  extends PostAPITitle,
    PostAPIImage,
    PostAPIChannelId {
  postId: string;
  imageToDeletePublicId?: string;
}

export interface PostAPIUserInfo extends PostAPIBase, PostAPITitle {}

export interface PostAPI extends PostAPIBase, PostAPITitle {}
