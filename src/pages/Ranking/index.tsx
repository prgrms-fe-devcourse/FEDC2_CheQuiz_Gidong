import { ChangeEvent, useState } from 'react';
import UserRankList from '@/containers/UserRankList';
import Icon from '@/components/Icon';
import * as S from './style';

function Ranking() {
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
    <div>
      <S.SearchContainer>
        <S.SearchWrap>
          <Icon {...iconProps} />
          <S.SearchInput
            type="text"
            placeholder="Search"
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
    </div>
  );
}

export default Ranking;
