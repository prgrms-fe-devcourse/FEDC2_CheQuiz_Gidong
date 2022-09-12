/* eslint-disable @emotion/syntax-preference */
import { css } from '@emotion/react';

const fontStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

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
