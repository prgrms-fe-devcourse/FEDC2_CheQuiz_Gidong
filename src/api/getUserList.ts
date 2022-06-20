import apiInstance from '@/api/axiosInstance';
import { UserAPI } from '@/interfaces/UserAPI';
import { rankingUrl } from '@/api/apiUrl';

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
