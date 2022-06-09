import { Global, ThemeProvider } from '@emotion/react';
import Routers from '@/Routers';
import reset from '@/styles/reset';
import theme from '@/styles/theme';

function App(): JSX.Element {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Global styles={reset} />
        <Routers />
      </ThemeProvider>
    </div>
  );
}

export default App;
