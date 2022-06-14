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
  colors: '',
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

export const pc = (theme: Theme) => theme.media.pc;
export const tab = (theme: Theme) => theme.media.tab;
export const mobile = (theme: Theme) => theme.media.mobile;

export const pointColor = (theme: Theme) => theme.themeColors.pointColor;
export const primary = (theme: Theme) => theme.themeColors.primary;
export const secondary = (theme: Theme) => theme.themeColors.secondary;
export const tagBlue = (theme: Theme) => theme.tagColor.blue;
export const tagGreen = (theme: Theme) => theme.tagColor.green;
export const tagLightBrown = (theme: Theme) => theme.tagColor.lightBrown;
export const tagPink = (theme: Theme) => theme.tagColor.pink;
export const tagRed = (theme: Theme) => theme.tagColor.red;
export const tagYellow = (theme: Theme) => theme.tagColor.yellow;
export const tag0 = (theme: Theme) => theme.tagColor[0];
export const tag10 = (theme: Theme) => theme.tagColor[10];
export const tag50 = (theme: Theme) => theme.tagColor[50];
export const tag100 = (theme: Theme) => theme.tagColor[100];
export const tag500 = (theme: Theme) => theme.tagColor[500];
export const tag1000 = (theme: Theme) => theme.tagColor[1000];
export const tag5000 = (theme: Theme) => theme.tagColor[5000];
export const tag10000 = (theme: Theme) => theme.tagColor[10000];
export const tag50000 = (theme: Theme) => theme.tagColor[50000];
export const tagNoLikes = (theme: Theme) => theme.tagColor.noLikes;
export const tagNoComments = (theme: Theme) => theme.tagColor.noComments;

export const DarkGray = (theme: Theme) => theme.textAndBackGroundColor.DarkGray;
export const blackGray = (theme: Theme) =>
  theme.textAndBackGroundColor.blackGray;
export const brightGray = (theme: Theme) =>
  theme.textAndBackGroundColor.brightGray;
export const gray = (theme: Theme) => theme.textAndBackGroundColor.gray;
export const grayWhite = (theme: Theme) =>
  theme.textAndBackGroundColor.grayWhite;
export const lightGray = (theme: Theme) =>
  theme.textAndBackGroundColor.lightGray;
export const lightGrayWhite = (theme: Theme) =>
  theme.textAndBackGroundColor.lightGrayWhite;
export const white = (theme: Theme) => theme.textAndBackGroundColor.white;

export const borderRadius = (theme: Theme) => theme.borderStyle.borderRadius;
export const borderWidth = (theme: Theme) => theme.borderStyle.borderWidth;

export const h1 = (theme: Theme) => theme.fontStyle.h1;
export const h2 = (theme: Theme) => theme.fontStyle.h2;
export const h3 = (theme: Theme) => theme.fontStyle.h3;
export const large = (theme: Theme) => theme.fontStyle.large;
export const medium = (theme: Theme) => theme.fontStyle.medium;
export const small = (theme: Theme) => theme.fontStyle.small;
export const p = (theme: Theme) => theme.fontStyle.p;
export const detail = (theme: Theme) => theme.fontStyle.detail;

export default theme;
