import styled from '@emotion/styled';
import RankingMockData from '@/assets/RankingMockData';
import { UserInfo } from '@/interfaces/UserAPI';
import NoImg from '@/assets/no-image.png';
import { PostAPICustomTitle } from '@/interfaces/PostAPI';
import { BLUE, GREEN, PINK, RED, YELLOW } from '@/common/string';
import Tag from '@/components/Tag';
import theme, { blackGray, borderWidth, gray, large } from '@/styles/theme';

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
  height: 6.25rem;
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

function UserRankList() {
  const userList = RankingMockData;

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

          // eslint-disable-next-line consistent-return
          const pickTagColor = (tag: string | undefined): string => {
            if (tag === 'HTML') return RED;
            if (tag === 'React') return BLUE;
            if (tag === 'Vue') return GREEN;
            if (tag === 'Javascript') return YELLOW;
            if (tag === 'SCSS') return PINK;
            return '#000';
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
                {user.posts
                  // 태그는 상위 3개만 표기
                  .slice(0, 3)
                  // 태그 출력
                  .map((tagedPost) => {
                    const quizInfo = JSON.parse(
                      tagedPost.title,
                    ) as PostAPICustomTitle;
                    return (
                      <div key={tagedPost._id}>
                        <Tag
                          colors={pickTagColor(quizInfo.tag)}
                          text={
                            quizInfo.tag || quizInfo.tag.trim() !== ''
                              ? quizInfo.tag
                              : 'Newbie'
                          }
                        />
                      </div>
                    );
                  })}
              </UserInfoWrap>
            </Container>
          );
        })}
    </>
  );
}

export default UserRankList;
