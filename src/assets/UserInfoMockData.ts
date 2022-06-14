import { UserAPI } from '@/interfaces/UserAPI';
/*
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
*/
const UserInfoMockData: UserAPI = {
  _id: 'user01',
  role: 'Regular',
  isOnline: true,
  posts: [],
  likes: ['62a43587d298d0396d7e731b', '62a43587d298d0396d7e731b'],
  comments: ['62a301fed298d0396d7e7183', '62a30259d298d0396d7e718e'],
  notifications: [],
  fullName: '도넛좋아',
  username: `${JSON.stringify({
    totalPoints: 12360,
  })}`,
  email: 'doughnut@naver.com',
  createdAt: Date.now().toString(),
  updatedAt: Date.now().toString(),
};

const UserInfoMockList: UserAPI[] = [
  {
    _id: 'user01',
    role: 'Regular',
    isOnline: true,
    posts: [],
    likes: ['62a43587d298d0396d7e731b', '62a43587d298d0396d7e731b'],
    comments: ['62a301fed298d0396d7e7183', '62a30259d298d0396d7e718e'],
    notifications: [],
    fullName: 'Apple',
    username: `${JSON.stringify({
      totalPoints: 0,
    })}`,
    email: 'test@naver.com',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
  {
    _id: 'user02',
    role: 'Regular',
    isOnline: true,
    posts: [],
    likes: ['62a43587d298d0396d7e731b', '62a43587d298d0396d7e731b'],
    comments: ['62a301fed298d0396d7e7183', '62a30259d298d0396d7e718e'],
    notifications: [],
    fullName: 'Banana',
    username: `${JSON.stringify({
      totalPoints: 10,
    })}`,
    email: 'test@naver.com',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
  {
    _id: 'user03',
    role: 'Regular',
    isOnline: true,
    posts: [],
    likes: [],
    comments: [],
    notifications: [],
    fullName: 'Cherry',
    username: `${JSON.stringify({
      totalPoints: 33333,
    })}`,
    email: 'Cherry@naver.com',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
  {
    _id: 'user04',
    role: 'Regular',
    isOnline: true,
    posts: [],
    likes: [],
    comments: [],
    notifications: [],
    fullName: '도넛좋아',
    username: `${JSON.stringify({
      totalPoints: 12360,
    })}`,
    email: 'doughnut@naver.com',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
];
export { UserInfoMockData, UserInfoMockList };
