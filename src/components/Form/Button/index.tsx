import * as S from './styles';

interface Props {
  text: string;
  type: 'button' | 'submit';
}

function Button({ text, type }: Props) {
  return <S.Button type={type}>{text}</S.Button>;
}

export default Button;
