import Header from '@/components/Header';
import UserInfoCard from '@/components/UserInfo/UserInfoCard';
import {
  UserInfoMockData as userData,
  UserInfoMockList as userList,
} from '@/assets/UserInfoMockData';

// TODO: Badge 정보 처리
function UserInfo() {
  const realUserData = {
    id: userData._id,
    email: userData.email,
    fullName: userData.fullName,
    likes: userData.likes,
    posts: userData.posts,
    points: JSON.parse(userData.username).totalPoints,
  };

  const sortedUserList = userList
    .map((user) => ({
      id: user._id,
      fullName: user.fullName,
      points: JSON.parse(user.username).totalPoints,
    }))
    .sort((a, b) => {
      return b.points - a.points;
    });
  const rank =
    sortedUserList.findIndex((data) => data.fullName === userData.fullName) + 1;

  return (
    <div>
      <Header />
      <UserInfoCard
        nickname={realUserData.fullName}
        rank={rank}
        exp={realUserData.points}
        maxExp={9999}
      />
    </div>
  );
}
export default UserInfo;
