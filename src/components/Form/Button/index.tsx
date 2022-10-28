import * as S from './styles';

interface Props {
  text: string;
  type: 'button' | 'submit';
  onClick?: () => void;
}

const Button = ({ text, type, ...props }: Props) => (
  <S.Button
    type={type}
    {...props}
  >
    {text}
  </S.Button>
);

export default Button;
