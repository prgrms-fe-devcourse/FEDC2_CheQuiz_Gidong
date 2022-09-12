/* eslint-disable @typescript-eslint/no-unsafe-return */
import axiosInstance from '@/api/axiosInstance';

import type { NotificationPayload } from '@/interfaces/NotificationAPI';

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
  notificationPayload: NotificationPayload
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

export const seenNotifications = async (token: string) => {
  try {
    await axiosInstance({
      method: 'PUT',
      url: '/notifications/seen',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Notifications seen Failed');
  }
};
