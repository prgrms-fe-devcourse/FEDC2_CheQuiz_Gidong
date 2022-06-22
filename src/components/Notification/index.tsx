import { useCallback, useEffect, useState } from 'react';

import { getNotifications, seenNotifications } from '@/api/notification';
import { useAuthContext } from '@/contexts/AuthContext';
import Item from '@/components/Notification/Item';

import { NotificationAPI } from '@/interfaces/NotificationAPI';

import * as S from './styles';

function Notification() {
  const { token } = useAuthContext();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    const data = await getNotifications(token);
    setNotifications(
      data.filter((notification: NotificationAPI) => !notification.seen),
    );
    // TODO: 로딩 로직 변경 필요
    setLoading(false);
  }, [token]);

  const markSeenToNotifications = useCallback(async () => {
    await seenNotifications(token);
  }, [token]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  if (loading) return null;
  return (
    <S.Notification>
      <S.Item padding="0.7rem">
        <S.Button
          onClick={() => {
            markSeenToNotifications();
            fetchNotifications();
          }}
        >
          전체 읽음 표시
        </S.Button>
      </S.Item>
      {notifications.length === 0 ? (
        <Item />
      ) : (
        notifications.map((notification: NotificationAPI) => (
          <Item
            key={notification._id}
            author={notification.author}
            comment={notification.comment}
            like={notification.like}
          />
        ))
      )}
    </S.Notification>
  );
}

export default Notification;
