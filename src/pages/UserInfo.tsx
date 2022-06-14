import Header from '@/components/Header';
import UserInfoCard from '@/components/UserInfo/UserInfoCard';
import { UserInfoMockData } from '@/assets/UserInfoMockData';

// TODO: Badge 정보 처리
function UserInfo() {
  const userData = {
    id: UserInfoMockData._id,
    email: UserInfoMockData.email,
    fullName: UserInfoMockData.fullName,
    likes: UserInfoMockData.likes,
    posts: UserInfoMockData.posts,
    points: JSON.parse(UserInfoMockData.username).totalPoints,
  };

  return (
    <div>
      <Header />
      <UserInfoCard nickname={userData.fullName} totalExp={userData.points} />
    </div>
  );
}
export default UserInfo;
