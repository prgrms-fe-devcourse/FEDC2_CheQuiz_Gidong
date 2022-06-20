import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Header from '@/components/Header';
import UserInfoCard from '@/components/UserInfo/UserInfoCard';
import UserInfoTab from '@/components/UserInfo/UserInfoTab';

interface Props {
  userId: string;
}
function UserInfo() {
  const [id, setId] = useState('');

  const params = useParams<Props>();
  useEffect(() => {
    const { userId } = params;
    setId(userId);
  }, [params]);

  return (
    <div>
      <Header />
      {id && <UserInfoCard id={id} />}
      {id && <UserInfoTab id={id} />}
    </div>
  );
}
export default UserInfo;
