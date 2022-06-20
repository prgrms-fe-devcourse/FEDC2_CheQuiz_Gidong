export interface ChannelAPI {
  _id: string;
  name: string;
  authRequired: false;
  description: string;
  posts: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChannelAPICustomTitle {
  name: string;
  tags: string[];
  des: string;
}
