import { Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

import Routers from '@/Routers';

import reset from '@/styles/reset';
import theme from '@/styles/theme';
import fontStyle from '@/styles/fontStyle';

import AuthProvider from '@/contexts/AuthContext';

const Layout = styled.div`
  max-width: 75rem;
  padding: 0 1rem;
  margin: 0 auto;
`;

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Layout>
        <ThemeProvider theme={theme}>
          <Global styles={reset} />
          <Global styles={fontStyle} />

          <Routers />
        </ThemeProvider>
      </Layout>
    </AuthProvider>
  );
}

export default App;
