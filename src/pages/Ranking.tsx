import styled from '@emotion/styled';
import UserRankList from '@/containers/UserRankList';
import theme, { borderWidth } from '@/styles/theme';
import Icon from '@/components/Icon';

const Wrap = styled.div`
  border: 0.0625rem solid;
`;

const Container = styled.div`
  border: ${borderWidth};
  display: flex;
  justify-content: space-around;
  padding: 0.75rem 0;
`;

const Rank = styled.div`
  width: 6.25rem;
`;

const Exp = styled.div`
  width: 9.375rem;
`;

const UserInfoWrap = styled.div`
  width: 28.125rem;
`;

const SearchContainer = styled.div`
  margin: 1.25rem 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SearchWrap = styled.span`
  border: 0.0625rem solid;
  display: flex;
  align-items: center;
  padding: 0.3125rem;
`;

const SearchInput = styled.input`
  height: 1.875rem;
  width: 12.5rem;
  font-size: 1.25rem;
  margin-left: 0.625rem;
  outline: none;
  border: none;
`;

function Ranking() {
  const iconProps = {
    name: 'search',
    size: 20,
    strokeWidth: 2,
    color: '#222',
    rotate: 0,
  };

  return (
    <div>
      <SearchContainer>
        <SearchWrap>
          <Icon {...iconProps} />
          <SearchInput type="text" placeholder="Search" />
        </SearchWrap>
      </SearchContainer>
      <Wrap>
        <Container {...theme}>
          <Rank>순위</Rank>
          <Exp>경험치</Exp>
          <UserInfoWrap>유저정보</UserInfoWrap>
        </Container>
        <UserRankList />
      </Wrap>
    </div>
  );
}

export default Ranking;
