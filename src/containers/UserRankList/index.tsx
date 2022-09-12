/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';

import { useHistory } from 'react-router';

import getUserList from '@/api/getUserList';
import { NOCOMMENTS, NOLIKES } from '@/common/string';
import Tag from '@/components/Tag';
import { getUserImageByPoints } from '@/utils/getUserImage';

import * as S from './style';

import type { RankSearchProp } from '@/interfaces/Rank';
import type { UserAPI } from '@/interfaces/UserAPI';

const UserRankList = ({ keyword }: RankSearchProp) => {
  const history = useHistory();

  const [rankingData, setRankingData] = useState([] as UserAPI[]);

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const data = await getUserList();
        setRankingData(data);
      } catch (error) {
        history.push('/error');
      }
    };

    fetchRankData();

    return () => {
      fetchRankData();
    };
  }, [history]);

  // 랭킹데이터 점수내림차순 정렬 후 순위를 위해 고정 인덱스 부여
  const userList: [number, UserAPI][] = rankingData
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

      // 점수가 같은 경우 계정 생성일순으로 정렬
      if (nextPoint === prevPoint) {
        return Date.parse(prev.createdAt) - Date.parse(next.createdAt);
      }

      // 포인트 내림차순 정렬
      return nextPoint - prevPoint;
    })
    .filter((user) => {
      // 어드민계정 제외 필터링
      const roleFlag = user.role?.toLowerCase()?.indexOf('admin');

      if (roleFlag !== -1) return false;
      return true;
    })
    .map((data, index) =>
      // 검색 필터링 이후에도 순위 유지를 위한 재 인덱싱
      [index + 1, data]
    );

  const generateTags = (userInfo: UserAPI) => {
    const tagsList = [];
    let point;

    if (!userInfo?.username) point = 0;
    else if (userInfo.username.indexOf('point') === -1) point = 0;
    else {
      const { points = 0 } = JSON.parse(userInfo.username);
      point = points;
    }

    const level = Math.ceil(point / 100);

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
      tagsList.push(
        <Tag
          colors='0'
          text='뉴비라네'
        />
      );
    }

    if (isLevel10) {
      tagsList.push(
        <Tag
          colors='10'
          text='내가 레벨 10대라니!'
        />
      );
    }

    if (isLevel50) {
      tagsList.push(
        <Tag
          colors='50'
          text='내가 레벨 50대라니!'
        />
      );
    }

    if (isLevel100) {
      tagsList.push(
        <Tag
          colors='100'
          text='내가 레벨 100대라니!'
        />
      );
    }

    if (isLevel500) {
      tagsList.push(
        <Tag
          colors='500'
          text='내가 레벨 500대라니!'
        />
      );
    }

    if (isLevel1000) {
      tagsList.push(
        <Tag
          colors='1000'
          text='내가 레벨 1000대라니!'
        />
      );
    }

    if (isLevel5000) {
      tagsList.push(
        <Tag
          colors='5000'
          text='내가 레벨 5000대라니!'
        />
      );
    }

    if (isLevel10000) {
      tagsList.push(
        <Tag
          colors='10000'
          text='내가 레벨 10000대라니!'
        />
      );
    }

    if (isLevel50000) {
      tagsList.push(
        <Tag
          colors='50000'
          text='내가 레벨 50000대라니!'
        />
      );
    }

    // 좋아요, 커맨트 관련 조건
    const isManyComments = userInfo.comments?.length >= 10;
    const isManyLikes = userInfo.likes?.length >= 10;
    const isNoLikes = userInfo.likes?.length === 0;
    const isNoComments = userInfo.comments?.length === 0;

    if (isManyComments && isManyLikes) {
      tagsList.push(
        <Tag
          colors='red'
          text='소통왕'
        />
      );
    }

    if (isManyComments) {
      tagsList.push(
        <Tag
          colors='green'
          text='투머치토커'
        />
      );
    }

    if (isManyLikes) {
      tagsList.push(
        <Tag
          colors='pink'
          text='사랑꾼'
        />
      );
    }

    if (isNoLikes) {
      tagsList.push(
        <Tag
          colors={NOLIKES}
          text='무뚝뚝그자체'
        />
      );
    }

    if (isNoComments) {
      tagsList.push(
        <Tag
          colors={NOCOMMENTS}
          text='묵언수행중'
        />
      );
    }

    if (isNoLikes && isNoComments) {
      tagsList.push(
        <Tag
          colors='alone'
          text='혼자가좋아'
        />
      );
    }

    return tagsList;
  };

  return (
    <>
      {userList
        .filter(([itemRank, item]) => {
          // 검색 키워드 필터링
          const searchFlag = item.fullName
            ?.toLowerCase()
            ?.indexOf(keyword.toLowerCase());

          if (searchFlag === -1) return false;

          return true;
        })
        .map(([userRank, user], rankIdx) => {
          const rank = rankIdx + 1;
          let point = 0;

          if (user.username && user.username.indexOf('point') !== -1) {
            const { points = 0 } = JSON.parse(user.username);
            point = points;
          }

          return (
            <S.Container
              key={user._id}
              rank={rank}
              onClick={() => {
                history.push(`/user/${user._id}`);
              }}
            >
              <S.Rank rank={rank}>{userRank}</S.Rank>
              <S.Exp>{point.toLocaleString()}</S.Exp>
              <S.UserWrapper>
                <S.UserProfile rank={rank}>
                  <S.UserImg
                    alt='userImage'
                    src={getUserImageByPoints(point)}
                  />
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
              </S.UserWrapper>
            </S.Container>
          );
        })}
    </>
  );
};

export default UserRankList;
