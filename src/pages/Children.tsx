/* eslint-disable @emotion/syntax-preference */
import styled from '@emotion/styled';

const ChildrenCotainer = styled.div`
  padding: 20%;

  //임시보더
  border: 1px solid;
`;

const Children = () => (
  <ChildrenCotainer>
    <h1>홈페이지를 레이아웃으로 한 하위 라우팅 페이지 입니다.</h1>
  </ChildrenCotainer>
);

export default Children;
