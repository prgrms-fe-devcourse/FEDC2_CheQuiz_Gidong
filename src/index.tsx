import { createRoot } from 'react-dom/client';
import ReactModal from 'react-modal';

import App from '@/App';

import ModalsProvider from './components/shared/Modal/ModalsProvider';

ReactModal.setAppElement('#root');

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <ModalsProvider>
    <App />
  </ModalsProvider>
);
