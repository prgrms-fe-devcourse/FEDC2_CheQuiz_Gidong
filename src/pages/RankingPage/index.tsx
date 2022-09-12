import type { ChangeEvent } from 'react';
import { useState } from 'react';

import Header from '@/components/Header';
import Icon from '@/components/Icon';
import UserRankList from '@/containers/UserRankList';

import * as S from './style';

const Ranking = () => {
  const iconProps = {
    name: 'search',
    size: 20,
    strokeWidth: 3,
    color: '#222',
    rotate: 0,
  };

  const [keyword, setKeyword] = useState('');

  const changeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    const { value = '' } = e.target;
    setKeyword(value);
  };

  return (
    <>
      <Header />
      <S.SearchContainer>
        <S.SearchWrap>
          <Icon {...iconProps} />
          <S.SearchInput
            placeholder='Search'
            type='text'
            onChange={changeKeyword}
          />
        </S.SearchWrap>
      </S.SearchContainer>
      <S.Wrap>
        <S.Container>
          <S.Rank>순위</S.Rank>
          <S.Exp>경험치</S.Exp>
          <S.UserInfoWrap>유저정보</S.UserInfoWrap>
        </S.Container>
        <UserRankList keyword={keyword} />
      </S.Wrap>
    </>
  );
};

export default Ranking;
