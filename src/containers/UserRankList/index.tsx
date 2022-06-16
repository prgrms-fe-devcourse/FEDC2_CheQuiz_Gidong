/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { UserAPI } from '@/interfaces/UserAPI';
import Tag from '@/components/Tag';
import { NOCOMMENTS, NOLIKES } from '@/common/string';
import * as S from './style';
import getRankAll from '@/api/getRankAll';

type Props = {
  keyword: string;
};

function UserRankList({ keyword }: Props) {
  const [rankingData, setRankingData] = useState([] as UserAPI[]);

  useEffect(() => {
    const fetchRankData = async () => {
      const data = await getRankAll();
      setRankingData(data);
    };

    fetchRankData();

    return () => {
      fetchRankData();
    };
  }, []);

  // 랭킹데이터 점수내림차순 정렬 후 순위를 위해 고정 인덱스 부여
  const userList = rankingData
    .sort((prev, next) => {
      let prevPoint;
      let nextPoint;

      if (!prev?.username) prevPoint = 0;
      else if (prev.username.indexOf('point') === -1) prevPoint = 0;
      else {
        const { points = 0 } = JSON.parse(prev?.username);
        prevPoint = points;
      }

      if (!next?.username) nextPoint = 0;
      else if (next.username.indexOf('point') === -1) nextPoint = 0;
      else {
        const { points = 0 } = JSON.parse(next?.username);
        nextPoint = points;
      }

      if (nextPoint === prevPoint) return -1;

      return nextPoint - prevPoint;
    })
    .map((data, index) => {
      return [index + 1, data];
    }) as [number, UserAPI][];

  // console.log(userList);

  const generateTags = (userInfo: UserAPI) => {
    const tagsList = [];
    let point;

    if (!userInfo?.username) point = 0;
    else if (userInfo.username.indexOf('point') === -1) point = 0;
    else {
      const { points = 0 } = JSON.parse(userInfo.username);
      point = points;
    }

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

  console.log(
    '확인횰',
    userList
      .sort(([prevRank, prev], [nextRank, next]) => {
        let prevPoint;
        let nextPoint;

        if (!prev?.username) prevPoint = 0;
        else if (prev.username.indexOf('totalPoint') === -1) prevPoint = 0;
        else {
          const { totalPoints = 0 } = JSON.parse(prev?.username);
          prevPoint = totalPoints;
        }

        if (!next?.username) nextPoint = 0;
        else if (next.username.indexOf('totalPoint') === -1) nextPoint = 0;
        else {
          const { totalPoints = 0 } = JSON.parse(next?.username);
          nextPoint = totalPoints;
        }

        return nextPoint - prevPoint;
      })
      .filter(([itemRank, item]) => {
        const flag = item.fullName
          .toLowerCase()
          ?.indexOf(keyword.toLowerCase());
        if (flag === -1) return false;
        return true;
      }),
  );

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
        .filter(([itemRank, item]) => {
          const flag = item.fullName
            .toLowerCase()
            ?.indexOf(keyword.toLowerCase());
          if (flag === -1) return false;
          return true;
        })
        .map(([userRank, user], index) => {
          let point;
          if (!user?.username) point = 0;
          else if (user.username.indexOf('point') === -1) point = 0;
          else {
            const { points = 0 } = JSON.parse(user.username);
            point = points;
          }

          console.log(userRank);
          return (
            <S.Container key={user._id}>
              <S.Rank>{userRank}</S.Rank>
              <S.Exp>{point.toLocaleString()}</S.Exp>
              <S.UserProfile>
                <S.UserImg src={checkUserImage(point)} alt="userImage" />
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
