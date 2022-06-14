import { css } from '@emotion/react';

const fontStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src: local('Pretendard SemiBold'),
      local('./fonts/Pretendard-SemiBold.woff2') format('woff2'),
      local('./fonts/Pretendard-SemiBold.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-display: swap;
    src: local('Pretendard Medium'),
      local('./fonts/Pretendard-Medium.woff2') format('woff2'),
      local('./fonts/Pretendard-Medium.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: local('Pretendard Regular'),
      local('./fonts/Pretendard-Regular.woff2') format('woff2'),
      local('./fonts/Pretendard-Regular.woff') format('woff');
  }

  @font-face {
    font-family: 'MaplestoryOTFLight';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFLight.woff')
      format('woff');
    font-weight: light;
  }

  @font-face {
    font-family: 'MaplestoryOTFBold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;
export default fontStyle;
