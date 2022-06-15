import { UserAPI } from '@/interfaces/UserAPI';
import ApiCall from '@/utils/apiCall';
import { rankingUrl } from '@/utils/apiUrl';

const getRankAll = async () => {
  try {
    const { data }: { data: UserAPI[] } = await ApiCall(
      'get',
      rankingUrl.getAllUsers,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return [];
};

export default getRankAll;
