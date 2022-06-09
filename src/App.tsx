import { Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import Routers from '@/Routers';
import reset from '@/styles/reset';
import theme from '@/styles/theme';

const Layout = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

function App(): JSX.Element {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Global styles={reset} />
        <Routers />
      </ThemeProvider>
    </Layout>
  );
}

export default App;
