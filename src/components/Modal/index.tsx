import LoginForm from '@/components/LoginForm';
import SignUpForm from '@/components/SignUpForm';

import * as S from './styles';

interface Props {
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
}

const Modal = ({ setModalShow, content }: Props) => {
  const getComponentByContent = (contentType: string) => {
    switch (contentType) {
      case 'login':
        return <LoginForm setModalShow={setModalShow} />;
      case 'signup':
        return <SignUpForm setModalShow={setModalShow} />;
      default:
        return null;
    }
  };

  return (
    <S.Wrapper
      onClick={() => {
        setModalShow(false);
      }}
    >
      <S.Container onClick={(e) => e.stopPropagation()}>
        {getComponentByContent(content)}
      </S.Container>
    </S.Wrapper>
  );
};

export default Modal;
