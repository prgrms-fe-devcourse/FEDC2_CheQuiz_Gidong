/* eslint-disable @typescript-eslint/no-unused-vars */
import RankingMockData from '@/assets/RankingMockData';
import { UserAPI, UserInfo } from '@/interfaces/UserAPI';
import Tag from '@/components/Tag';
import { NOCOMMENTS, NOLIKES } from '@/common/string';
import * as S from './style';
import theme from '@/styles/theme';

type Props = {
  keyword: string;
};

function UserRankList({ keyword }: Props) {
  const userList = RankingMockData.map((data, index) => [
    RankingMockData.length - index,
    data,
  ]) as [number, UserAPI][];

  const generateTags = (userInfo: UserAPI) => {
    const tagsList = [];

    const { totalPoints } = JSON.parse(userInfo.username) as UserInfo;

    const level = totalPoints / 100;

    // 포인트 관련 조건
    const isLevel0 = level < 10 && level >= 0;
    const isLevel10 = level < 50 && level >= 10;
    const isLevel50 = level < 100 && level >= 50;
    const isLevel100 = level < 500 && level >= 100;
    const isLevel500 = level < 1000 && level >= 500;
    const isLevel1000 = level < 5000 && level >= 1000;
    const isLevel5000 = level < 10000 && level >= 5000;
    const isLevel10000 = level < 50000 && level >= 10000;
    const isLevel50000 = level >= 50000;

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

  const checkUserImage = (point: number) => {
    const level = point / 100;

    // 포인트 관련 조건
    const isLevel0 = level < 10 && level >= 0;
    const isLevel10 = level < 50 && level >= 10;
    const isLevel50 = level < 100 && level >= 50;
    const isLevel100 = level < 500 && level >= 100;
    const isLevel500 = level < 1000 && level >= 500;
    const isLevel1000 = level < 5000 && level >= 1000;
    const isLevel5000 = level < 10000 && level >= 5000;
    const isLevel10000 = level < 50000 && level >= 10000;
    const isLevel50000 = level >= 50000;

    if (isLevel0) {
      return 'https://maplestory.io/api/GMS/210.1.1/mob/100200/render/move';
    }
    if (isLevel10) {
      return 'https://maplestory.io/api/GMS/210.1.1/mob/100120/render/move';
    }
    if (isLevel50) {
      return 'https://maplestory.io/api/GMS/210.1.1/mob/100121/render/move';
    }
    if (isLevel100) {
      return 'https://maplestory.io/api/GMS/210.1.1/mob/100122/render/move';
    }
    if (isLevel500) {
      return 'https://maplestory.io/api/GMS/210.1.1/mob/100123/render/move';
    }
    if (isLevel1000) {
      return 'https://maplestory.io/api/GMS/210.1.1/mob/100124/render/move';
    }
    if (isLevel5000) {
      return 'https://maplestory.io/api/GMS/210.1.1/mob/2510000/render/move';
    }
    if (isLevel10000) {
      return 'https://maplestory.io/api/GMS/210.1.1/mob/8600006/render/move';
    }
    if (isLevel50000) {
      return 'https://maplestory.io/api/GMS/210.1.1/mob/6400007/render/stand';
    }
    return 'https://maplestory.io/api/GMS/210.1.1/mob/100200/render/move';
  };

  return (
    <>
      {userList
        .sort(([prevRank, prev], [nextRank, next]) => {
          const { totalPoints: prevPoints } = JSON.parse(
            prev.username,
          ) as UserInfo;
          const { totalPoints: nextPoints } = JSON.parse(
            next.username,
          ) as UserInfo;

          return nextPoints - prevPoints;
        })
        .filter(([itemRank, item]) => {
          const flag = item.fullName
            .toLowerCase()
            ?.indexOf(keyword.toLowerCase());
          if (flag === -1) return false;
          return true;
        })
        .map(([userRank, user]) => {
          const { totalPoints } = JSON.parse(user.username) as UserInfo;

          return (
            <S.Container key={user._id}>
              <S.Rank>Rank {userRank}</S.Rank>
              <S.Exp>{totalPoints.toLocaleString()}</S.Exp>
              <S.UserProfile>
                <S.UserImg src={checkUserImage(totalPoints)} alt="userImage" />
              </S.UserProfile>
              <S.UserInfoWrap>
                <S.UserName>{user.fullName}</S.UserName>
                <S.TagsWrap>
                  {generateTags(user).map((tag, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={`rank-tag-${idx}`}>{tag}</span>
                  ))}
                </S.TagsWrap>
              </S.UserInfoWrap>
            </S.Container>
          );
        })}
    </>
  );
}

export default UserRankList;
