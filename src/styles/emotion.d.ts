import '@emotion/react';

declare module '@emotion/react' {
  export interface themeColors {
    pointColor: string;
    primary: string;
    secondary: string;
  }

  export interface tagColor {
    green: string;
    blue: string;
    yellow: string;
    red: string;
    lightBrown: string;
    pink: string;
    0: string;
    10: string;
    50: string;
    100: string;
    500: string;
    1000: string;
    5000: string;
    10000: string;
    50000: string;
    noLikes: string;
    noComments: string;
  }

  export interface textAndBackGroundColor {
    blackGray: string;
    DarkGray: string;
    gray: string;
    lightGray: string;
    brightGray: string;
    grayWhite: string;
    lightGrayWhite: string;
    white: string;
  }

  export interface borderStyle {
    borderWidth: string;
    borderRadius: string;
  }

  export interface media {
    pc: string;
    tab: string;
    mobile: string;
  }

  export interface fontStyle {
    h1: string;
    h2: string;
    h3: string;
    large: string;
    medium: string;
    small: string;
    p: string;
    detail: string;
  }

  export interface Theme {
    themeColors: themeColors;
    tagColor: tagColor;
    textAndBackGroundColor: textAndBackGroundColor;
    borderStyle: borderStyle;
    media: media;
    colors: string;
    fontStyle: fontStyle;
  }
}
