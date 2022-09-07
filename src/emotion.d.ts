import '@emotion/react';

declare module '@emotion/react' {
  interface ThemeColors {
    pointColor: string;
    primary: string;
    secondary: string;
  }

  interface TagColor {
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

  interface TextAndBackGroundColor {
    blackGray: string;
    DarkGray: string;
    gray: string;
    lightGray: string;
    brightGray: string;
    grayWhite: string;
    lightGrayWhite: string;
    white: string;
  }

  interface BorderStyle {
    borderWidth: string;
    borderRadius: string;
  }

  interface Media {
    pc: string;
    tab: string;
    mobile: string;
  }

  interface FontStyle {
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
    themeColors: ThemeColors;
    tagColor: TagColor;
    textAndBackGroundColor: TextAndBackGroundColor;
    borderStyle: BorderStyle;
    media: Media;
    fontStyle: FontStyle;
  }
}
