import styled from '@emotion/styled';
import { mobile } from '@/styles/theme';

// theme 주입 기능 작동 확인
// 창 가로를 줄여 변화를 확인하세요.
const Test = styled.div`
  ${mobile} {
    color: red;
  }
`;

function Home() {
  return (
    <div>
      메인 홈 화면입니다.
      <Test>테스트입니다.</Test>
    </div>
  );
}

export default Home;
