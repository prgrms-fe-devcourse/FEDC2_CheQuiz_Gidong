import { Route } from 'react-router';
import styled from '@emotion/styled';
import Children from '@/pages/Children';

const HomeContainer = styled.div`
  // 임시 보더

  border: 1px solid;
`;

const HomeHeader = styled.header`
  text-align: center;

  // 임시 보더, 패딩
  padding: 2rem;
  border: 1px solid;
`;

const HomeMain = styled.main`
  margin: 1.5rem 0;
  text-align: center;

  // 임시 보더, 패딩
  padding: 2rem;
  border: 1px solid;
`;

function Home() {
  return (
    <HomeContainer>
      <HomeHeader> 화면의 헤더 입니다.</HomeHeader>
      <HomeMain>
        메인 홈 화면의 바디입니다.
        <Route exact path="/children" component={Children} />
      </HomeMain>
    </HomeContainer>
  );
}

export default Home;
