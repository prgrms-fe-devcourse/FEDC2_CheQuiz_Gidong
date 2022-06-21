import axiosInstance from '@/api/axiosInstance';

export const getNotifications = async (token: string) => {
  try {
    const res = await axiosInstance({
      method: 'GET',
      url: '/notifications',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error('Get Notifications Failed');
  }
};
