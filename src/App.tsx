import { Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import Router from '@/routes/Router';

import reset from '@/styles/reset';
import fontStyle from '@/styles/fontStyle';

import AuthProvider from '@/contexts/AuthContext';
import QuizProvider from '@/contexts/QuizContext';

const Layout = styled.div`
  min-width: 32.5rem;
  max-width: 1200px;
  padding: 0 1rem;
  margin: 0 auto;
`;

function App(): JSX.Element {
  return (
    <AuthProvider>
      <QuizProvider>
        <ThemeProvider theme={theme}>
          <Global styles={reset} />
          <Global styles={fontStyle} />
          <Layout>
            <Router />
          </Layout>
        </ThemeProvider>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
