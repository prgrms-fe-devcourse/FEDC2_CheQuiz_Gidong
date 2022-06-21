import axiosInstance from '@/api/axiosInstance';

import { NotificationPayload } from '@/interfaces/NotificationAPI';

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

export const createNotification = async (
  token: string,
  notificationPayload: NotificationPayload,
) => {
  try {
    await axiosInstance({
      method: 'POST',
      url: '/notifications/create',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: notificationPayload,
    });
  } catch (error) {
    throw new Error('Create Notification Failed');
  }
};
