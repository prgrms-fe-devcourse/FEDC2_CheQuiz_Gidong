import * as S from './styles';

interface Props {
  text: string;
  type: 'button' | 'submit';
}

const Button = ({ text, type }: Props) => {
  return <S.Button type={type}>{text}</S.Button>;
};

export default Button;
