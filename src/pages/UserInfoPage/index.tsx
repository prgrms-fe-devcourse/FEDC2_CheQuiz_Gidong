import { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import { fetchUserList } from '@/api/user';
import Header from '@/components/Header';
import NicknameModal from '@/components/Modal/NicknameModal';
import PasswordModal from '@/components/Modal/PasswordModal';
import UserInfoCard from '@/components/UserInfo/UserInfoCard';
import UserInfoTab from '@/components/UserInfo/UserInfoTab';
import { useAuthContext } from '@/contexts/AuthContext';

import * as S from './styles';

interface Props {
  userId: string;
}
const UserInfo = () => {
  const [isExistUser, setIsExistUser] = useState(false);
  const [id, setId] = useState('');
  const [loading, isLoading] = useState(true);

  const [isNameModalShown, setNameModalShown] = useState(false);
  const [isPwModalShown, setPwModalShown] = useState(false);

  const { user } = useAuthContext();
  const params = useParams<Props>();
  useEffect(() => {
    const setValidId = async (urlId: string) => {
      const apiData = await fetchUserList();
      const idList = apiData.map((userItem) => userItem._id);
      const isValid = idList.some((item) => item === urlId);
      setIsExistUser(isValid);
      if (isValid) {
        setId(urlId);
      }
    };

    const { userId } = params;
    setValidId(userId).finally(() => isLoading(false));
  }, [params]);

  return (
    <div>
      <Header />
      <NicknameModal
        isShown={isNameModalShown}
        user={user}
        onCloseNickname={() => {
          setNameModalShown(false);
        }}
      />
      <PasswordModal
        isShown={isPwModalShown}
        onClosePassword={() => {
          setPwModalShown(false);
        }}
      />

      {!loading && (
        <>
          {!isExistUser && (
            <S.notFoundText>해당 유저는 존재하지 않습니다.</S.notFoundText>
          )}
          {id && (
            <S.CardWrapper>
              <UserInfoCard id={id} />
              {user._id === id && (
                <S.SettingDiv>
                  <S.SettingButton
                    type='button'
                    onClick={() => {
                      setNameModalShown(true);
                    }}
                  >
                    닉네임 변경
                  </S.SettingButton>
                  <S.SettingButton
                    type='button'
                    onClick={() => {
                      setPwModalShown(true);
                    }}
                  >
                    비밀번호 변경
                  </S.SettingButton>
                </S.SettingDiv>
              )}
            </S.CardWrapper>
          )}

          {id && <UserInfoTab id={id} />}
        </>
      )}
    </div>
  );
};
export default UserInfo;
