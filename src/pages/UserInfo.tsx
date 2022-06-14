import Header from '@/components/Header';
import UserInfoCard from '@/components/UserInfo/UserInfoCard';
import { UserInfoMockData as userMockData } from '@/assets/UserInfoMockData';

// TODO: Badge 정보 처리
function UserInfo() {
  const userData = {
    id: userMockData._id,
    email: userMockData.email,
    fullName: userMockData.fullName,
    likes: userMockData.likes,
    posts: userMockData.posts,
    points: JSON.parse(userMockData.username).totalPoints,
  };

  return (
    <div>
      <Header />
      <UserInfoCard id={userData.id} />
    </div>
  );
}
export default UserInfo;
