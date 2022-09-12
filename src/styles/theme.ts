/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-shadow */
const Size = {
  pc: '1200px', // 1200px
  tab: '900px', // 900px
  mobile: '600px', // 600px
};

const theme = {
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
    noComments: 'mediumpurple',
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
  answerColor: {
    correct: '#5B9785',
    incorrect: '#CE4C4C',
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

// 글로벌 emotion props 타입 지정

export const pc = (props: any) => props.theme.media.pc;
export const tab = (props: any) => props.theme.media.tab;
export const mobile = (props: any) => props.theme.media.mobile;
export const pointColor = (props: any) => props.theme.themeColors.pointColor;
export const primary = (props: any) => props.theme.themeColors.primary;
export const secondary = (props: any) => props.theme.themeColors.secondary;
export const tagBlue = (props: any) => props.theme.tagColor.blue;
export const tagGreen = (props: any) => props.theme.tagColor.green;
export const tagLightBrown = (props: any) => props.theme.tagColor.lightBrown;
export const tagPink = (props: any) => props.theme.tagColor.pink;
export const tagRed = (props: any) => props.theme.tagColor.red;
export const tagYellow = (props: any) => props.theme.tagColor.yellow;
export const tag0 = (props: any) => props.theme.tagColor[0];
export const tag10 = (props: any) => props.theme.tagColor[10];
export const tag50 = (props: any) => props.theme.tagColor[50];
export const tag100 = (props: any) => props.theme.tagColor[100];
export const tag500 = (props: any) => props.theme.tagColor[500];
export const tag1000 = (props: any) => props.theme.tagColor[1000];
export const tag5000 = (props: any) => props.theme.tagColor[5000];
export const tag10000 = (props: any) => props.theme.tagColor[10000];
export const tag50000 = (props: any) => props.theme.tagColor[50000];
export const tagNoLikes = (props: any) => props.theme.tagColor.noLikes;
export const tagNoComments = (props: any) => props.theme.tagColor.noComments;

export const DarkGray = (props: any) =>
  props.theme.textAndBackGroundColor.DarkGray;
export const blackGray = (props: any) =>
  props.theme.textAndBackGroundColor.blackGray;
export const brightGray = (props: any) =>
  props.theme.textAndBackGroundColor.brightGray;
export const gray = (props: any) => props.theme.textAndBackGroundColor.gray;
export const grayWhite = (props: any) =>
  props.theme.textAndBackGroundColor.grayWhite;
export const lightGray = (props: any) =>
  props.theme.textAndBackGroundColor.lightGray;
export const lightGrayWhite = (props: any) =>
  props.theme.textAndBackGroundColor.lightGrayWhite;
export const white = (props: any) => props.theme.textAndBackGroundColor.white;

export const correct = (props: any) => props.theme.answerColor.correct;
export const incorrect = (props: any) => props.theme.answerColor.incorrect;
export const borderRadius = (props: any) =>
  props.theme.borderStyle.borderRadius;
export const borderWidth = (props: any) => props.theme.borderStyle.borderWidth;

export const h1 = (props: any) => props.theme.fontStyle.h1;
export const h2 = (props: any) => props.theme.fontStyle.h2;
export const h3 = (props: any) => props.theme.fontStyle.h3;
export const large = (props: any) => props.theme.fontStyle.large;
export const medium = (props: any) => props.theme.fontStyle.medium;
export const small = (props: any) => props.theme.fontStyle.small;
export const p = (props: any) => props.theme.fontStyle.p;
export const detail = (props: any) => props.theme.fontStyle.detail;

export default theme;
