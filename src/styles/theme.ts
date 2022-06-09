/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
const Size = {
  pc: '1200px', // 1200px
  tab: '900px', // 900px
  mobile: '600px', // 600px
};

export const theme = {
  colors: {
    gray: '#707070',
    brandColor: '#FF422E',
    lightGray: '#B9B9B9',
    lightDark: '#4A4646',
  },
  media: {
    pc: `@media screen and (max-width: ${Size.pc})`,
    tab: `@media screen and (max-width: ${Size.tab})`,
    mobile: `@media screen and (max-width: ${Size.mobile})`,
  },
};

export const pc = ({ theme }: any) => theme.media.pc;
export const tab = ({ theme }: any) => theme.media.tab;
export const mobile = ({ theme }: any) => theme.media.mobile;
export const gray = ({ theme }: any) => theme.colors.gray;
export const brandColor = ({ theme }: any) => theme.colors.brandColor;
export const lightGray = ({ theme }: any) => theme.colors.lightGray;
export const lightDark = ({ theme }: any) => theme.colors.lightDark;

export default theme;
