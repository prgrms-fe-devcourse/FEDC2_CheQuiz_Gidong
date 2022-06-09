export interface ChannelAPI {
  _id: string;
  name: string;
  authRequired: false;
  // TODO: 커스텀 ( JSON.parse 필요 )
  description: string;
  posts: string[];
  createdAt: string;
  updatedAt: string;
}
