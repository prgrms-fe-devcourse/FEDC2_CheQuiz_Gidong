import axiosInstance from '@/api/apiInstance';

export const fetchUserData = async (userId: string) => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url: `/users/${userId}`,
    });
    return res.data;
  } catch (error) {
    throw new Error('Get UserData Failed');
  }
};
