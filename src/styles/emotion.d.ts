import '@emotion/react';

declare module '@emotion/react' {
  interface themeColors {
    pointColor: string;
    primary: string;
    secondary: string;
  }

  interface tagColor {
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

  interface textAndBackGroundColor {
    blackGray: string;
    DarkGray: string;
    gray: string;
    lightGray: string;
    brightGray: string;
    grayWhite: string;
    lightGrayWhite: string;
    white: string;
  }

  interface borderStyle {
    borderWidth: string;
    borderRadius: string;
  }

  interface media {
    pc: string;
    tab: string;
    mobile: string;
  }

  interface fontStyle {
    h1: string;
    h2: string;
    h3: string;
    large: string;
    medium: string;
    small: string;
    p: string;
    detail: string;
  }

  export interface Theme extends Record<string, any> {
    themeColors: themeColors;
    tagColor: tagColor;
    textAndBackGroundColor: textAndBackGroundColor;
    borderStyle: borderStyle;
    media: media;
    fontStyle: fontStyle;
  }
}
