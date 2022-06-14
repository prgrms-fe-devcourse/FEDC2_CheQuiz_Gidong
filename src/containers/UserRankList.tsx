import styled from '@emotion/styled';
import RankingMockData from '@/assets/RankingMockData';
import { UserAPI, UserInfo } from '@/interfaces/UserAPI';
import NoImg from '@/assets/no-image.png';
import theme, { blackGray, borderWidth, gray, large } from '@/styles/theme';
import Tag from '@/components/Tag';
import { NOCOMMENTS, NOLIKES } from '@/common/string';

const Container = styled.div`
  display: flex;
  color: ${blackGray};
  justify-content: space-around;
  align-items: center;
  border: ${borderWidth};
  padding: 1.5rem 0;
  margin: 0.3125rem 0.125rem;
`;

const Rank = styled.div`
  ${large};
  width: 6.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Exp = styled.div`
  width: 9.375rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const UserProfile = styled.div`
  width: 9.375rem;
`;

const UserImg = styled.img`
  width: 100%;
`;

const UserInfoWrap = styled.div`
  width: 18.75rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const UserName = styled.div`
  border: ${borderWidth};
  border-color: ${gray};
  padding: 0.125rem 1.25rem;
`;

const TagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3125rem;
`;

function UserRankList() {
  const userList = RankingMockData;

  const generateTags = (userInfo: UserAPI) => {
    const tagsList = [];

    const { totalPoints } = JSON.parse(userInfo.username) as UserInfo;

    // 포인트 관련 조건
    const isLevel0 = totalPoints < 10 && totalPoints >= 0;
    const isLevel10 = totalPoints < 50 && totalPoints >= 10;
    const isLevel50 = totalPoints < 100 && totalPoints >= 50;
    const isLevel100 = totalPoints < 500 && totalPoints >= 100;
    const isLevel500 = totalPoints < 1000 && totalPoints >= 500;
    const isLevel1000 = totalPoints < 5000 && totalPoints >= 1000;
    const isLevel5000 = totalPoints < 10000 && totalPoints >= 5000;
    const isLevel10000 = totalPoints < 50000 && totalPoints >= 10000;
    const isLevel50000 = totalPoints >= 50000;

    if (isLevel0) {
      tagsList.push(<Tag colors="0" text="뉴비라네" />);
    }

    if (isLevel10) {
      tagsList.push(<Tag colors="10" text="내가 레벨 10대라니!" />);
    }

    if (isLevel50) {
      tagsList.push(<Tag colors="50" text="내가 레벨 50대라니!" />);
    }

    if (isLevel100) {
      tagsList.push(<Tag colors="100" text="내가 레벨 100대라니!" />);
    }

    if (isLevel500) {
      tagsList.push(<Tag colors="500" text="내가 레벨 500대라니!" />);
    }

    if (isLevel1000) {
      tagsList.push(<Tag colors="1000" text="내가 레벨 1000대라니!" />);
    }

    if (isLevel5000) {
      tagsList.push(<Tag colors="5000" text="내가 레벨 5000대라니!" />);
    }

    if (isLevel10000) {
      tagsList.push(<Tag colors="10000" text="내가 레벨 10000대라니!" />);
    }

    if (isLevel50000) {
      tagsList.push(<Tag colors="50000" text="내가 레벨 50000대라니!" />);
    }

    // 좋아요, 커맨트 관련 조건
    const isManyComments = userInfo.comments?.length >= 10;
    const isManyLikes = userInfo.likes?.length >= 10;
    const isNoLikes = userInfo.likes?.length === 0;
    const isNoComments = userInfo.comments?.length === 0;

    if (isManyComments && isManyLikes) {
      tagsList.push(<Tag colors="red" text="소통왕" />);
    }

    if (isManyComments) {
      tagsList.push(<Tag colors="green" text="투머치토커" />);
    }

    if (isManyLikes) {
      tagsList.push(<Tag colors="pink" text="사랑꾼" />);
    }

    if (isNoLikes) {
      tagsList.push(<Tag colors={NOLIKES} text="무뚝뚝그자체" />);
    }

    if (isNoComments) {
      tagsList.push(<Tag colors={NOCOMMENTS} text="묵언수행중" />);
    }

    if (isNoLikes && isNoComments) {
      tagsList.push(<Tag colors="alone" text="혼자가좋아" />);
    }

    return tagsList;
  };

  return (
    <>
      {userList
        .sort((prev, next) => {
          const { totalPoints: prevPoints } = JSON.parse(
            prev.username,
          ) as UserInfo;
          const { totalPoints: nextPoints } = JSON.parse(
            next.username,
          ) as UserInfo;

          return nextPoints - prevPoints;
        })
        .map((user, index) => {
          const { totalPoints } = JSON.parse(user.username) as UserInfo;

          const checkUserImage = (img: string | undefined | null) => {
            if (img === '' || !img) return NoImg;
            return img;
          };

          return (
            <Container {...theme} key={user._id}>
              <Rank {...theme}>Rank {index + 1}</Rank>
              <Exp>{totalPoints.toLocaleString()}</Exp>
              <UserProfile>
                <UserImg src={checkUserImage(user.image)} alt="userImage" />
              </UserProfile>
              <UserInfoWrap>
                <UserName {...theme}>{user.fullName}</UserName>
                <TagsWrap>
                  {generateTags(user).map((tag, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={`rank-tag-${idx}`}>{tag}</span>
                  ))}
                </TagsWrap>
              </UserInfoWrap>
            </Container>
          );
        })}
    </>
  );
}

export default UserRankList;
