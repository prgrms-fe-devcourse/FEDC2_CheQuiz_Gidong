/* eslint-disable @typescript-eslint/no-explicit-any */

import { Theme } from '@emotion/react';

/* eslint-disable no-shadow */
const Size = {
  pc: '1200px', // 1200px
  tab: '900px', // 900px
  mobile: '600px', // 600px
};

export const theme = {
  themeColors: {
    pointColor: '#FCA311',
    primary: '#14213D',
    secondary: '#E5E5E5',
  },
  tagColor: {
    green: '#ADE85A',
    blue: '#0F9fff',
    yellow: '#FFE100',
    red: '#FF6254',
    lightBrown: '#FED36F',
    pink: '#FF937E',
    0: '#977C37',
    10: '#5F7161',
    50: '#6D8B74',
    100: '#00FFAB',
    500: '#0D99FF',
    1000: '#FFBEB8',
    5000: '#FAFF00',
    10000: '#F30E5C',
    50000: '#FF1809',
    noLikes: '#7E7474',
    noComments: '#8E05C2',
  },
  textAndBackGroundColor: {
    blackGray: '#212529',
    DarkGray: '#343A40',
    gray: '#495057',
    lightGray: '#ADB5BD',
    brightGray: '#CED4DA',
    grayWhite: '#DEE2E6',
    lightGrayWhite: '#E9ECEF',
    white: '#F8F9FA',
  },
  borderStyle: {
    borderWidth: '3px solid',
    borderRadius: '8px',
  },
  media: {
    pc: `@media screen and (max-width: ${Size.pc})`,
    tab: `@media screen and (max-width: ${Size.tab})`,
    mobile: `@media screen and (max-width: ${Size.mobile})`,
  },
  fontStyle: {
    h1: 'font-size: 3rem; font-weight: 600',
    h2: 'font-size: 2.5rem; font-weight: 600',
    h3: 'font-size: 2rem; font-weight: 600',
    large: 'font-size: 1.5rem; font-weight: 500',
    medium: 'font-size: 1.25rem; font-weight: 500',
    small: 'font-size: 1rem; font-weight: 500',
    p: 'font-size: 0.9rem; font-weight: 400',
    detail: 'font-size: 0.9rem; font-weight: 400',
  },
};

type themeProps = {
  theme: Theme;
};

export const pc = ({ theme }: themeProps) => theme.media.pc;
export const tab = ({ theme }: themeProps) => theme.media.tab;
export const mobile = ({ theme }: themeProps) => theme.media.mobile;

export const pointColor = ({ theme }: themeProps) =>
  theme.themeColors.pointColor;
export const primary = ({ theme }: themeProps) => theme.themeColors.primary;
export const secondary = ({ theme }: themeProps) => theme.themeColors.secondary;
export const tagBlue = ({ theme }: themeProps) => theme.tagColor.blue;
export const tagGreen = ({ theme }: themeProps) => theme.tagColor.green;
export const tagLightBrown = ({ theme }: themeProps) =>
  theme.tagColor.lightBrown;
export const tagPink = ({ theme }: themeProps) => theme.tagColor.pink;
export const tagRed = ({ theme }: themeProps) => theme.tagColor.red;
export const tagYellow = ({ theme }: themeProps) => theme.tagColor.yellow;
export const tag0 = ({ theme }: themeProps) => theme.tagColor[0];
export const tag10 = ({ theme }: themeProps) => theme.tagColor[10];
export const tag50 = ({ theme }: themeProps) => theme.tagColor[50];
export const tag100 = ({ theme }: themeProps) => theme.tagColor[100];
export const tag500 = ({ theme }: themeProps) => theme.tagColor[500];
export const tag1000 = ({ theme }: themeProps) => theme.tagColor[1000];
export const tag5000 = ({ theme }: themeProps) => theme.tagColor[5000];
export const tag10000 = ({ theme }: themeProps) => theme.tagColor[10000];
export const tag50000 = ({ theme }: themeProps) => theme.tagColor[50000];
export const tagNoLikes = ({ theme }: themeProps) => theme.tagColor.noLikes;
export const tagNoComments = ({ theme }: themeProps) =>
  theme.tagColor.noComments;

export const DarkGray = ({ theme }: themeProps) =>
  theme.textAndBackGroundColor.DarkGray;
export const blackGray = ({ theme }: themeProps) =>
  theme.textAndBackGroundColor.blackGray;
export const brightGray = ({ theme }: themeProps) =>
  theme.textAndBackGroundColor.brightGray;
export const gray = ({ theme }: themeProps) =>
  theme.textAndBackGroundColor.gray;
export const grayWhite = ({ theme }: themeProps) =>
  theme.textAndBackGroundColor.grayWhite;
export const lightGray = ({ theme }: themeProps) =>
  theme.textAndBackGroundColor.lightGray;
export const lightGrayWhite = ({ theme }: themeProps) =>
  theme.textAndBackGroundColor.lightGrayWhite;
export const white = ({ theme }: themeProps) =>
  theme.textAndBackGroundColor.white;

export const borderRadius = ({ theme }: themeProps) =>
  theme.borderStyle.borderRadius;
export const borderWidth = ({ theme }: themeProps) =>
  theme.borderStyle.borderWidth;

export const h1 = ({ theme }: themeProps) => theme.fontStyle.h1;
export const h2 = ({ theme }: themeProps) => theme.fontStyle.h2;
export const h3 = ({ theme }: themeProps) => theme.fontStyle.h3;
export const large = ({ theme }: themeProps) => theme.fontStyle.large;
export const medium = ({ theme }: themeProps) => theme.fontStyle.medium;
export const small = ({ theme }: themeProps) => theme.fontStyle.small;
export const p = ({ theme }: themeProps) => theme.fontStyle.p;
export const detail = ({ theme }: themeProps) => theme.fontStyle.detail;

export default theme;
