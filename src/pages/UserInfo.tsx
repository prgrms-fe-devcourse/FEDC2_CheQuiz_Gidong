import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Header from '@/components/Header';
import UserInfoCard from '@/components/UserInfo/UserInfoCard';
import UserInfoTab from '@/components/UserInfo/UserInfoTab';
import { fetchUserList } from '@/api/user';
import { UserAPI } from '@/interfaces/UserAPI';

interface Props {
  userId: string;
}
function UserInfo() {
  const [valid, setValid] = useState(false);
  const [id, setId] = useState('');

  const params = useParams<Props>();
  useEffect(() => {
    const setValidId = async (urlId: string) => {
      const apiData = await fetchUserList();
      const idList = apiData.map((user: UserAPI) => user._id);
      const isValid = idList.some((item: string) => item === urlId);
      setValid(isValid);
      if (isValid) {
        setId(urlId);
      }
    };

    const { userId } = params;
    setValidId(userId);
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
