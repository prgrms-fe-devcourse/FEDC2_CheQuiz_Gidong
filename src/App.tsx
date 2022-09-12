/* eslint-disable @emotion/syntax-preference */
import { Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

import AuthProvider from '@/contexts/AuthContext';
import QuizProvider from '@/contexts/QuizContext';
import Router from '@/routes/Router';
import fontStyle from '@/styles/fontStyle';
import reset from '@/styles/reset';
import theme from '@/styles/theme';

const Layout = styled.div`
  min-width: 32.5rem;
  max-width: 1200px;
  padding: 0 1rem;
  margin: 0 auto;
`;

const App = (): JSX.Element => (
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

export default App;
