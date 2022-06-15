import { Route } from 'react-router';
import styled from '@emotion/styled';
import Ranking from '@/pages/Ranking';
import Header from '@/components/Header';

const HomeContainer = styled.div`
  // 임시 보더
  width: 100%;

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
      <Header />
      <HomeMain>
        메인 홈 화면의 바디입니다.
        <Route exact path="/ranking" component={Ranking} />
      </HomeMain>
    </HomeContainer>
  );
}

export default Home;
