import apiInstance from '@/api/apiInstance';
import { UserAPI } from '@/interfaces/UserAPI';
import { rankingUrl } from '@/utils/apiUrl';

const getRankAll = async () => {
  try {
    const { data }: { data: UserAPI[] } = await apiInstance({
      method: 'get',
      url: rankingUrl.getAllUsers,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
  return [];
};

export default getRankAll;
