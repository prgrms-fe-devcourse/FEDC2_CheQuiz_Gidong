import { UserAPI } from './UserAPI';
import { CommentAPI } from './CommentAPI';
import { ChannelAPI } from './ChannelAPI';
/**
 * ANCHOR: title에는 stringify된 QuizContent interface 정보가 들어감
 * TODO: Like, Comment, Channel interface 추가
 */
export interface PostAPIBase {
  _id: string;
  comments: CommentAPI[];
  image?: string;
  imagePublicId?: string;
  channel: ChannelAPI;
  author: UserAPI;
  createdAt: string;
  updatedAt: string;
}

export interface PostAPI extends PostAPIBase {
  title: string;
}
