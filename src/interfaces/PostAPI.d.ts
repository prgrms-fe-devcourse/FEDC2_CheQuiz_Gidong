import { UserAPI } from './UserAPI';
import { CommentAPI } from './CommentAPI';
import { ChannelAPI } from './ChannelAPI';
import { LikeAPI } from './LikeAPI';
/**
 * ANCHOR: title에는 stringify된 QuizContent interface 정보가 들어감
 * TODO: Like, Comment, Channel interface 추가
 */

interface PostAPIImage {
  image?: string | null;
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

export interface PostAPI extends PostAPIBase, PostAPITitle {}
