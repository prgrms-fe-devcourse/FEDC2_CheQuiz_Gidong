import { UserAPI } from '@/interfaces/UserAPI';

const UserInfoMockData: UserAPI = {
  _id: '1',
  role: 'Regular',
  isOnline: false,
  posts: [],
  likes: [],
  comments: [],
  notifications: [],
  fullName: '미해',
  email: 'mihae@test.com',
  createdAt: '2022-06-09T13:50:03.722Z',
  updatedAt: '2022-06-11T06:53:20.991Z',
  username: `${JSON.stringify({
    totalPoints: 3000,
  })}`,
};

const UserInfoMockList: UserAPI[] = [
  {
    _id: '1',
    role: 'Regular',
    isOnline: false,
    posts: [],
    likes: [],
    comments: [],
    notifications: [],
    fullName: '미해',
    email: 'mihae@test.com',
    createdAt: '2022-06-09T13:50:03.722Z',
    updatedAt: '2022-06-11T06:53:20.991Z',
    username: `${JSON.stringify({
      totalPoints: 3000,
    })}`,
  },
  {
    _id: '2',
    role: 'Regular',
    isOnline: false,
    posts: [],
    likes: [],
    comments: [],
    notifications: [],
    fullName: '타락파워전사',
    email: 'tarak@test.com',
    createdAt: '2022-06-09T13:50:03.722Z',
    updatedAt: '2022-06-11T06:53:20.991Z',
    username: `${JSON.stringify({
      totalPoints: 8000,
    })}`,
  },
  {
    _id: '3',
    role: 'Regular',
    isOnline: false,
    posts: [],
    likes: [],
    comments: [],
    notifications: [],
    fullName: '오르비스최고',
    email: 'orbit@test.com',
    createdAt: '2022-06-09T13:50:03.722Z',
    updatedAt: '2022-06-11T06:53:20.991Z',
    username: `${JSON.stringify({
      totalPoints: 30,
    })}`,
  },
];

export { UserInfoMockData, UserInfoMockList };
