import { useEffect, useState } from 'react';

import { getNotifications } from '@/api/notification';
import { useAuthContext } from '@/contexts/AuthContext';
import Item from '@/components/Notification/Item';

import { NotificationAPI } from '@/interfaces/NotificationAPI';

import * as S from './styles';

function Notification() {
  const { token } = useAuthContext();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getNotifications(token);
      setNotifications(data);
      setLoading(false);
    })();
  }, [token]);

  if (loading) return null;
  return (
    <S.Notification>
      {notifications.map((notification: NotificationAPI) => (
        <Item
          key={notification._id}
          author={notification.author}
          comment={notification.comment}
          like={notification.like}
        />
      ))}
    </S.Notification>
  );
}

export default Notification;
