import { Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import Router from '@/routes/Router';

import reset from '@/styles/reset';
import fontStyle from '@/styles/fontStyle';

import AuthProvider from '@/contexts/AuthContext';
import QuizProvider from './contexts/QuizContext';

const Layout = styled.div`
  max-width: 75rem;
  padding: 0 1rem;
  margin: 0 auto;
`;

function App(): JSX.Element {
  return (
    <AuthProvider>
      <QuizProvider>
        <Layout>
          <ThemeProvider theme={theme}>
            <Global styles={reset} />
            <Global styles={fontStyle} />
            <Router />
          </ThemeProvider>
        </Layout>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
