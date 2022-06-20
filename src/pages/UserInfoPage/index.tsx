import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Header from '@/components/Header';
import UserInfoCard from '@/components/UserInfo/UserInfoCard';
import UserInfoTab from '@/components/UserInfo/UserInfoTab';
import { fetchUserList } from '@/api/user';
import { UserAPI } from '@/interfaces/UserAPI';
import * as S from './styles';
import { useAuthContext } from '@/contexts/AuthContext';
import NicknameModal from '@/components/Modal/NicknameModal';
import PasswordModal from '@/components/Modal/PasswordModal';

interface Props {
  userId: string;
}
function UserInfo() {
  const [valid, setValid] = useState(false);
  const [id, setId] = useState('');
  const [loading, isLoading] = useState(false);

  const [isNameModalShown, setNameModalShown] = useState(false);
  const [isPwModalShown, setPwModalShown] = useState(false);

  const { user } = useAuthContext();
  const params = useParams<Props>();
  useEffect(() => {
    const setValidId = async (urlId: string) => {
      isLoading(true);
      const apiData = await fetchUserList();
      const idList = apiData.map((userItem: UserAPI) => userItem._id);
      const isValid = idList.some((item: string) => item === urlId);
      setValid(isValid);
      if (isValid) {
        setId(urlId);
      }
      isLoading(false);
    };

    const { userId } = params;
    setValidId(userId);
  }, [params]);

  return (
    <div>
      <Header />
      <NicknameModal
        user={user}
        isShown={isNameModalShown}
        onCloseNickname={() => {
          setNameModalShown(false);
        }}
      />
      {isPwModalShown && <PasswordModal />}

      {!loading && (
        <>
          {!valid && (
            <S.notFoundText>해당 유저는 존재하지 않습니다.</S.notFoundText>
          )}
          {id && <UserInfoCard id={id} />}
          {user._id === id && (
            <div>
              <button
                type="button"
                onClick={() => {
                  setNameModalShown(true);
                }}
              >
                닉네임 변경
              </button>
              <button
                type="button"
                onClick={() => {
                  setPwModalShown(true);
                }}
              >
                비밀번호 변경
              </button>
            </div>
          )}
          {id && <UserInfoTab id={id} />}
        </>
      )}
    </div>
  );
}
export default UserInfo;
