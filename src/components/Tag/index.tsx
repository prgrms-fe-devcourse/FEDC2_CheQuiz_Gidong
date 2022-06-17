import theme from '@/styles/theme';
import * as S from './style';

type propsType = {
  colors: string;
  text: string;
};

function Tag({ colors, text, ...props }: propsType) {
  return (
    <S.TagWrap {...props} colors={colors}>
      {text}
    </S.TagWrap>
  );
}

export default Tag;
