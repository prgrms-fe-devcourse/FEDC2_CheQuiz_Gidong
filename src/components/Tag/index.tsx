import * as S from './style';

type PropsType = {
  colors: string;
  text: string;
};

const Tag = ({ colors, text, ...props }: PropsType) => (
  <S.TagWrap
    {...props}
    colors={colors}
  >
    {text}
  </S.TagWrap>
);

export default Tag;
