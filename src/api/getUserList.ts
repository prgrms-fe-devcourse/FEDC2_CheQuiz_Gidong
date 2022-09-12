/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { rankingUrl } from '@/api/apiUrl';
import apiInstance from '@/api/axiosInstance';

import type { UserAPI } from '@/interfaces/UserAPI';

const getUserList = async () => {
  try {
    const { data }: { data: UserAPI[] } = await apiInstance({
      method: 'get',
      url: rankingUrl.getAllUsers,
    });
    return data;
  } catch (error) {
    throw new Error('Get UserList failed');
  }
};

export default getUserList;
