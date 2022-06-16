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
    points:
      userMockData && userMockData.username
        ? JSON.parse(userMockData.username).totalPoints
        : 0,
  };

  return (
    <div>
      <Header />
      <UserInfoCard id="62aafe7ce193b3692eddfc77" />
    </div>
  );
}
export default UserInfo;
